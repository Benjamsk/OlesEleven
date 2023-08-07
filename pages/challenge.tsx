import Head from "next/head"
import LeaderboardTable from "components/Leaderboard/LeaderboardTable"

export default function Web() {
  return (
    <>
      <Head>
        <title>Oles eleven</title>
      </Head>
      <section className="bg-white dark:bg-gray-900 h-screen">
        <div className="mx-auto grid max-w-screen-xl px-4 py-8 text-center lg:py-16">
          <div className="mx-auto place-self-center">
            <h1 className="mb-4 max-w-2xl text-4xl font-extrabold leading-none tracking-tight dark:text-white md:text-5xl xl:text-6xl">
              11 Scandinavian Miles
            </h1>
            <p className="mb-6 max-w-2xl font-light text-gray-500 dark:text-gray-400 md:text-lg lg:mb-8 lg:text-xl">
              The 11 Scandinavian Miles is the challenge to traverse 110 kilometers by walking and running within 24
              hours. The two rules are simple: 1) no other mode of transportation than your own legs, and 2) at least 10
              kilometers of the distance must be traversed while running.
            </p>
          </div>
        </div>
        {LeaderboardTable}
      </section>
    </>
  )
}
