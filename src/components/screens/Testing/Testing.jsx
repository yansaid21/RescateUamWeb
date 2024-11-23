import UserReportsTable from "../../tables/UserReportsTable/UserReportsTable";
import BrigadistsTable from "../../tables/BrigadistTable/BrigadistTable";
import { Flex } from "antd";

const Testing = () => {
  return (
    <Flex style={{ height: "100dvh" }} justify="center" align="center">
      <UserReportsTable />
      <BrigadistsTable />
    </Flex>
  );
};

export default Testing;
