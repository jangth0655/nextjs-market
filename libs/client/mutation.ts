import { useState } from "react";

interface MutationState<T> {
  data?: T;
  loading: boolean;
  error?: any;
}

type MutationResponse<T> = [(data?: any) => void, MutationState<T>];

const useMutation = <T = any>(url: string | any): MutationResponse<T> => {
  const [value, setValue] = useState<MutationState<T>>({
    loading: false,
    data: undefined,
    error: undefined,
  });
  const mutation = async (bodyData: any) => {
    try {
      setValue((prev) => ({ ...prev, loading: true }));
      const response = await (
        await fetch(url, {
          method: "POST",
          body: JSON.stringify(bodyData),
          headers: {
            "Content-Type": "application/json",
          },
        })
      ).json();
      if (!response.ok) {
        setValue((prev) => ({ ...prev, error: response.error }));
      }
      setValue((prev) => ({ ...prev, data: response }));
    } catch (e) {
      console.warn(`${e}, Mutation error`);
    } finally {
      setValue((prev) => ({ ...prev, loading: false }));
    }
  };
  return [mutation, { ...value }];
};

export default useMutation;
