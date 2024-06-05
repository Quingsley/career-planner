export function AboutSection() {
  return (
    <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">Key Features</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Discover Your Career Path</h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Our AI-powered platform helps you explore your skills, interests, and values to find the perfect career
              fit. Get personalized recommendations and support throughout your job search.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
          <div className="flex flex-col justify-center space-y-4">
            <ul className="grid gap-6">
              <li>
                <div className="grid gap-1">
                  <h3 className="text-xl font-bold">Skill Analysis</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Assess your skills and identify areas for growth with our comprehensive assessment.
                  </p>
                </div>
              </li>
              <li>
                <div className="grid gap-1">
                  <h3 className="text-xl font-bold">Career Suggestions</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Get personalized career recommendations based on your unique profile and preferences.
                  </p>
                </div>
              </li>
              <li>
                <div className="grid gap-1">
                  <h3 className="text-xl font-bold">Job Search Support</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Receive guidance on crafting your resume, preparing for interviews, and navigating the job
                    application process.
                  </p>
                </div>
              </li>
            </ul>
          </div>
          <img
            alt="Ladders leaning on ice cubes up to the top "
            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
            height="310"
            src="./career-potential.jpg"
            width="550"
          />
        </div>
      </div>
    </section>
  );
}
