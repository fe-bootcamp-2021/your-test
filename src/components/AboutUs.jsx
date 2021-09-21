import { loginPageRoute } from "../constants/routes";

export default function AboutUs() {
  return (
    <main className="p-4 md:px-6 lg:px-8 items-center">
      <div className="sm:text-center lg:text-left">
        <h1 className="tracking-tight font-extrabold text-gray-900 text-6xl">
          <span className="block xl:inline text-blue-600">Your Test</span>{" "}
        </h1>
        <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
          Hello dear user. On this site, you can create your test. We tried to
          make you enjoy everything that we have done. They did everything for
          you:
        </p>
        <div className="mt-5 md:mt-8 md:flex md:justify-center lg:justify-start">
          <div className="rounded-md shadow">
            <a
              href={loginPageRoute}
              className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
            >
              Get started
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
