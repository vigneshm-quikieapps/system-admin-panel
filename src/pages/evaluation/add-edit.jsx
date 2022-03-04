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
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import {
  Done as DoneIcon,
  Save as AddIcon,
  Undo as RestoreDefaultsIcon,
  ClearRounded as CancelIcon,
} from "@mui/icons-material";
import informationIcon from "../../assets/icons/icon-information.png";
import warningIcon from "../../assets/icons/icon-warning.png";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import errorIcon from "../../assets/icons/icon-error.png";
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
  Button,
} from "../../components";
import { useNavigate } from "react-router-dom";
import { backIcon } from "../../assets/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import deleteIcon from "../../assets/icons/icon-delete.png";
import { number } from "yup/lib/locale";
import { CenterFocusStrong } from "@mui/icons-material";
import { useEvaluationSchemesQuery } from "../../services/list-services";
import {
  updateEvaluation,
  createEvaluation,
} from "../../services/businessServices";
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

  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState();
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState("");
  const [showWarning, setShowWarning] = useState(false);
  const [level, setLevel] = useState([]);
  const [message, setMessage] = useState();
  const [isSkillSaved, setIsSkillSaved] = useState(false);
  const [onSaveUpdateStatus, setOnSaveUpdateStatus] = useState(false);
  const [icon, setIcon] = useState();
  const [title, setTitle] = useState();
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

  useEffect(() => {
    if (businessId) {
      if (!isLoading) {
        const temp = data?.docs?.find((item) => item._id == businessId);
        if (temp) {
          setValue("evaluationName", temp.name || "");
          setValue("status", temp.status || "ACTIVE");
          setValue("levelCount", temp.levelCount || 1);
          setLevel(
            temp.levels || [
              { skills: [], isAddNewSkill: true, add: false, touched: false },
            ],
          );
        }
      }
    } else {
      setValue("evaluationName", "");
      setValue("status", "ACTIVE");
      setValue("levelCount", 1);
      setLevel([
        { skills: [], isAddNewSkill: true, add: false, touched: false },
      ]);
    }
  }, [data]);

  const onSubmit = async () => {
    let message1;
    if (businessId) {
      await updateEvaluation(businessId, {
        name: control._formValues.evaluationName,
        status: control._formValues.status,
        levelCount: control._formValues.levelCount,
        levels: level,
      });
      console
        .log("level", level)
        .then((res) => {
          message1 = res;
          setMessage(message1?.data?.message);
        })
        .catch((error) => {
          setMessage("Name should be at least 3 char unique");
        });
      // .catch((error) => {
      //   throw error;
      // });
      setOnSaveUpdateStatus(true);

      if (message1?.data?.message === "update successful") {
        setIcon(informationIcon);
        setTitle("Information");
      } else {
        setIcon(errorIcon);
        setTitle("Error");
        // setMessage("Name should be at least 3 char unique");
      }
    } else {
      await createEvaluation({
        name: control._formValues.evaluationName,
        status: control._formValues.status,
        levelCount: control._formValues.levelCount,
        levels: level,
      })
        .then((res) => {
          message1 = res;
          setMessage(message1?.data?.message);
        })
        .catch((error) => {
          setMessage("Name should be at least 3 char unique");
        });

      setOnSaveUpdateStatus(true);
      if (message1?.data?.message === "created successfully") {
        setMessage(message?.data?.message);
        setIcon(informationIcon);
        setTitle("Information");
      } else {
        setIcon(errorIcon);
        setTitle("Error");
        // setMessage("Name should be at least 3 char unique");
      }
      setOnSaveUpdateStatus(true);
    }
  };
  console.log(message);
  const addNewSkill = (index) => {
    const newState = [...level];
    newState[index].isAddNewSkill = true;
    newState[index].add = true;
    newState[index].touched = false;
    setLevel(newState);
  };
  const handleClose = () => navigate("/evaluation");
  const handleDiscard = () => {
    setShowWarning(true);
  };
  const handleOnClickSubmitEvaluation = (title) => {
    if (title === "Error") {
      setOnSaveUpdateStatus(false);
    } else {
      setOnSaveUpdateStatus(false);
      navigate("/evaluation");
    }
  };
  const handleOnClickSubmitWithoutSaving = () => {
    setIsSkillSaved(false);
  };
  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
        <IconButton onClick={() => navigate("../")}>
          <ImgIcon>{backIcon}</ImgIcon>
        </IconButton>
        <Typography sx={{ fontSize: "25px" }}>Evaluations</Typography>
      </Box>
      <Grid columnspace={5}>
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
                temp.push({ skills: [], isAddNewSkill: true });
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
                    addNewSkill(index1);
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
            {data?.isAddNewSkill && (
              <AccordionDetails>
                <Box sx={{ display: "flex", justifyContent: "space-around" }}>
                  <TextField
                    sx={{
                      height: "44px",
                      "& .MuiFilledInput-input": { py: 0 },
                      width: "80%",
                    }}
                    required
                    id="newSkill"
                    placeholder="Enter Skill"
                    label="Add New Skill"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        const temp = [...level];
                        if (e.target.value !== "") {
                          temp[index1].skills.unshift(e.target.value);
                          setLevel(temp);
                          const newState = [...level];
                          newState[index1].isAddNewSkill = false;
                          setLevel(newState);
                        }
                      }
                    }}
                  ></TextField>
                  {/* <IconButton
                    style={{
                      marginRight: "7%",
                      float: "right",
                    }}
                    onClick={() => {
                      const newState = [...level];
                      newState[index1].isAddNewSkill = false;
                      setLevel(newState);
                    }}
                  >
                    <ImgIcon>{deleteIcon}</ImgIcon>
                  </IconButton> */}
                  <Box sx={{ width: "10%", marginLeft: "9%" }}>
                    {data?.isAddNewSkill && (
                      <IconButton
                        onClick={() => {
                          const newState = [...level];
                          if (newState[index1].skills[0].skill !== "") {
                            newState[index1].isAddNewSkill = false;
                            setLevel(newState);
                          }
                          newState[index1].isAddNewSkill = true;
                        }}
                      >
                        <CancelIcon color="secondary" />
                      </IconButton>
                    )}
                    <IconButton
                      onClick={() => {
                        const newState = [...level];
                        newState[index1].skills.unshift(
                          document.getElementById("newSkill").value,
                        );
                        newState[index1].isAddNewSkill = false;
                        setLevel(newState);
                      }}
                    >
                      <AddIcon />
                    </IconButton>
                  </Box>
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
                    required
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
        onClick={() => {
          if (!level.some((data) => data.isAddNewSkill)) {
            onSubmit();
          } else {
            setIsSkillSaved(true);
          }
        }}
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
      <Dialog
        open={isSkillSaved}
        sx={{
          "& .MuiDialog-paper": {
            minWidth: "380px",
            padding: "40px 30px",
            margin: "27px 300px 31px 200px",
            alignItems: "center",
          },
        }}
      >
        <ImgIcon>{errorIcon}</ImgIcon>
        <DialogTitle>Error</DialogTitle>
        <DialogContent>
          Please save the new changes done before SAVING
        </DialogContent>
        <DialogActions>
          <Button
            sx={{ color: "#ff2c60" }}
            onClick={handleOnClickSubmitWithoutSaving}
            autoFocus
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={onSaveUpdateStatus}
        sx={{
          "& .MuiDialog-paper": {
            minWidth: "380px",
            padding: "40px 30px",
            margin: "27px 300px 31px 200px",
            alignItems: "center",
          },
        }}
      >
        <ImgIcon>{icon}</ImgIcon>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>{message}</DialogContent>
        <DialogActions>
          <Button
            sx={{ color: "#ff2c60" }}
            onClick={() => {
              handleOnClickSubmitEvaluation(title);
            }}
            autoFocus
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Page;
