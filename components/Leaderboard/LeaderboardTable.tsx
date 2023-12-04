import { Table } from "@nextui-org/react"
import LeaderboardHeader from "./LeaderboardHeader"
import LeaderboardBody from "./LeaderboardBody"

const LeaderboardTable = (
  <Table
    bordered
    css={{
      height: "auto",
      minWidth: "100%",
    }}
  >
    {LeaderboardHeader}
    {LeaderboardBody}
  </Table>
)

export default LeaderboardTable
