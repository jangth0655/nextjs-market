import { cls } from "@libs/client/cls";
import { UseFormRegisterReturn } from "react-hook-form";

interface InputProps {
  htmlFor?: string;
  id?: "email" | "username" | "confirm";
  placeholder: string;
  icon?: "email" | "username" | "confirm";
  register?: UseFormRegisterReturn;
  hasError?: boolean;
}

const Input = ({
  htmlFor,
  id,
  placeholder,
  icon,
  register,
  hasError,
}: InputProps) => {
  return (
    <div className="flex border-b-[1px] bg-white">
      <label
        htmlFor={htmlFor}
        className="flex w-[20%]  items-center justify-center  border-r-[1px] font-bold"
      >
        {icon === "email" && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={cls(
              "h-5 w-5 ",
              hasError ? "text-red-500" : "text-gray-500"
            )}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
          </svg>
        )}

        {icon === "confirm" && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={cls(
              "h-5 w-5 ",
              hasError ? "text-red-500" : "text-gray-500"
            )}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        )}

        {icon === "username" && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={cls(
              "h-5 w-5 ",
              hasError ? "text-red-500" : "text-gray-500"
            )}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </label>
      <input
        id={id}
        placeholder={placeholder}
        {...register}
        className={cls(
          "w-full bg-white p-2 text-sm text-gray-700 outline-none placeholder:text-sm"
        )}
      />
    </div>
  );
};

export default Input;
