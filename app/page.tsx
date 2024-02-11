import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-6xl font-bold">Welcome to my portfolio</h1>
      <Image
        src="https://patelvivek.dev/static/media/vivek-0206.86791492fe4e90ef0c1f.jpg"
        alt="Picture of the author"
        width={500}
        height={500}
      />
    </main>
  );
}
