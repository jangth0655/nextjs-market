import { User } from "@prisma/client";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import useSWR from "swr";

interface UserProfile {
  ok: boolean;
  profile: User;
}

const useUser = () => {
  const router = useRouter();
  const { data, error } = useSWR<UserProfile>("/api/users/me");

  useEffect(() => {
    if (data && !data.ok) {
      router.replace("/enter");
    }
  }, [router, data]);

  return { user: data?.profile, isLoading: !data && !error };
};

export default useUser;
