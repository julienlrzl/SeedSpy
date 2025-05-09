import { Link } from "react-router-dom";

export default function WorldAnalyzer() {
  return (
    <section className="w-full px-4 pt-[100px] pb-16 flex justify-center">
      <div className="w-full max-w-5xl bg-[#fafafa] rounded-2xl border border-[#f0f0f0] px-10 py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold font-inter text-black mb-4">
          Loading ...
        </h1>
        <p className="text-base md:text-lg text-gray-600 max-w-xl mx-auto mb-8">
          It’s coming very soon — stay tuned!
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="bg-black text-white font-semibold px-6 py-3 rounded-full text-center"
          >
            Go back to home
          </Link>
          <Link
            to="/tools"
            className="border border-gray-300 px-6 py-3 rounded-full font-semibold text-black hover:bg-gray-100 text-center"
          >
            Try all the tools
          </Link>
        </div>
      </div>
    </section>
  );
}
