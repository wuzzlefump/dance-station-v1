"use client";

import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { TUser } from "../typings";

export default function CheckAuth({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { data } = useSession();

  useEffect(() => {
    if (data) {
      //@ts-ignore
      if (data?.user?.admin) {
        //@ts-ignore
        router.push(`/teacher/${data.user.id}`);
      } else {
        //@ts-ignore
        router.push(`/student/${data.user.id}`);
      }
    }
  }, [data]);

  return <div>{children}</div>;
}
