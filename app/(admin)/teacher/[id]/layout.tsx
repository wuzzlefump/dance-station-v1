import React from "react";
import Header from "./Header";
import CheckAuth from "./CheckTeacherAuth";
import { getSession } from "next-auth/react";

export default async function RootLayout({
  children,
  params: { id },
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  return (
    <CheckAuth id={id}>
      {/* @ts-ignore */}
      <Header id={id} />
      <div>{children}</div>
    </CheckAuth>
  );
}
