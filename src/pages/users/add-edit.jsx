import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { styled } from "@mui/material/styles";
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  IconButton,
  CircularProgress,
  MenuItem,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";

import { usePostUser, usePutUser } from "../../services/mutations";
import { useGetUser } from "../../services/queries";
import { transformError } from "../../utils";
import {
  ElevationScroll,
  Input,
  GradientButton,
  Grid,
  WarningDialog,
} from "../../components";
import Roles from "./components/roles";
import DataPrivileges from "./components/data-privileges";

const FormModal = styled(Dialog)(({ theme }) => ({
  "& .MuiPaper-root": { borderRadius: theme.shape.borderRadiuses.ternary },
  "& label": { lineHeight: "initial !important" },
}));

const validationSchema = Yup.object()
  .shape({
    email: Yup.string().email().required().label("Email address"),
    password: Yup.string().min(6).label("Password"),
    name: Yup.string().min(5).label("Full Name"),
    mobileNo: Yup.string().required(),
    status: Yup.string()
      .oneOf(["ACTIVE", "INACTIVE"])
      .required()
      .label("Status"),
    roles: Yup.array().min(1).required().of(Yup.string().required()),
    isCoach: Yup.boolean(),
    dataPrivileges: Yup.object().shape({
      all: Yup.boolean().required(),
      list: Yup.array().of(Yup.string()),
    }),
  })
  .required();

const AddUserPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [showWarning, setShowWarning] = useState(false);
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState("");
  const [contentRef, setContentRef] = useState();
  const { data, isLoading: getIsLoading } = useGetUser(id, {
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    onError: (error) => {
      setShowError(true);
      setError(error);
    },
  });
  const { isLoading, mutate: postUser } = usePostUser({
    onError: (error) => {
      setShowError(true);
      setError(error);
    },
  });
  const { isLoading: isPutLoading, mutate: putUser } = usePutUser({
    onError: (error) => {
      setShowError(true);
      setError(error);
    },
  });

  const {
    control,
    handleSubmit,
    // for setting default values from back-end
    reset: resetFormData,
    watch,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      name: "",
      mobileNo: "",
      status: "ACTIVE",
      roles: [],
      isCoach: false,
      dataPrivileges: {
        all: false,
        list: [],
      },
    },
  });

  const roles = watch("roles");

  const onSubmit = (data) => {
    id
      ? putUser(data, { onSuccess: () => navigate("/users") })
      : postUser(data, { onSuccess: () => navigate("/users") });
  };

  const handleClose = () => navigate("/users");
  const handleDiscard = () => {
    setShowWarning(true);
  };

  const handleAddRole = (id, name) => {
    const updatedRoles = [...getValues("roles")];
    if (updatedRoles.findIndex(({ _id: roleId }) => roleId === id) > -1) return;
    updatedRoles.push({ _id: id, name });
    setValue("roles", updatedRoles);
  };

  const handleDeleteRole = (id) => {
    const currentRoles = [...getValues("roles")];
    const updatedRoles = currentRoles.filter(({ _id }) => _id !== id);
    setValue("roles", updatedRoles);
  };

  useEffect(() => {
    if (data?.role) {
      const userInfo = data.user;
      resetFormData(userInfo);
    }
  }, [resetFormData, data]);

  return (
    <>
      <FormModal open={true} maxWidth="xl">
        <ElevationScroll targetRef={contentRef}>
          <DialogTitle
            sx={{
              fontSize: "28px",
              fontWeight: "bold",
              zIndex: 1,
            }}
          >
            User Account Creation
          </DialogTitle>
        </ElevationScroll>
        <IconButton
          onClick={handleDiscard}
          sx={{
            position: "absolute",
            top: "10px",
            right: "10px",
            bgcolor: "ternary.main",
            zIndex: 1,
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent ref={(e) => setContentRef(e)}>
          {(isLoading || getIsLoading || isPutLoading) && (
            <Box
              sx={{
                display: "flex",
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#0009",
                pointerEvents: "none",
                zIndex: 2,
              }}
            >
              <CircularProgress />
            </Box>
          )}
          <Typography
            sx={{ fontSize: "16px", fontWeight: "bold", mb: 2 }}
            component="h3"
          >
            User Details
          </Typography>
          <Grid
            columnCount={2}
            component="form"
            rowGap="20px"
            sx={{
              minWidth: "940px",
              "& .MuiFilledInput-root": {
                height: "58px !important",
              },
            }}
          >
            <Input
              name="email"
              control={control}
              error={!!errors?.email?.message}
              variant="filled"
              label="Email Address*"
              type="email"
              autoComplete="off"
            />
            <Input
              name="password"
              control={control}
              error={!!errors?.password?.message}
              variant="filled"
              label="password*"
              type="password"
              autoComplete="new-password"
            />
            <Input
              name="mobileNo"
              control={control}
              error={!!errors?.mobileNo?.message}
              variant="filled"
              label="Contact Number*"
            />
            <Input
              name="name"
              control={control}
              error={!!errors?.name?.message}
              variant="filled"
              label="Full Name*"
            />
            <Input
              name="status"
              control={control}
              error={!!errors?.name?.message}
              variant="filled"
              label="Status"
              select
            >
              <MenuItem value="ACTIVE">Active</MenuItem>
              <MenuItem value="INACTIVE">Inactive</MenuItem>
            </Input>
            <Box />
            <Roles
              control={control}
              roles={roles}
              onAdd={handleAddRole}
              onDelete={handleDeleteRole}
            />
            <DataPrivileges control={control} />
          </Grid>
          <Box sx={{ display: "flex", gap: 2, py: 2 }}>
            <GradientButton onClick={handleSubmit(onSubmit)} size="large">
              Save
            </GradientButton>
            <GradientButton onClick={handleDiscard} size="large" invert>
              Discard
            </GradientButton>
          </Box>
        </DialogContent>
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
      </FormModal>
      <WarningDialog
        open={showError}
        onAccept={() => {
          setError("");
          setShowError(false);
        }}
        title="Something went Wrong!"
        acceptButtonTitle="Discard"
        description={transformError(error)}
      />
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

export default AddUserPage;
