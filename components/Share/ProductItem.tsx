import deliveryFile from "@libs/client/deliveryFile";
import { User } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/router";

interface ProductItemProps {
  user?: User;
  image?: string;
  name?: string;
  price?: number;
  description?: string;
  _count?: {
    favs: number;
  };
  id?: number;
}

const ProductItem: React.FC<ProductItemProps> = ({
  _count,
  description,
  image,
  name,
  price,
  user,
  id,
}) => {
  const router = useRouter();
  const onProfile = (id?: number) => {
    router.push(`/users/${id}/profile`);
  };
  const onProduct = (id?: number) => {
    router.push(`/products/${id}`);
  };
  return (
    <div className="mb-6 flex h-80 text-gray-700 shadow-md">
      <div className="relative -z-50 h-full w-[50%] ">
        {image ? (
          <Image
            src={deliveryFile(image)}
            layout="fill"
            objectFit="cover"
            alt="image"
          />
        ) : (
          <div className="h-full w-full bg-slate-600"></div>
        )}
      </div>

      <div className="flex w-[50%]  cursor-pointer flex-col  justify-between p-2 py-4 text-sm">
        <div className="space-y-4">
          <div onClick={() => onProduct(id)} className="flex flex-col">
            <span className="font-bold">Name</span>
            <span className="text-xs text-gray-500 transition-all hover:text-gray-800">
              {name}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="font-bold">Price</span>
            <span className="text-xs text-gray-500">{price}</span>
          </div>

          <div
            onClick={() => onProfile(user?.id)}
            className="flex cursor-pointer items-center "
          >
            <div className="relative -z-50 mr-1 h-5 w-5 rounded-full bg-slate-500 ">
              {user?.avatar ? (
                <Image
                  src={deliveryFile(user?.avatar)}
                  layout="fill"
                  objectFit="cover"
                  alt="avatar"
                  className="rounded-full"
                />
              ) : null}
            </div>
            <span className="font-bold text-gray-500 transition-all hover:text-gray-800">
              {user?.username}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold">Description</span>
            <span className=" text-gray-500">{description}</span>
          </div>
        </div>

        <div className="flex items-center text-xs">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
              clipRule="evenodd"
            />
          </svg>
          <span>{`${_count?.favs} Likes`}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
