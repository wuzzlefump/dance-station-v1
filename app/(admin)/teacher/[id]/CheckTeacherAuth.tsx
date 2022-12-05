"use client";

import { getSession, useSession } from "next-auth/react";
import React, { useEffect, useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import { TUser } from "../../../../typings";
import { notFound } from "next/navigation";
import Header from "./Header";

export default function CheckAuth({
  children,
  id,
}: {
  children: React.ReactNode;
  id: string;
}) {
  const router = useRouter();
  const { data } = useSession();
  //   console.log(id);
  //   console.log(router);
  useEffect(() => {
    // @ts-ignore
    if (data && data?.user?.id !== id) {
      router.push(`/not-found`);
    }
    // @ts-ignore
    if (data && data?.user?.admin !== true) {
      router.push(`/not-found`);
    }
  }, [data]);

  if (!data) {
    return (
      <div>
        <Header />
        <div className="h-[90vh] flex flex-col items-center justify-center">
          <h1>Loading....</h1>
        </div>
      </div>
    );
  }

  return (
    <Suspense fallback={"loading"}>
      <div>{children}</div>
    </Suspense>
  );
}
