import React from "react";
import { BottomNav } from "../shared/ui";
import { TopNavbar } from "../shared/ui/top-navbar/TopNavbar";
import HomeClient from "./home.client";

export default async function Home() {
  return (
    <div className="antialiased text-gray-100 bg-black pb-20">
      <TopNavbar />
      <BottomNav />
      <HomeClient />
    </div>
  );
}
