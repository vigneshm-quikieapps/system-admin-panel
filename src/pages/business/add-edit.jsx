import { cloneElement, useState } from "react";
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
  useScrollTrigger,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";

import { useMuiRegister } from "../../hooks";
import { TextField, GradientButton, Grid } from "../../components";
import Address from "./components/address";

const FormModal = styled(Dialog)(({ theme }) => ({
  "& .MuiPaper-root": { borderRadius: theme.shape.borderRadiuses.ternary },
  "& label": { lineHeight: "initial !important" },
}));

function ElevationScroll(props) {
  const { children, targetRef } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 65,
    target: targetRef ? targetRef : undefined,
  });

  return cloneElement(children, {
    style: trigger ? { boxShadow: "0 0px 6px #0006" } : {},
  });
}

const validationSchema = Yup.object()
  .shape({
    name: Yup.string().min(3).label("Business Name"),
    code: Yup.string()
      .min(3, "Business Code Must be 3 to 5 characters")
      .max(5, "Business Code Must be 3 to 5 characters"),
    tradename: Yup.string().min(3).label("Trade Name"),
    type: Yup.string().required().label("Business Type"),
    status: Yup.string().required().label("Status"),
    postcode: Yup.string().min(5).label("Postcode"),
    line1: Yup.string().required().label("Address Line 1"),
    city: Yup.string().required().label("City / Town"),
    country: Yup.string().required().label("Country"),
  })
  .required();

const AddBusinessPage = () => {
  const navigate = useNavigate();
  const { id } = useParams;
  const [contentRef, setContentRef] = useState();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(validationSchema),
    reValidateMode: "onChange",
  });

  const muiRegister = useMuiRegister(register);

  const onSubmit = (data) => {
    console.log(data);
  };

  const handleClose = () => navigate("/business");
  const handleDiscard = () => {};
  return (
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
        onClick={handleClose}
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
          <TextField
            {...muiRegister("name")}
            error={!!errors?.name?.message}
            variant="filled"
            label="Business Registered Name*"
          />
          <TextField
            {...muiRegister("code")}
            error={!!errors?.code?.message}
            variant="filled"
            label="Business Code*"
          />
          <TextField
            {...muiRegister("tradename")}
            error={!!errors?.tradename?.message}
            variant="filled"
            label="Business Trade Name*"
          />
          <TextField
            {...muiRegister("type")}
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
          </TextField>
          <TextField
            {...muiRegister("status")}
            error={!!errors?.status?.message}
            variant="filled"
            label="Status*"
            select
            defaultValue="ACTIVE"
          >
            <MenuItem value="ACTIVE">Active</MenuItem>
            <MenuItem value="INACTIVE">Inactive</MenuItem>
          </TextField>
          <TextField variant="filled" label="Primary Contact Name" />
          <TextField
            variant="filled"
            label="Primary Contact Email"
            type="email"
          />
          <TextField variant="filled" label="Primary Contact Telephone" />
          <TextField variant="filled" label="Primary Contact Mobile" />
          <TextField
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
            register={muiRegister}
            errors={errors}
            setValue={setValue}
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
      {!isValid && (
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
  );
};

export default AddBusinessPage;
