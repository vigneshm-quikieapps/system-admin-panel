import { Table, TableHeading, AddButton } from "../../../components";
import { useNavigate } from "react-router-dom";

const heading = (
  <TableHeading title="EvaluationList">
    <AddButton />
  </TableHeading>
);

const headers = ["Evaluation Scheme", "Status", "Scheme ID", "Action"];

const EvaluationTable = ({ rows, pagination, isLoading, isFetching  }) => {
  const navigate = useNavigate();

  const addHandler = () => navigate("add");
  return (
    <Table
      heading={heading}
      headers={headers}
      rows={rows}
      pagination={pagination}
      isLoading={isLoading}
      isFetching={isFetching}
    />
  );
};

export default EvaluationTable;
