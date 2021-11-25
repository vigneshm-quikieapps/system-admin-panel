import { Box } from "@mui/system";

import { Output, Status } from ".";
import toPascal from "../utils/to-pascal";

const statusMap = { ACTIVE: "green", INACTIVE: "red" };

const Outputs = ({
  items = {},
  columnCount = 4,
  columnGap = "20px",
  rowGap = "10px",
}) => {
  const arrayItems = Object.entries(items);
  return (
    <Box
      sx={{
        width: "100%",
        display: "grid",
        rowGap,
        columnGap,
        gridTemplateColumns: `repeat(${columnCount}, 1fr)`,
      }}
    >
      {arrayItems.map((item, index) => {
        let [title, description] = item;
        if (title.toLowerCase() === "status") {
          const status = statusMap[description.toUpperCase()];
          description = <Status status={status} title={toPascal(description)} />;
        }
        return <Output key={index} title={title} description={description} />;
      })}
    </Box>
  );
};

export default Outputs;
