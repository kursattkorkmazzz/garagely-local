import { useCallback } from "react";

/**
 * A single case in the error handler.
 *
 * `match` is a type guard — return true if this case should handle the error.
 * `handler` receives the narrowed error type.
 */
export type ErrorCase<E = unknown> = {
  match: (error: unknown) => error is E;
  handler: (error: E) => void;
};

/**
 * Returns a handler function that routes errors to the first matching case.
 *
 * Cases are evaluated in order — the first match wins and the rest are skipped.
 * If no case matches, `fallback` is called (if provided).
 *
 * @param cases   Ordered list of `{ match, handler }` pairs.
 * @param fallback  Called when no case matches. Receives the raw unknown error.
 *
 * @example
 * const handleError = useErrorHandler(
 *   [
 *     {
 *       match: (e): e is ZodError => e instanceof ZodError,
 *       handler: (e) => e.issues.forEach(issue => formik.setFieldError(issue.path.join('.'), issue.message)),
 *     },
 *     {
 *       match: (e): e is GaragelyError => e instanceof GaragelyError,
 *       handler: (e) => Toast.show({ type: 'error', text1: t(`errors.${e.code}`) }),
 *     },
 *   ],
 *   (e) => Toast.show({ type: 'error', text1: t('errors.unknown') }),
 * );
 *
 * try {
 *   await run(() => VehicleService.addVehicle(dto));
 * } catch (err) {
 *   handleError(err);
 * }
 */
export function useErrorHandler(
  cases: ErrorCase<any>[],
  fallback?: (error: unknown) => void,
): (error: unknown) => void {
  return useCallback(
    (error: unknown): void => {
      for (const c of cases) {
        if (c.match(error)) {
          c.handler(error);
          return;
        }
      }
      fallback?.(error);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [cases, fallback],
  );
}
