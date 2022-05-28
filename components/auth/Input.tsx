import { UseFormRegisterReturn } from "react-hook-form";

interface InputProps {
  htmlFor?: string;
  id?: string;
  placeholder: string;
  icon: "email" | "username";
  register?: UseFormRegisterReturn;
}

const Input = ({ htmlFor, id, placeholder, icon, register }: InputProps) => {
  return (
    <div className="flex border-b-[1px]">
      <label
        htmlFor={htmlFor}
        className="flex w-[20%]  items-center justify-center  border-r-[1px] font-bold"
      >
        {icon === "email" && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
          </svg>
        )}

        {icon === "username" && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-500"
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
        className="w-full bg-white p-2 text-sm text-gray-700 outline-none placeholder:text-sm"
      />
    </div>
  );
};

export default Input;
