"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
const GetStarted = () => {
  const router = useRouter();
  useEffect(() => {
    router.replace("/tour-dashboard");
  }, [router]);
  return <div></div>;
};

export default GetStarted;
