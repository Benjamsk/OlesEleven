import { Table } from "@nextui-org/react"
import LeaderboardData from "./leaderboardData.json"

const LeaderboardBody = (
  <Table.Body>
    {LeaderboardData.map((row, index) => (
      <Table.Row key={index}>
        <Table.Cell><p className="mb-6 max-w-2xl font-light text-gray-500 dark:text-gray-400 md:text-lg lg:mb-8 lg:text-xl">{row.name}</p></Table.Cell>
        <Table.Cell><p className="mb-6 max-w-2xl font-light text-gray-500 dark:text-gray-400 md:text-lg lg:mb-8 lg:text-xl">{row.date}</p></Table.Cell>
        <Table.Cell><p className="mb-6 max-w-2xl font-light text-gray-500 dark:text-gray-400 md:text-lg lg:mb-8 lg:text-xl">{row.totalDistance}</p></Table.Cell>
        <Table.Cell><p className="mb-6 max-w-2xl font-light text-gray-500 dark:text-gray-400 md:text-lg lg:mb-8 lg:text-xl">{row.lastDistance}</p></Table.Cell>
        <Table.Cell><p className="mb-6 max-w-2xl font-light text-gray-500 dark:text-gray-400 md:text-lg lg:mb-8 lg:text-xl">{row.isActive}</p></Table.Cell>
      </Table.Row>
    ))}
  </Table.Body>
)

export default LeaderboardBody
