import { cloneElement, useState } from "react";
import { useNavigate } from "react-router-dom";
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

import { TextField, GradientButton, Grid } from "../../components";

const FormModal = styled(Dialog)(({ theme }) => ({
  "& .MuiPaper-root": { borderRadius: theme.shape.borderRadiuses.ternary },
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

const Page = () => {
  const navigate = useNavigate();
  const [contentRef, setContentRef] = useState();

  const handleClose = () => navigate("/business");
  const handleSave = () => {};
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
          <TextField variant="filled" label="Business Registered Name*" />
          <TextField variant="filled" label="Business Code*" />
          <TextField variant="filled" label="Business Trade Name*" />
          <TextField variant="filled" label="Business Type*" select>
            <MenuItem value="LIMITED_COMPANY">Limited Company</MenuItem>
            <MenuItem value="LIMITED_LIABILITY_PARTNERSHIP">
              Limited Liability Partnership
            </MenuItem>
            <MenuItem value="SOLE_TRADER">Sole Trader</MenuItem>
          </TextField>
          <TextField variant="filled" label="Status*" select>
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
          <Grid
            columnCount={2}
            sx={{
              bgcolor: "#ECEBF0",
              p: 2,
              borderRadius: 2,
              gridColumnEnd: "span 3",
            }}
          >
            <Typography
              component="h3"
              sx={{
                fontWeight: "bold",
                fontSize: "14px",
                gridColumnEnd: "span 2",
              }}
            >
              Address
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gridRow: "2 / span 7",
                gridColumnStart: "2",
              }}
            >
              <GradientButton>Enter Address Manually</GradientButton>
            </Box>
            <TextField variant="filled" label="Enter a postcode*" />
            <TextField variant="filled" label="Start typing an address" />
            <TextField variant="filled" label="Address Line 1*" />
            <TextField variant="filled" label="Address Line 2" />
            <TextField variant="filled" label="City / Town*" />
            <TextField variant="filled" label="Country*" select>
              <MenuItem value="UK">United Kingdom</MenuItem>
            </TextField>
            <TextField variant="filled" label="Geo Location*" />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "flex-start", p: 2 }}>
        <GradientButton onClick={handleSave} size="large">
          Save
        </GradientButton>
        <GradientButton onClick={handleDiscard} size="large" invert>
          Discard
        </GradientButton>
      </DialogActions>
    </FormModal>
  );
};

export default Page;
