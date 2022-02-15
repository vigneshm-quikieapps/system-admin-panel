import { useEffect, useState, useCallback } from "react";
import { useForm } from "react-hook-form";

import { useParams } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import {
  AccordionSummary,
  AccordionDetails,
  Box,
  MenuItem,
  Typography,
  DialogActions,
  IconButton,
  Menu,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  GradientButton,
  Grid,
  AddButton,
  Accordion,
  AccordionContainer,
  Card,
  CardRow,
  DashboardCard,
  TextField,
  CheckBox,
  ImgIcon,
  Input,
  WarningDialog,
} from "../../components";
import { useNavigate } from "react-router-dom";
import { backIcon } from "../../assets/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import deleteIcon from "../../assets/icons/icon-delete.png";
import { number } from "yup/lib/locale";
import { CenterFocusStrong } from "@mui/icons-material";
import { useEvaluationSchemesQuery } from "../../services/list-services";

const validationSchema = yup
  .object()
  .shape({
    evaluationName: yup.string(),
    status: yup.string().oneOf(["ACTIVE", "NOT_ACTIVE"]),
    levelCount: yup.number(),
  })
  .required();
const Page = () => {
  const navigate = useNavigate();

  const { id: businessId = "" } = useParams();

  const pathTo = (path) => path + "/" + businessId;
  // const [evaluationName, setEvaluationName] = useState("");
  const [status, setStatus] = useState(false);
  // const [levelCount, setLevelCount] = useState(0);

  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState();
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState("");
  const [showWarning, setShowWarning] = useState(false);
  const [level, setLevel] = useState([]);
  const [evaluationData, setEvaluationData] = useState();
  const { isLoading, data, isFetching, isPreviousData } =
    useEvaluationSchemesQuery(page, filters, {
      onError: (error) => {
        setShowError(true);
        setError(error);
      },
    });

  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm({
    resolver: yupResolver(validationSchema),
    reValidateMode: "onChange",
    defaultValues: {
      evaluationName: evaluationData?.name || "",
      status: evaluationData?.status || "",
      levelCount: evaluationData?.levelCount || 1,
    },
  });
  // useEffect(() => {
  //   if (!isLoading) {
  //     // console.log(data);
  //     // const temp = data?.docs?.find((item) => item._id == businessId);
  //     // if (temp) {
  //     //   setValue("evaluationName", temp.name);
  //     //   setValue("status", temp.status);
  //     //   setValue("levelCount", temp.levelCount);
  //     //   setLevel(temp.levels);
  //     // }
  //     // setLevel(Array(Number(control._formValues.levelCount)).fill({}));
  //   }
  // }, [data]);

  useEffect(() => {
    if (!isLoading) {
      const temp = data?.docs?.find((item) => item._id == businessId);
      if (temp) {
        setValue("evaluationName", temp.name);
        setValue("status", temp.status);
        setValue("levelCount", temp.levelCount);
        setLevel(temp.levels);
      }
      // setLevel(Array(Number(control._formValues.levelCount)).fill({}));
    }
  }, [data]);

  const onSubmit = (data) => {
    console.log(control._formValues);
  };

  // const onChange = (data) => {
  //   console.log(control._formValues);
  // };
  const addNewSkill = () => {
    setStatus(true);
  };
  const handleClose = () => navigate("/evaluation");
  const handleDiscard = () => {
    setShowWarning(true);
  };
  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
        <IconButton onClick={() => navigate("../")}>
          <ImgIcon>{backIcon}</ImgIcon>
        </IconButton>
        <Typography sx={{ fontSize: "25px" }}>Evaluations</Typography>
      </Box>
      <Card sx={{ display: "flex", justifyContent: "space-evenly" }}>
        <Box>
          <Typography sx={{ marginBottom: "10px", fontSize: "17px" }}>
            Evaluation Name
          </Typography>
          <Input
            label="Evaluation Name"
            type="text"
            control={control}
            name="evaluationName"
            variant="filled"
          />
        </Box>
        <Box>
          <Typography sx={{ marginBottom: "10px", fontSize: "17px" }}>
            Status
          </Typography>
          <Input
            label="Status"
            control={control}
            name="status"
            select
            sx={{ width: "200px" }}
            variant="filled"
          >
            <MenuItem value="ACTIVE">Active</MenuItem>
            <MenuItem value="NOT_ACTIVE">Not Active</MenuItem>
          </Input>
        </Box>
        <Box>
          <Typography sx={{ marginBottom: "10px", fontSize: "17px" }}>
            No. of Levels
          </Typography>
          <Input
            sx={{ width: "200px" }}
            label="Level Count"
            control={control}
            name="levelCount"
            type="number"
            InputProps={{ inputProps: { min: "0", max: "10", step: "1" } }}
            variant="filled"
            onChange={(data) => {
              let temp = [...level];
              if (temp.length > data.target.value) {
                temp.pop();
                setValue("levelCount", data.target.value);
                setLevel(temp);
              } else if (data.target.value && temp.length < data.target.value) {
                setValue("levelCount", data.target.value);
                for (var i = temp.length; i < data.target.value; i++) {
                  temp.push({ skills: [] });
                }
                setLevel(temp);
              } else {
              }
            }}
          ></Input>
        </Box>
      </Card>
      {level?.map((data, index1) => (
        <AccordionContainer>
          <Accordion defaultExpanded={true}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Box
                sx={{
                  display: "flex",
                  flex: 1,
                  alignItems: "center",
                }}
              >
                <Typography style={{ flex: 1 }}>Level {index1 + 1}</Typography>
                <AddButton
                  key={index1}
                  style={{ marginRight: "1%" }}
                  onClick={(e) => {
                    e.stopPropagation();
                    addNewSkill();
                  }}
                />
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ padding: " 5px 17px" }}>
                <Typography
                  style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    display: "inline",
                  }}
                >
                  Skill Name
                </Typography>
                <Typography
                  style={{
                    marginRight: "5%",
                    fontSize: "18px",
                    fontWeight: "bold",
                    float: "right",
                    display: "inline",
                  }}
                >
                  Action
                </Typography>
              </Box>
            </AccordionDetails>
            {status && (
              <AccordionDetails>
                <Box>
                  <TextField
                    sx={{
                      height: "44px",
                      "& .MuiFilledInput-input": { py: 0 },
                      width: "80%",
                    }}
                    placeholder="Enter Skill"
                    label="Add New Skill"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        const temp = [...level];
                        temp[index1].skills.unshift(e.target.value);
                        setLevel(temp);
                      }
                    }}
                  ></TextField>
                  <IconButton
                    style={{
                      marginRight: "7%",
                      float: "right",
                    }}
                    onClick={() => {
                      setStatus(false);
                    }}
                  >
                    <ImgIcon>{deleteIcon}</ImgIcon>
                  </IconButton>
                </Box>
              </AccordionDetails>
            )}

            {data.skills.map((skill, index2) => (
              <AccordionDetails>
                <Box>
                  <TextField
                    sx={{
                      height: "44px",
                      "& .MuiFilledInput-input": { py: 0 },
                      width: "80%",
                    }}
                    key={index2}
                    value={skill}
                    placeholder="Enter Skill"
                    onChange={(e) => {
                      const temp = [...level];
                      temp[index1].skills[index2] = e.target.value;
                      setLevel(temp);
                    }}
                  ></TextField>
                  <IconButton
                    style={{
                      marginRight: "7%",
                      float: "right",
                    }}
                    onClick={() => {}}
                  >
                    <ImgIcon>{deleteIcon}</ImgIcon>
                  </IconButton>
                </Box>
              </AccordionDetails>
            ))}
          </Accordion>
        </AccordionContainer>
      ))}
      <GradientButton
        sx={{ maxWidth: "fit-content" }}
        onClick={handleSubmit(onSubmit)}
      >
        Save
      </GradientButton>
      <GradientButton onClick={handleDiscard} invert>
        Discard
      </GradientButton>
      {!!Object.keys(errors).length && (
        <DialogActions
          sx={{ flexDirection: "column", alignItems: "flex-start", p: 2 }}
        >
          {Object.values(errors)
            .reverse()
            .map(({ message }, index) => (
              <Typography
                key={index}
                sx={{ color: "error.main", ml: "0 !important" }}
                component="span"
              >
                {message}
              </Typography>
            ))}
        </DialogActions>
      )}
      <WarningDialog
        showReject
        open={showWarning}
        onAccept={handleClose}
        onReject={() => setShowWarning(false)}
        title="Warning!"
        description="Are you sure you want to discard without saving?"
      />
    </>
  );
};

export default Page;
