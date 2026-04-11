import { useCallback, useState } from "react";

export type AsyncState<TData = void, TError = Error> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: TData }
  | { status: "error"; error: TError };

export type UseAsyncStateReturn<TData, TError> = {
  state: AsyncState<TData, TError>;
  setIdle: () => void;
  setLoading: () => void;
  setSuccess: (data: TData) => void;
  setError: (error: TError) => void;
  isIdle: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  run: (fn: () => Promise<TData>) => Promise<void>;
};

/**
 * Manages async operation state with a single discriminated union.
 *
 * @example
 * const { state, run, isLoading } = useAsyncState<Vehicle>();
 *
 * await run(() => VehicleService.addVehicle(dto));
 *
 * if (state.status === 'success') console.log(state.data); // typed as Vehicle
 * if (state.status === 'error')   console.log(state.error);
 */
export function useAsyncState<
  TData = void,
  TError = Error,
>(): UseAsyncStateReturn<TData, TError> {
  const [state, setState] = useState<AsyncState<TData, TError>>({
    status: "idle",
  });

  const setIdle = useCallback(() => setState({ status: "idle" }), []);
  const setLoading = useCallback(() => setState({ status: "loading" }), []);
  const setSuccess = useCallback(
    (data: TData) => setState({ status: "success", data }),
    [],
  );
  const setError = useCallback(
    (error: TError) => setState({ status: "error", error }),
    [],
  );

  const run = useCallback(async (fn: () => Promise<TData>): Promise<void> => {
    setState({ status: "loading" });
    try {
      const data = await fn();
      setState({ status: "success", data });
    } catch (err) {
      setState({ status: "error", error: err as TError });
      throw err; // re-throw so the caller can also handle (e.g. useErrorHandler)
    }
  }, []);

  return {
    state,
    setIdle,
    setLoading,
    setSuccess,
    setError,
    isIdle: state.status === "idle",
    isLoading: state.status === "loading",
    isSuccess: state.status === "success",
    isError: state.status === "error",
    run,
  };
}
