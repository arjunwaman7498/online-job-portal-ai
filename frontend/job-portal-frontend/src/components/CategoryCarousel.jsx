const categories = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Data Scientist",
  "AI / ML Engineer",
  "DevOps Engineer",
  "UI/UX Designer",
  "Android Developer",
];

const CategoryCarousel = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-10">
          Popular Categories
        </h2>

        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((category, index) => (
            <button
              key={index}
              className="px-6 py-3 border rounded-full hover:bg-blue-600 hover:text-white transition duration-300"
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryCarousel;