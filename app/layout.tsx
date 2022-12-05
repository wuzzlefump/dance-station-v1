import React from "react";
import "../styles/globals.css";
import AuthContext from "./AuthContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthContext>
      <html>
        <head></head>
        <body className="h-[100vh]">{children}</body>
      </html>
    </AuthContext>
  );
}
