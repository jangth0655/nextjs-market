import { cls } from "@libs/client/cls";

interface ButtonProps {
  loading: boolean;
  SubmitName: "Register" | "Confirm" | "Login";
  disabled: boolean;
}

const Button = ({ loading, SubmitName, disabled }: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      className={cls(
        "w-[80%] rounded-md  bg-blue-600 p-2 uppercase",
        disabled ? "opacity-40" : ""
      )}
    >
      {loading ? "loading" : SubmitName}
    </button>
  );
};

export default Button;
