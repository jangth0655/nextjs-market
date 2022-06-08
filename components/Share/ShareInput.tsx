import { cls } from "@libs/client/cls";
import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface ShareInputProps {
  register?: UseFormRegisterReturn;
  hasError?: boolean;
  type?: string;
  id?: string;
  placeholder: string;
  addStyle?: string;
  kind?: "text" | "number";
}

const ShareInput: React.FC<ShareInputProps> = ({
  hasError,
  register,
  type,
  id,
  placeholder,
  addStyle,
  kind,
}) => {
  return (
    <>
      {kind === "text" ? (
        <input
          className={cls(
            "w-full appearance-none rounded-md border p-2 text-gray-700 focus:border-gray-500 focus:outline-none focus:ring-gray-500",
            addStyle ? addStyle : ""
          )}
          type={type}
          id={id}
          {...register}
          placeholder={placeholder}
        />
      ) : null}
      {kind === "number" ? (
        <div className="relative flex items-center justify-center">
          <div className="pointer-events-none absolute left-0 pl-4">
            <span className=" text-gray-500">$</span>
          </div>
          <input
            className={cls(
              "w-full appearance-none rounded-md border p-2 pl-10 text-gray-700 focus:border-gray-500 focus:outline-none focus:ring-gray-500"
            )}
            type={type}
            id={id}
            {...register}
            placeholder={placeholder}
          />
          <div className="pointer-events-none absolute right-0 pr-10">
            <span>원</span>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ShareInput;
