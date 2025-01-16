"use client";
import { MainPage } from "@/components/MainPage";
import { usePathname } from "next/navigation";

export default function MAIN() {
  const pathname = usePathname();
  return <MainPage region={pathname.split("/")[1]} />;
}
