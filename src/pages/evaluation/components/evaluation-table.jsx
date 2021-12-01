import { Table, TableHeading, AddButton } from "../../../components";

const heading = (
  <TableHeading title="EvaluationList">
    <AddButton />
  </TableHeading>
);

const headers = ["Evaluation Scheme", "Status", "Scheme ID", "Action"];

const EvaluationTable = ({ rows, pagination }) => {
  return (
    <Table
      heading={heading}
      headers={headers}
      rows={rows}
      pagination={pagination}
    />
  );
};

export default EvaluationTable;
