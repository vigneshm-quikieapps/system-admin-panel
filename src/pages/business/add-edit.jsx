import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { styled } from "@mui/material/styles";
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  MenuItem,
  IconButton,
  CircularProgress,
  Paper,
  Button,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import errorIcon from "../../assets/icons/icon-error.png";
import { usePostBusiness, usePutBusiness } from "../../services/mutations";
import { useGetBusiness } from "../../services/queries";
import { transformError } from "../../utils";
import {
  ElevationScroll,
  Input,
  GradientButton,
  Grid,
  WarningDialog,
  ImgIcon,
} from "../../components";
import Address from "./components/address";
import { min } from "date-fns/esm";

const FormModal = styled(Dialog)(({ theme }) => ({
  "& .MuiPaper-root": { borderRadius: theme.shape.borderRadiuses.ternary },
  "& label": { lineHeight: "initial !important" },
}));

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Business Name is mandatory")
    .label("Business Name"),
  code: Yup.string()
    .required("Business Code is mandatory")
    .max(5, "Business Code is mandatory")
    .label("Business code"),
  tradename: Yup.string()
    .required("Business Trade Name is mandatory")
    .label("Trade Name"),
  type: Yup.string().required().label("Business Type"),
  status: Yup.string().required().label("Status"),
  contactName: Yup.string(),
  contactEmail: Yup.string().email().optional().label("Primary Contact Email"),
  primaryMobileNo: Yup.string().test({
    name: "mobile",
    test: (value) =>
      value?.length === 10 || value?.length === 0 ? true : false,
    message: "Primary Contact Mobile must be 10 digits",
  }),
  primaryPhone: Yup.string().test({
    name: "telephone",
    test: (value) =>
      value?.length === 10 || value?.length === 0 ? true : false,
    message: "Primary Contact Telephone must be 10 digits",
  }),
  about: Yup.string(),
  postcode: Yup.string()
    .min(6, "Post Code is mandatory")
    .required("Post Code is mandatory")
    .label("Post Code"),
  line1: Yup.string()
    .required("Address Line 1 is mandatory")
    .label("Address Line 1"),
  line2: Yup.string().label("Address Line 2"),
  city: Yup.string().required("City/Town is mandatory").label("City / Town"),
  country: Yup.string().required().label("Country"),
});

const AddBusinessPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [showWarning, setShowWarning] = useState(false);
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState("");
  const [contentRef, setContentRef] = useState();
  const [checkError, setCheckError] = useState(false);
  const [displayError, setDisplayError] = useState({});
  const { data, isLoading: getIsLoading } = useGetBusiness(id, {
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    onError: (error) => {
      setShowError(true);
      setError(error);
    },
  });

  const { isLoading, mutate: postBusiness } = usePostBusiness({
    onError: (error) => {
      setShowError(true);
      setError(error);
    },
  });
  const { isLoading: isPutLoading, mutate: putBusiness } = usePutBusiness({
    onError: (error) => {
      setShowError(true);
      setError(error);
    },
  });

  const {
    control,
    handleSubmit,
    setValue,
    setFocus,
    watch,
    // for setting default values from back-end
    reset: resetFormData,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    reValidateMode: "onChange",
    // defaultValues: { line1: "test", about: "about" },
  });
  useEffect(() => {
    setDisplayError(errors);
  }, [errors]);
  const onSubmit = (data) => {
    id
      ? putBusiness(data, { onSuccess: () => navigate("/business") })
      : postBusiness(data, { onSuccess: () => navigate("/business") });
  };

  const handleClose = () => navigate("/business");
  const handleDiscard = () => {
    setShowWarning(true);
  };

  useEffect(() => {
    data?.business && resetFormData(data.business);
  }, [resetFormData, data]);
  console.log("before delete", errors);
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
            Business Basic Information
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
            Basic Information
          </Typography>
          <Grid
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
              name="name"
              control={control}
              error={!!errors?.name?.message}
              variant="outlined"
              label="Business Registered Name*"
              // rules={{
              //   required: true,
              //   validate: {
              //     checkEmail: {
              //       value: (v) => validateName(v),
              //       message: "Invalid name",
              //     },
              //   },
              // }}
            />
            <Input
              name="code"
              control={control}
              error={!!errors?.code?.message}
              variant="outlined"
              label="Business Code*"
              inputProps={{ readOnly: !!id }}
            />
            <Input
              name="tradename"
              control={control}
              error={!!errors?.tradename?.message}
              variant="outlined"
              label="Business Trade Name*"
            />
            <Input
              name="type"
              control={control}
              error={!!errors?.type?.message}
              variant="filled"
              label="Business Type*"
              defaultValue="LIMITED_COMPANY"
              select
            >
              <MenuItem value="LIMITED_COMPANY">Limited Company</MenuItem>
              <MenuItem value="LIMITED_LIABILITY_PARTNERSHIP">
                Limited Liability Partnership
              </MenuItem>
              <MenuItem value="SOLE_TRADER">Sole Trader</MenuItem>
            </Input>
            <Input
              name="status"
              control={control}
              error={!!errors?.status?.message}
              variant="filled"
              label="Status*"
              select
              defaultValue="ACTIVE"
            >
              <MenuItem value="ACTIVE">Active</MenuItem>
              <MenuItem value="INACTIVE">Inactive</MenuItem>
            </Input>
            <Input
              name="contactName"
              control={control}
              variant="outlined"
              label="Primary Contact Name"
            />
            <Input
              name="contactEmail"
              control={control}
              variant="outlined"
              label="Primary Contact Email"
              type="email"
            />
            <Input
              name="primaryPhone"
              control={control}
              variant="outlined"
              label="Primary Contact Telephone"
            />
            <Input
              name="primaryMobileNo"
              control={control}
              variant="outlined"
              label="Primary Contact Mobile"
            />
            <Input
              name="about"
              control={control}
              variant="outlined"
              label="About this Business"
              multiline
              rows={4}
              sx={{
                gridColumnEnd: "span 3",
                "& .MuiOutlinedInput-root": { height: "initial !important" },
              }}
            />
            <Address
              isEdit={!!id}
              control={control}
              errors={errors}
              setValue={setValue}
              setFocus={setFocus}
              watch={watch}
            />
          </Grid>
          <Box sx={{ display: "flex", gap: 2, py: 2 }}>
            <GradientButton onClick={handleSubmit(onSubmit)} size="large">
              Save
            </GradientButton>
            <GradientButton
              onClick={handleDiscard}
              size="large"
              sx={{
                "&:hover": {
                  backgroundImage:
                    "linear-gradient(106deg, #ff1a6d, #ff6e2d 100%)",
                  color: "white",
                },
              }}
              invert
            >
              Discard
            </GradientButton>
          </Box>
        </DialogContent>
      </FormModal>
      <Dialog
        open={!!Object.keys(displayError).length}
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
        <DialogContent sx={{ textAlign: "center" }}></DialogContent>
        {!!Object.keys(errors).length && (
          <DialogActions
            sx={{
              flexDirection: "column",
              alignItems: "flex-start",
              p: 2,
              position: "relative",
            }}
          >
            {Object.values(errors)
              // .reverse()
              .map(({ message }, index) => (
                <Typography
                  key={index}
                  sx={{
                    color: "error.main",
                    sm: "0 !important",
                    margin: "0 9px 5px 9px",
                  }}
                  component="span"
                >
                  {message}
                </Typography>
              ))}
            <Button
              sx={{ color: "#ff2c60" }}
              onClick={() => {
                setDisplayError({});
              }}
              autoFocus
            >
              OK
            </Button>
          </DialogActions>
        )}
      </Dialog>
      <WarningDialog
        open={showError}
        onAccept={() => {
          setError("");
          setShowError(false);
        }}
        title="Error"
        acceptButtonTitle="OK"
        description={transformError(error)}
      />
      <WarningDialog
        showReject
        open={showWarning}
        onAccept={handleClose}
        onReject={() => setShowWarning(false)}
        title="Warning"
        description="Are you sure you want to discard without saving?"
      />
    </>
  );
};

export default AddBusinessPage;
