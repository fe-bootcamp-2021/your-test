import AboutUs from "../components/AboutUs";
import HomeIcon from "../components/icons/HomeIcon";

export default function HomePage() {
  return (
    <div>
      <div className="md:flex items-center p-4 md:max-h-screen m-auto">
        <HomeIcon />
        <AboutUs />
      </div>
      <div className="bg-gray-600 text-white text-center p-4">
        <p className="">Your-test weebsite created by </p>
        <div className="flex flex-wrap  items-center justify-center text-center">
          <a
            className="m-2"
            rel="noreferrer"
            target="_blank"
            href="https://github.com/Vahe1209"
          >
            Vahe Hovhannisyan
          </a>
          <a
            className="m-2"
            rel="noreferrer"
            target="_blank"
            href="https://github.com/dav26072000"
          >
            David Matiashvili
          </a>
          <a
            className="m-2"
            rel="noreferrer"
            target="_blank"
            href="https://github.com/Anri-H"
          >
            Anri Hunanyan
          </a>
        </div>
      </div>
    </div>
  );
}
