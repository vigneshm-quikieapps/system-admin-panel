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
import { updateEvaluation } from "../../services/businessServices";
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
      evaluationName: "",
      status: "ACTIVE",
      levelCount: 1,
    },
  });
  const [addStatus, setAddStatus] = useState(false);
  const [skillCount, setSkillCount] = useState([]);
  useEffect(() => {
    if (businessId) {
      if (!isLoading) {
        const temp = data?.docs?.find((item) => item._id == businessId);
        if (temp) {
          setValue("evaluationName", temp.name || "");
          setValue("status", temp.status || "ACTIVE");
          setValue("levelCount", temp.levelCount || 1);
          setLevel(temp.levels || []);
          setSkillCount(Array(control._formValues.levelCount).fill(0));
        }
      }
    } else {
      setValue("evaluationName", "");
      setValue("status", "ACTIVE");
      setValue("levelCount", 1);
      setLevel([]);
    }
  }, [data]);

  const onSubmit = async () => {
    await updateEvaluation(businessId, {
      name: control._formValues.evaluationName,
      status: control._formValues.status,
      levelCount: control._formValues.levelCount,
      levels: level,
    });
  };

  const addNewSkill = () => {
    setAddStatus(true);
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
      <Grid columnGap={3}>
        <Input
          label="Evaluation Name"
          type="text"
          control={control}
          name="evaluationName"
          variant="filled"
          sx={{ width: "100%" }}
        />

        <Input
          label="Status"
          control={control}
          name="status"
          select
          sx={{ width: "100%" }}
          variant="filled"
        >
          <MenuItem value="ACTIVE">Active</MenuItem>
          <MenuItem value="NOT_ACTIVE">Not Active</MenuItem>
        </Input>

        <Input
          sx={{ width: "100%" }}
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
      </Grid>
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
            {addStatus && (
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
                        const newState = [...skillCount];
                        newState[index1] = data.length;
                        setSkillCount(newState);
                        setAddStatus(false);
                      }
                    }}
                  ></TextField>
                  <IconButton
                    style={{
                      marginRight: "7%",
                      float: "right",
                    }}
                    onClick={() => {
                      setAddStatus(false);
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
                    onClick={() => {
                      const temp = [...level];
                      temp[index1].skills.splice(index2, 1);
                      setLevel(temp);
                    }}
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
        sx={{ maxWidth: "fit-content", marginRight: "10px", marginTop: "20px" }}
        onClick={handleSubmit(onSubmit)}
      >
        Save
      </GradientButton>
      <GradientButton onClick={handleDiscard} invert sx={{ marginTop: "20px" }}>
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
