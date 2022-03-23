import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  AccordionDetails,
  AccordionSummary,
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";
import {
  Accordion,
  Card,
  CardTitle,
  IconButton,
  ImgIcon,
  Outputs,
} from "../../components";
import { backIcon } from "../../assets/icons";
import { toPascal, transformError } from "../../utils";
import { arrowDownIcon } from "../../assets/icons";

import { useGetEvaluation } from "../../services/queries";
const convertStatusToArray = (statusObject) => {
  const statusArray = Object.keys(statusObject).map((id) => ({
    // _id: id,
    // status: statusObject[id],
    skillId: id,
    levelId: statusObject[id].levelId,
    status: statusObject[id].status,
  }));
  return statusArray;
};
const EvaluationDetailPage = () => {
  const [expanded, setExpanded] = useState("panel1");

  const navigate = useNavigate();
  const { id } = useParams();
  const {
    data = { evaluationScheme: {} },
    isLoading,
    isError,
    error,
  } = useGetEvaluation(id);
  // console.log("evalddddData", data);

  const {
    evaluationScheme: { name, status, levelCount, _id, levels },
  } = data;
  const items = {
    "Evaluation Scheme Name*": name,
    Status: status,
    "Number of Levels": levelCount,
  };
  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
        <IconButton onClick={() => navigate("../")}>
          <ImgIcon>{backIcon}</ImgIcon>
        </IconButton>
        <Typography
          variant="h3"
          sx={{ fontSize: "20px", fontWeight: "bold", ml: 1 }}
        >
          Evaluation
        </Typography>
      </Box>
      <Box sx={{ mb: "20px" }}>
        <Card>
          {isError ? (
            <Typography color="error" component="pre">
              {"Error: " + transformError(error)}
            </Typography>
          ) : isLoading ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "200px",
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <>
              <CardTitle>{name}</CardTitle>{" "}
              <Outputs
                items={data.evaluationScheme?.name ? items : []}
                columnCount={3}
              />
            </>
          )}
        </Card>
      </Box>
      {levels &&
        levels.map((dataa, index) => {
          // console.log("dataa", dataa);
          return (
            <Accordion defaultExpanded>
              <AccordionSummary expandIcon={<ImgIcon>{arrowDownIcon}</ImgIcon>}>
                <Box
                  sx={{ flex: 1, mr: 1, display: "flex", alignItems: "center" }}
                >
                  <Typography>Level {index + 1}</Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails sx={{ padding: 0, paddingBottom: "10px" }}>
                <Box
                  sx={{
                    padding: " 10px 17px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderTop: `1px solid #e9e7f1`,
                    borderBottom: `1px solid #e9e7f1`,
                  }}
                >
                  <Typography variant="subtitle2" component="div">
                    Skills
                  </Typography>
                </Box>
                {dataa.skills.map((skillData, skillIndex) => (
                  <Box
                    sx={{
                      border: "1px solid #f2f1f6",
                      height: "44px",
                      margin: "6px 40px 9px 22px",
                      padding: " 12px 442px 12px 12px",
                      borderRadius: "8px",
                    }}
                  >
                    <Typography sx={{ minWidth: "700px" }}>
                      {skillData}
                    </Typography>
                  </Box>
                ))}
              </AccordionDetails>
            </Accordion>
          );
        })}
    </>
  );
};

export default EvaluationDetailPage;
