import type { Route } from "./+types/home";
import About from "~/components/About";
import Navbar from "~/components/Navbar";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "gucci belt" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <div className="bg-ccwhite w-full">
      <Navbar />
      <main className="flex items-center justify-center pt-16 pb-4 h-[95dvh]">
        <h1 className="font-medium text-2xl text-black">gucci belt. welcome in</h1>
      </main>
      <About />
    </div>

    );
}
