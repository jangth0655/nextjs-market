import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface ShareTextAreaProps {
  id?: string;
  register?: UseFormRegisterReturn;
}

const ShareTextArea: React.FC<ShareTextAreaProps> = ({ id, register }) => {
  return (
    <div>
      <textarea
        {...register}
        className="w-full rounded-md border-2 border-dotted p-2 text-gray-600 focus:outline-none"
        rows={4}
        id={id}
      ></textarea>
    </div>
  );
};

export default ShareTextArea;
