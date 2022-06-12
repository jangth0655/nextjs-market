import { useRouter } from "next/router";

interface UploadButtonProps {
  pageText: PageText;
}

type PageText = "product" | "community";

const UploadButton: React.FC<UploadButtonProps> = ({ pageText }) => {
  const router = useRouter();
  const onUpload = (page: PageText) => {
    switch (page) {
      case "product":
        router.push("/products/upload");
        break;
      case "community":
        router.push("/community/write");
        break;
      default:
        router.push("/");
    }
  };
  return (
    <div
      onClick={() => onUpload(pageText)}
      className="fixed bottom-5 right-5 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-gray-600  transition-all hover:bg-gray-900"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-7 w-7 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
      </svg>
    </div>
  );
};

export default UploadButton;
