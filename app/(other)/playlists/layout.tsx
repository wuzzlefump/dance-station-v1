import React from "react";
import Header from "./Header";
import { getSession } from "next-auth/react";

export default async function RootLayout({
  children,
  params: { id },
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const session = await getSession();
  console.log(session);

  return (
    <>
      <Header />
      <div>{children}</div>
    </>
  );
}
