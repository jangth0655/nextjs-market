import React from "react";

interface ShareButtonProps {
  loading?: boolean;
  text?: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({ loading, text }) => {
  return (
    <button className="w-full rounded-md border-0 bg-gray-700 py-2 text-center uppercase text-white transition-all hover:bg-gray-900">
      {loading ? "Loading" : text}
    </button>
  );
};

export default ShareButton;
