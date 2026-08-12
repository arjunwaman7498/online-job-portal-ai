import { Search } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="bg-slate-50 py-24">
      <div className="max-w-7xl mx-auto px-6 text-center">

        <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
          No.1 Job Portal Website
        </span>

        <h1 className="text-6xl font-bold mt-8 leading-tight">
          Search, Apply & <br />
          Get Your <span className="text-blue-600">Dream Job</span>
        </h1>

        <p className="mt-6 text-gray-600 text-lg">
          Thousands of companies are hiring. Find the best opportunity for your career.
        </p>

        <div className="mt-10 flex justify-center">
          <div className="flex bg-white shadow-lg rounded-full overflow-hidden w-[650px]">

            <input
              type="text"
              placeholder="Find your dream jobs"
              className="flex-1 px-6 py-4 outline-none"
            />

            <button className="bg-blue-600 px-6 text-white">
              <Search size={22} />
            </button>

          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;