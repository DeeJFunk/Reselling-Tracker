import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "gucci belt" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <div className="bg-blue-300 h-screen w-full">
      <main className="flex items-center justify-center pt-16 pb-4 ">
        <h1 className="font-medium text-2xl text-black">gucci belt.</h1>
      </main>
    </div>
    );
}
