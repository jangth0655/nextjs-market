import Layout from "@components/layout";
import { readdirSync, readFileSync } from "fs";
import matter from "gray-matter";
import { NextPage } from "next";
import Link from "next/link";

interface Posts {
  title: string;
  date: string;
  category: string;
  slug: string;
}

const Blog: NextPage<{ posts: Posts[] }> = ({ posts }) => {
  return (
    <Layout title="Blog" seoTitle="Blog">
      <h1 className="text-lg font-bold">Latest Post</h1>
      {posts.map((post, i) => (
        <div key={i} className="mb-5">
          <Link href={`/blog/${post.slug}`}>
            <a>
              <span className="text-lg text-red-400">{post.title}</span>
              <div>
                <span>
                  {post.date} / {post.category}
                </span>
              </div>
            </a>
          </Link>
        </div>
      ))}
    </Layout>
  );
};

export const getStaticProps = async () => {
  const blogPosts = readdirSync("./posts").map((file) => {
    const content = readFileSync(`./posts/${file}`, "utf-8");
    const [slug, _] = file.split(".");
    return { ...matter(content).data, slug };
  });

  return {
    props: {
      posts: blogPosts,
    },
  };
};

export default Blog;
