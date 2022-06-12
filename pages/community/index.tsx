import Layout from "@components/layout";
import PostItem from "@components/Share/PostItem";
import UploadButton from "@components/Share/UploadButton";
import { Post, User } from "@prisma/client";
import { useRouter } from "next/router";
import useSWR from "swr";

export type Count = {
  answer: number;
  wonderings: number;
};

interface UserWithPost extends Post {
  user: User;
  _count: Count;
}

interface CommunityItems {
  posts: UserWithPost[];
}

const Community = () => {
  const { data } = useSWR<CommunityItems>("/api/posts");

  return (
    <Layout back={true} title="Community">
      {data?.posts.map((item) => (
        <PostItem key={item.id} {...item} />
      ))}
      <UploadButton pageText="community" />
    </Layout>
  );
};

export default Community;
