import { registerPageRoute } from "../constants/routes";

export default function AboutUs() {
  return (
    <main className="mt-10 max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
      <div className="sm:text-center lg:text-left">
        <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
          <span className="block xl:inline text-indigo-600">Your Test</span>{" "}
        </h1>
        <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
          `Good Day dear user. On this site, you can create your test. We tried
          to make you enjoy everything that we have done. They did everything
          for you `
        </p>
        <div className="flex flex-col">
          <a
            className="m-5 text-3xl"
            rel="noreferrer"
            target="_blank"
            href="https://github.com/Vahe1209"
          >
            Vahe Hovhannisyan
          </a>
          <a
            className="m-5 text-3xl"
            rel="noreferrer"
            target="_blank"
            href="https://github.com/dav26072000"
          >
            David Matiashvili
          </a>
          <a
            className="m-5 text-3xl"
            rel="noreferrer"
            target="_blank"
            href="https://github.com/Anri-H"
          >
            Anri Hunanyan
          </a>
        </div>
        <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
          <div className="rounded-md shadow">
            <a
              href={registerPageRoute}
              className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
            >
              Get started
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
