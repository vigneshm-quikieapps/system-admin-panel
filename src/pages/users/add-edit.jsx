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
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";

import { usePostUser, usePutUser } from "../../services/mutations";
import Address from "./components/address";
import { arrowDownIcon } from "../../assets/icons";
import { useGetUser } from "../../services/queries";
import { transformError } from "../../utils";
import {
  Accordion,
  ElevationScroll,
  Input,
  GradientButton,
  Grid,
  WarningDialog,
  ImgIcon,
  TextField,
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
    password: Yup.string()
      .min(6)
      .matches(
        /(?=.*[A-Z])/,
        "Password should contain at least one Upper Case letter",
      )
      .matches(
        /(?=.*[a-z])/,
        "Password should contain at least one lower case letter",
      )
      .matches(/(?=.*[0-9])/, "Password should contain at least one digit")
      .label("Password"),
    name: Yup.string().min(5).label("Full Name"),
    mobileNo: Yup.string().required().label("Contact Number"),
    status: Yup.string()
      .oneOf(["ACTIVE", "INACTIVE"])
      .required()
      .label("Status"),
    roles: Yup.array()
      .min(1)
      .required()
      .of(
        Yup.object()
          .shape({
            _id: Yup.string().required(),
            name: Yup.string().required(),
          })
          .required(),
      ),
    isCoach: Yup.boolean(),
    isParent: Yup.boolean(),
    dataPrivileges: Yup.object().shape({
      all: Yup.boolean().required(),
      list: Yup.array().of(
        Yup.object()
          .shape({
            _id: Yup.string().required(),
            name: Yup.string().required(),
          })
          .required(),
      ),
    }),
    postcode: Yup.string().min(6).label("Postcode"),
    line1: Yup.string().required().label("Address Line 1"),
    line2: Yup.string().label("Address Line 2"),
    city: Yup.string().required().label("City / Town"),
    country: Yup.string().required().label("Country"),
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
    setFocus,
    setValue,
    formState: { errors, dirtyFields },
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
      isParent: false,
      dataPrivileges: {
        all: false,
        list: [],
      },
    },
  });

  const roles = watch("roles");
  const businesses = watch("dataPrivileges.list");

  const onSubmit = (data) => {
    const updatedRoles = data.roles.map(({ _id }) => _id);
    const updatedList = data.dataPrivileges.list.map(({ _id }) => _id);
    const { email, mobileNo, ...otherData } = data;
    if (!id) {
      otherData.email = email;
      otherData.mobileNo = mobileNo;
    }
    let updatedData = {
      ...otherData,
      roles: updatedRoles,
      dataPrivileges: { ...data.dataPrivileges, list: updatedList },
    };
    if (!dirtyFields.password) delete updatedData.password;
    id
      ? putUser(updatedData, { onSuccess: () => navigate("/users") })
      : postUser(updatedData, { onSuccess: () => navigate("/users") });
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

  const handleAddBusiness = (id, name) => {
    const updatedBusinesses = [...getValues("dataPrivileges.list")];
    if (
      updatedBusinesses.findIndex(({ _id: businessId }) => businessId === id) >
      -1
    )
      return;
    updatedBusinesses.push({ _id: id, name });
    setValue("dataPrivileges.list", updatedBusinesses);
  };

  const handleDeleteBusiness = (id) => {
    const currentBusinesses = [...getValues("dataPrivileges.list")];
    const updatedBusinesses = currentBusinesses.filter(({ _id }) => _id !== id);
    setValue("dataPrivileges.list", updatedBusinesses);
  };

  useEffect(() => {
    if (data?.user) {
      const userInfo = { ...data.user, password: "a@mnzb731xHG" };
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
            columnCount={3}
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
              inputProps={{ readOnly: !!id }}
            />
            <Input
              name="password"
              control={control}
              error={!!errors?.password?.message}
              variant="filled"
              label="password*"
              type="password"
              inputProps={{ autoComplete: "new-password" }}
              onFocus={() => setValue("password", "")}
            />
            <Input
              name="mobileNo"
              control={control}
              error={!!errors?.mobileNo?.message}
              variant="filled"
              label="Contact Number*"
              inputProps={{ readOnly: !!id }}
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
            <Address
              isEdit={!!id}
              control={control}
              errors={errors}
              setValue={setValue}
              setFocus={setFocus}
              watch={watch}
            />
            <Roles
              control={control}
              roles={roles}
              onAdd={handleAddRole}
              onDelete={handleDeleteRole}
            />
            <DataPrivileges
              control={control}
              businesses={businesses}
              onAdd={handleAddBusiness}
              onDelete={handleDeleteBusiness}
            />
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
