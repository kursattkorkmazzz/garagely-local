import { GaragelyError } from "@/utils/error/garagely-error";
import Toast from "react-native-toast-message";
import { ZodError } from "zod";

// ---------------------------------------------------------------------------
// Action types
// ---------------------------------------------------------------------------

export type ToastAction = {
  kind: "toast";
  /** Defaults to 'error'. */
  severity?: "error" | "warning" | "info";
  /** Override message. Falls back to the error's own message if omitted. */
  message?: string;
};

export type FieldAction = {
  kind: "field";
  /**
   * Formik field name to attach the error to.
   * If omitted and the source is a ZodError, the field path is used automatically.
   */
  fieldName?: string;
  /** Override message. Falls back to the error's own message if omitted. */
  message?: string;
};

export type IgnoreAction = {
  kind: "ignore";
};

export type ErrorAction = ToastAction | FieldAction | IgnoreAction;

/**
 * A rule is either a single action or an array of actions.
 * Use an array when the same error should trigger multiple actions,
 * e.g. both set a field error AND show a toast.
 */
export type ErrorRule = ErrorAction | ErrorAction[];

// ---------------------------------------------------------------------------
// Config & Formik types
// ---------------------------------------------------------------------------

/** Minimal Formik interface needed for 'field' actions. */
export type FormikLike = {
  setFieldError: (field: string, message: string) => void;
};

/**
 * Maps error keys to rules.
 *
 * Keys can be:
 * - A Zod field path (e.g. `'brand'`, `'purchasePrice.amount'`)
 * - A Zod issue code (e.g. `'too_small'`, `'invalid_type'`)
 * - A GaragelyError code (e.g. `'VEHICLE_COVER_IMAGE_NOT_FOUND'`)
 * - `_default` — matches any error that no other rule covers
 */
export type ErrorHandlerConfig = {
  [key: string]: ErrorRule;
  _default?: ErrorRule;
};

// ---------------------------------------------------------------------------
// Internal helper
// ---------------------------------------------------------------------------

function executeRule(
  rule: ErrorRule,
  context: { message?: string; fieldName?: string },
  formik?: FormikLike,
): void {
  const actions = Array.isArray(rule) ? rule : [rule];
  for (const action of actions) {
    switch (action.kind) {
      case "toast":
        Toast.show({
          type: action.severity ?? "error",
          text1: action.message ?? context.message,
        });
        break;

      case "field": {
        const field = action.fieldName ?? context.fieldName;
        const msg = action.message ?? context.message;
        if (field && msg && formik) {
          formik.setFieldError(field, msg);
        }
        break;
      }

      case "ignore":
        break;
    }
  }
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

/**
 * Returns a handler function that processes errors according to `config`.
 *
 * Matching priority per error type:
 *
 * **ZodError** (each issue is processed independently):
 *   1. config[issue.path.join('.')]   — field path (e.g. 'brand')
 *   2. config[issue.code]             — Zod issue code (e.g. 'too_small')
 *   3. config._default
 *
 * **GaragelyError**:
 *   1. config[error.code]             — e.g. 'VEHICLE_COVER_IMAGE_NOT_FOUND'
 *   2. config._default
 *
 * **Any other Error**:
 *   1. config._default
 *
 * @param config  Rules map. Provide as a stable object (useMemo or module-level constant).
 * @param formik  Optional Formik helpers — required when any rule uses `{ kind: 'field' }`.
 *
 * @example
 * const { setFieldError } = useVehicleForm();
 * const handleError = useErrorHandler(
 *   {
 *     brand:  { kind: 'field' },
 *     model:  { kind: 'field' },
 *     VEHICLE_COVER_IMAGE_NOT_FOUND: { kind: 'toast', message: t('errors.imageNotFound') },
 *     _default: { kind: 'toast' },
 *   },
 *   { setFieldError },
 * );
 *
 * try {
 *   await run(() => VehicleService.addVehicle(dto));
 * } catch (err) {
 *   handleError(err);
 * }
 */
export function useErrorHandler(
  config: ErrorHandlerConfig,
  formik?: FormikLike,
): (error: unknown) => void {
  return (error: unknown): void => {
    // --- ZodError: each issue is matched independently ---
    if (error instanceof ZodError) {
      for (const issue of error.issues) {
        const path = issue.path.join(".");
        const rule =
          (path && config[path]) ?? config[issue.code] ?? config._default;
        if (rule) {
          executeRule(rule, { message: issue.message, fieldName: path }, formik);
        }
      }
      return;
    }

    // --- GaragelyError: match by error.code ---
    if (error instanceof GaragelyError) {
      const rule = config[error.code] ?? config._default;
      if (rule) {
        executeRule(rule, { message: error.message }, formik);
      }
      return;
    }

    // --- Generic Error ---
    const rule = config._default;
    if (rule) {
      executeRule(
        rule,
        { message: error instanceof Error ? error.message : String(error) },
        formik,
      );
    }
  };
}
