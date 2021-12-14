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
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";

import { usePostBusiness, usePutBusiness } from "../../services/mutations";
import { useGetBusiness } from "../../services/queries";
import { transformError } from "../../utils";
import {
  ElevationScroll,
  Input,
  GradientButton,
  Grid,
  WarningDialog,
} from "../../components";
import Address from "./components/address";

const FormModal = styled(Dialog)(({ theme }) => ({
  "& .MuiPaper-root": { borderRadius: theme.shape.borderRadiuses.ternary },
  "& label": { lineHeight: "initial !important" },
}));

const validationSchema = Yup.object()
  .shape({
    name: Yup.string().required().label("Business Name"),
    code: Yup.string()
      .required("Business Code is required and must be at most 5 Characters")
      .max(5, "Business Code is required and must be at most 5 Characters"),
    tradename: Yup.string().required().label("Trade Name"),
    type: Yup.string().required().label("Business Type"),
    status: Yup.string().required().label("Status"),
    postcode: Yup.string().min(6).label("Postcode"),
    line1: Yup.string().required().label("Address Line 1"),
    line2: Yup.string().label("Address Line 2"),
    city: Yup.string().required().label("City / Town"),
    country: Yup.string().required().label("Country"),
    contactName: Yup.string(),
    contactEmail: Yup.string()
      .email()
      .optional()
      .label("Primary Contact Email"),
    primaryMobileNo: Yup.string().min(9).optional(),
    primaryPhone: Yup.string().min(6).optional(),
    about: Yup.string(),
  })
  .required();

const AddBusinessPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [showWarning, setShowWarning] = useState(false);
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState("");
  const [contentRef, setContentRef] = useState();
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
              variant="filled"
              label="Business Registered Name*"
            />
            <Input
              name="code"
              control={control}
              error={!!errors?.code?.message}
              variant="filled"
              label="Business Code*"
              inputProps={{ readOnly: !!id }}
            />
            <Input
              name="tradename"
              control={control}
              error={!!errors?.tradename?.message}
              variant="filled"
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
              variant="filled"
              label="Primary Contact Name"
            />
            <Input
              name="contactEmail"
              control={control}
              variant="filled"
              label="Primary Contact Email"
              type="email"
            />
            <Input
              name="primaryPhone"
              control={control}
              variant="filled"
              label="Primary Contact Telephone"
            />
            <Input
              name="primaryMobileNo"
              control={control}
              variant="filled"
              label="Primary Contact Mobile"
            />
            <Input
              name="about"
              control={control}
              variant="filled"
              label="About this Business"
              multiline
              rows={4}
              sx={{
                gridColumnEnd: "span 3",
                "& .MuiFilledInput-root": { height: "initial !important" },
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

export default AddBusinessPage;
