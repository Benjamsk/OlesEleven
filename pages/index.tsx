import Head from "next/head"
import PhotoGallery from "components/Image/PhotoGallery"

export default function Web() {
  return (
    <>
      <Head>
        <title>Oles eleven</title>
      </Head>
      <section className="h-screen bg-white dark:bg-gray-900">
        <div className="mx-auto grid max-w-screen-xl px-4 py-8 text-center lg:py-16">
          <div className="mx-auto place-self-center">
            <h1 className="mb-4 max-w-2xl text-4xl font-extrabold leading-none tracking-tight dark:text-white md:text-5xl xl:text-6xl">
              Oles eleven
            </h1>
            <p className="mb-6 max-w-2xl font-light text-gray-500 dark:text-gray-400 md:text-lg lg:mb-8 lg:text-xl">
              This website is a challenge page where there will be posted 11 challenges for Ole and Benjamin to
              complete.{" "}
            </p>
            <p className="mb-6 max-w-2xl font-light text-gray-500 dark:text-gray-400 md:text-lg lg:mb-8 lg:text-xl">
              Everyone can participate in these challenges and send us an email to be shown on the leaderboard. For that
              challenge. Currently there is only one challenge, but more will be added after the previous one has been
              completed.
            </p>
            <p className="mb-6 max-w-2xl font-light text-gray-500 dark:text-gray-400 md:text-lg lg:mb-8 lg:text-xl">
              This is also a place to deploy our software projects to and will contain a lot of different projects.
            </p>
          </div>
        </div>
        <PhotoGallery />
      </section>
    </>
  )
}
