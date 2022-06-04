import useMutation from "@libs/client/mutation";
import { useRouter } from "next/router";
import Enter from "pages/enter";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Button from "./Button";
import Input from "./Input";

interface TokenConfirmProps {
  payload?: string;
  toggleToken: Dispatch<SetStateAction<boolean>>;
}

interface TokenForm {
  token: string;
}

interface ConfirmMutation {
  ok: boolean;
  error?: string;
}

const TokenConfirm = ({ payload, toggleToken }: TokenConfirmProps) => {
  const router = useRouter();
  const [close, setClose] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<TokenForm>();
  const [
    confirm,
    { data: confirmData, loading: confirmLoading, error: conformError },
  ] = useMutation<ConfirmMutation>("/api/users/confirm");

  const onValid = (data: TokenForm) => {
    confirm(data);
    reset();
  };

  useEffect(() => {
    if (confirmData && confirmData.ok) {
      toggleToken(false);
    }
  }, [router, confirmData, toggleToken]);

  return (
    <div className="absolute flex h-full  w-full flex-col items-center justify-center overflow-hidden rounded-md bg-gray-900 text-white">
      <div className="flex w-full justify-end pr-3 pt-2">
        <svg
          onClick={() => toggleToken(false)}
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 cursor-pointer text-gray-500 transition-all hover:text-white"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <form
        onSubmit={handleSubmit(onValid)}
        className="flex h-full w-full flex-col items-center justify-center space-y-1"
      >
        <span className="mb-5 text-lg font-bold">Token Verification</span>
        <div className="w-[80%] overflow-hidden rounded-md ">
          <Input
            register={register("token", { required: true })}
            icon="confirm"
            placeholder="Token"
            htmlFor=""
          />
        </div>
        <Button
          SubmitName="Confirm"
          loading={confirmLoading}
          disabled={!isValid}
        />
      </form>
      <span>{payload}</span>
    </div>
  );
};

export default TokenConfirm;
