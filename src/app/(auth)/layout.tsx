import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const Layout = async ({ children }: Props) => {
  const user = await currentUser();

  if (user) {
    redirect("/");
  }

  return (
    <div className="flex h-screen w-full justify-center">
      <div className="ld:w-full flex w-[600px] flex-col items-start p-6">
        <Image
          src="/logo.svg"
          alt="LOGO"
          sizes="100vw"
          style={{
            width: "20%",
            height: "auto",
          }}
          width={0}
          height={0}
        />
        {children}
      </div>
      <div className="bg-cream relative hidden max-h-full w-full max-w-[4000px] flex-1 flex-col gap-3  overflow-hidden pl-24 pt-10 lg:flex">
        <h2 className="text-gravel font-bold md:text-4xl">
          Hi, I’m your AI powered sales assistant, Corinna!
        </h2>
        <p className="text-iridium mb-10 md:text-sm">
          Corinna is capable of capturing lead information without a form...{" "}
          <br />
          something never done before 😉
        </p>
        <Image
          src="/app-ui.png"
          alt="app image"
          loading="lazy"
          sizes="30"
          className="absolute top-48 !w-[1600px] shrink-0"
          width={0}
          height={0}
        />
      </div>
    </div>
  );
};

export default Layout;
