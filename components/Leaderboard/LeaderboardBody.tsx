import { Table } from "@nextui-org/react"
import LeaderboardData from "./leaderboardData.json"

const LeaderboardBody = (
  <Table.Body>
    {LeaderboardData.map((row, index) => (
      <Table.Row key={index}>
        <Table.Cell>{row.name}</Table.Cell>
        <Table.Cell>{row.date}</Table.Cell>
        <Table.Cell>{row.totalDistance}</Table.Cell>
        <Table.Cell>{row.lastDistance}</Table.Cell>
        <Table.Cell>{row.isActive}</Table.Cell>
      </Table.Row>
    ))}
  </Table.Body>
)

export default LeaderboardBody
