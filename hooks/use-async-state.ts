import { Dispatch, SetStateAction, useCallback, useState } from "react";

export type AsyncState<TData = void, TError = Error> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: TData }
  | { status: "error"; error: TError };

export type UseAsyncStateReturn<TData, TError> = {
  state: AsyncState<TData, TError>;
  setState: Dispatch<SetStateAction<AsyncState<TData, TError>>>;
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
 * const { state, setState, run, isLoading } = useAsyncState<Vehicle>();
 *
 * // Manual state control:
 * setState({ status: 'loading' });
 * setState({ status: 'success', data: vehicle });
 * setState({ status: 'error', error: new Error('oops') });
 * setState({ status: 'idle' });
 *
 * // Automatic state management via run():
 * await run(() => VehicleService.addVehicle(dto));
 * if (state.status === 'success') console.log(state.data); // typed as Vehicle
 */
export function useAsyncState<
  TData = void,
  TError = Error,
>(): UseAsyncStateReturn<TData, TError> {
  const [state, setState] = useState<AsyncState<TData, TError>>({
    status: "idle",
  });

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
    setState,
    isIdle: state.status === "idle",
    isLoading: state.status === "loading",
    isSuccess: state.status === "success",
    isError: state.status === "error",
    run,
  };
}
