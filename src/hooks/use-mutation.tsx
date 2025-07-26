import {
  useMutation as useReactQueryMutation,
  useQueryClient,
  UseMutationOptions,
  UseMutationResult,
} from "@tanstack/react-query";
import { successToast, errorToast } from "@/components/form-error";
import { errorMessage } from "@/lib/utils/helper";

// Custom Mutation Options
type CustomMutationOptions<TData, TError, TVariables, TContext> =
  UseMutationOptions<TData, TError, TVariables, TContext> & {
    invalidateQueries?: readonly unknown[][];
  };

// Custom Mutation Hook
export const useMutation = <
  TData = unknown,
  TError = unknown,
  TVariables = void,
  TContext = unknown
>(
  options: CustomMutationOptions<TData, TError, TVariables, TContext>
): UseMutationResult<TData, TError, TVariables, TContext> => {
  const queryClient = useQueryClient();

  return useReactQueryMutation({
    ...options,
    onSuccess: (data, variables, context) => {
      successToast((data as any)?.message || "Action successful");

      // Invalidate Queries
      if (options.invalidateQueries) {
        options.invalidateQueries.forEach((query) => {
          queryClient.invalidateQueries({ queryKey: query });
        });
      }

      options.onSuccess?.(data, variables, context);
    },
    onError: (error, variables, context) => {
      errorToast(errorMessage(error));
      options.onError?.(error, variables, context);
    },
  });
};
