import { Table, TableHeading, AddButton } from "../../../components";
import { useNavigate } from "react-router-dom";

const Heading = ({ onAdd }) => (
  <TableHeading title="EvaluationList">
    <AddButton onClick={onAdd} />
  </TableHeading>
);

const headers = ["Evaluation Scheme", "Status", "Action"];

const EvaluationTable = ({ rows, pagination, isLoading, isFetching }) => {
  const navigate = useNavigate();

  const addHandler = () => navigate("add");
  return (
    <Table
      heading={<Heading onAdd={addHandler} />}
      headers={headers}
      rows={rows}
      pagination={pagination}
      isLoading={isLoading}
      isFetching={isFetching}
    />
  );
};

export default EvaluationTable;
