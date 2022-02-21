import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  AccordionSummary,
  AccordionDetails,
  Box,
  MenuItem,
  Typography,
  IconButton,
  DialogActions,
  Paper,
} from "@mui/material";
import { styled } from "@mui/material/styles";
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
  WarningDialog,
} from "../../components";
import deleteIcon from "../../assets/icons/icon-delete.png";
import { useGetBusiness, useGetBusinessFinance } from "../../services/queries";
import {
  updateFinance,
  getDiscount,
  addDiscount,
} from "../../services/businessServices";
import { da } from "date-fns/locale";

const Page = ({ setPageTitle }) => {
  const navigate = useNavigate();

  const [bankDetails, setBankDetails] = useState({});
  const [paymentChannels, setPaymentChannels] = useState({});
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [discountSchemes, setDiscountSchemes] = useState([]);
  const [errors, setErrors] = useState({});
  const [showWarning, setShowWarning] = useState(false);
  const [status, setStatus] = useState({
    payMethod: false,
    discountStatus: false,
  });
  useEffect(() => setPageTitle("Finance Info"));

  const { id } = useParams();
  const { data = { business: {} } } = useGetBusiness(id);
  const {
    business: { name, finance },
  } = data;
  useEffect(() => {
    setBankDetails(finance?.bankDetails);
    setPaymentChannels(finance?.paymentChannels);
    setPaymentMethods(finance?.paymentMethods);
    getDiscount(id).then((data) => setDiscountSchemes(data));
  }, [data]);
  const checkboxHandler = (name, e) => {
    if (name === "Online") {
      setPaymentChannels((initial) => ({
        ...initial,
        online: e.target.checked, //true
        manual: false,
      }));
    } else {
      setPaymentChannels((initial) => ({
        ...initial,
        online: false, //false
        manual: e.target.checked, //true
      }));
    }
  };
  const changeHandler = (e, field, index) => {
    const value =
      [
        "Account Holder Name",
        "Bank Name",
        "Sort Code",
        "Account Number",
        "Pay Method",
        "Add New Method",
        "Discount",
        "Add New Discount",
      ].indexOf(field) > -1
        ? e.target.value
        : e;
    switch (field) {
      case "Account Holder Name": {
        return setBankDetails((initial) => ({
          ...initial,
          accHolderName: value,
        }));
      }
      case "Bank Name": {
        return setBankDetails((initial) => ({
          ...initial,
          bankName: value,
        }));
      }
      case "Sort Code": {
        return setBankDetails((initial) => ({
          ...initial,
          sortCode: value,
        }));
      }
      case "Account Number": {
        return setBankDetails((initial) => ({
          ...initial,
          accNo: value,
        }));
      }
      case "Pay Method": {
        const newState = [...paymentMethods];
        newState[index] = value;
        setPaymentMethods(newState);
        return;
      }
      case "Add New Method": {
        const newState = [...paymentMethods];
        newState.unshift(value);
        setPaymentMethods(newState);
        return;
      }
      case "Discount": {
        const newState = [...discountSchemes];
        newState[index] = value;
        setDiscountSchemes(newState);
        return;
      }
      case "Add New Discount": {
        const newState = [...discountSchemes];
        newState.unshift(value);
        setDiscountSchemes(newState);
        return;
      }
      default: {
        return;
      }
    }
  };
  const addNewData = (type, status) => {
    if (type === "PayMethod")
      setStatus((initial) => ({ ...initial, payMethod: status }));
    else if (type === "Discount")
      setStatus((initial) => ({ ...initial, discountStatus: status }));
  };
  const updateData = async () => {
    await updateFinance(id, {
      bankDetails,
      paymentChannels,
      paymentMethods,
      discountSchemes,
    });
  };
  const addNewDiscount = async () => {
    await addDiscount({ businessId: id, name: "discount 100", value: 100 });
  };

  const handleClose = () => navigate("/evaluation");
  const handleDiscard = () => {
    setShowWarning(true);
  };

  return (
    <>
      <AccordionContainer>
        <Accordion defaultExpanded={true} enabled={false}>
          <AccordionSummary style={{ height: "123px", cursor: "default" }}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography style={{ fontSize: "28px" }}>{name}</Typography>
              <Typography sx={{ opacity: 0.5, fontSize: "14px !important" }}>
                BusinessID
              </Typography>
              <Typography sx={{ fontSize: "13px important" }}>{id}</Typography>
            </Box>
          </AccordionSummary>
        </Accordion>
      </AccordionContainer>
      <AccordionContainer>
        <Accordion defaultExpanded={true}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography style={{ fontSize: "20px" }}>
                Business Bank Details
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Grid sx={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              <TextField
                variant="filled"
                label="Account Holder Name"
                value={bankDetails?.accHolderName || ""}
                onChange={(e) => {
                  changeHandler(e, "Account Holder Name");
                }}
              ></TextField>
              <TextField
                variant="filled"
                label="Bank Name"
                value={bankDetails?.bankName || ""}
                onChange={(e) => {
                  changeHandler(e, "Bank Name");
                }}
              ></TextField>
              <TextField
                variant="filled"
                label="Sort Code"
                value={bankDetails?.sortCode || ""}
                onChange={(e) => {
                  changeHandler(e, "Sort Code");
                }}
              ></TextField>
              <TextField
                item
                xs={2}
                variant="filled"
                label="Account Number"
                value={bankDetails?.accNo || ""}
                onChange={(e) => {
                  changeHandler(e, "Account Number");
                }}
              ></TextField>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </AccordionContainer>
      <AccordionContainer>
        <Accordion defaultExpanded={true}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography>Payment Channels (PBD)</Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              height: "100px",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            <Box>
              <CheckBox
                sx={{
                  margin: "0 1.3rem",
                }}
                checked={paymentChannels?.online || false}
                onChange={(e) => {
                  checkboxHandler("Online", e);
                }}
              />
              <Typography sx={{ display: "inline-block" }}>
                Online Payment (Strip)
              </Typography>
            </Box>
            <Box>
              <CheckBox
                sx={{
                  margin: "0 1.3rem",
                }}
                checked={paymentChannels?.manual || false}
                onChange={(e) => {
                  checkboxHandler("Manual", e);
                }}
              />
              <Typography sx={{ display: "inline-block" }}>
                Manual Bank Transfer
              </Typography>
            </Box>
          </AccordionDetails>
        </Accordion>
      </AccordionContainer>
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
              <Typography style={{ flex: 1 }}>Payment Methods</Typography>
              <AddButton
                style={{ marginRight: "1%" }}
                onClick={(e) => {
                  e.stopPropagation();
                  addNewData("PayMethod", true);
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
                Method Name
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
          {status?.payMethod && (
            <AccordionDetails>
              <Box>
                <TextField
                  sx={{
                    height: "44px",
                    "& .MuiFilledInput-input": { py: 0 },
                    width: "80%",
                  }}
                  placeholder="Enter Method"
                  label="Add New Method"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      changeHandler(e, "Add New Method");
                      setStatus((initial) => ({
                        ...initial,
                        payMethod: false,
                      }));
                    }
                  }}
                ></TextField>
                <IconButton
                  style={{
                    marginRight: "7%",
                    float: "right",
                  }}
                  onClick={() => {
                    setStatus((initial) => ({ ...initial, payMethod: false }));
                  }}
                >
                  <ImgIcon>{deleteIcon}</ImgIcon>
                </IconButton>
              </Box>
            </AccordionDetails>
          )}
          {paymentMethods?.map((pay, index) => (
            <AccordionDetails>
              <Box>
                <TextField
                  sx={{
                    height: "44px",
                    "& .MuiFilledInput-input": { py: 0 },
                    width: "80%",
                  }}
                  variant="filled"
                  value={pay}
                  placeholder="Enter Method"
                  onChange={(e) => {
                    changeHandler(e, "Pay Method", index);
                  }}
                ></TextField>
                <IconButton
                  style={{
                    marginRight: "7%",
                    float: "right",
                  }}
                  onClick={() => {
                    const newState = [...paymentMethods];
                    newState.splice(index, index + 1);
                    setPaymentMethods(newState);
                  }}
                >
                  <ImgIcon>{deleteIcon}</ImgIcon>
                </IconButton>
              </Box>
            </AccordionDetails>
          ))}
        </Accordion>
      </AccordionContainer>
      <AccordionContainer>
        <Accordion defaultExpanded={true} onClick={() => {}}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box
              sx={{
                display: "flex",
                flex: 1,
                alignItems: "center",
              }}
            >
              <Typography style={{ flex: 1 }}>Discount Schemes</Typography>
              <AddButton
                style={{ marginRight: "1%" }}
                onClick={(e) => {
                  e.stopPropagation();
                  addNewData("Discount", true);
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
                Discount Schemes
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
              <Typography
                style={{
                  marginRight: "5%",
                  fontSize: "18px",
                  fontWeight: "bold",
                  display: "inline",
                  float: "right",
                }}
              >
                Percentage
              </Typography>
            </Box>
          </AccordionDetails>
          {status.discountStatus && (
            <AccordionDetails>
              <Box>
                <TextField
                  sx={{
                    height: "44px",
                    "& .MuiFilledInput-input": { py: 0 },
                    width: "60%",
                  }}
                  variant="filled"
                  placeholder="Enter Discount"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      changeHandler(e, "Add New Discount");
                      setStatus((initial) => ({
                        ...initial,
                        discountStatus: false,
                      }));
                    }
                  }}
                ></TextField>
                <IconButton
                  style={{
                    marginRight: "7%",
                    float: "right",
                  }}
                  onClick={() => {
                    setStatus((initial) => ({
                      ...initial,
                      discountStatus: false,
                    }));
                  }}
                >
                  <ImgIcon>{deleteIcon}</ImgIcon>
                </IconButton>
                <TextField
                  sx={{
                    marginRight: "7%",
                    width: "6%",
                    float: "right",
                    height: "44px",
                    "& .MuiFilledInput-input": { py: 0 },
                  }}
                  variant="filled"
                  placeholder="%"
                ></TextField>
              </Box>
            </AccordionDetails>
          )}
          {discountSchemes?.map((discount, index) => (
            <AccordionDetails>
              <Box>
                <TextField
                  sx={{
                    height: "44px",
                    "& .MuiFilledInput-input": { py: 0 },
                    width: "60%",
                  }}
                  variant="filled"
                  value={discount?.name || ""}
                  placeholder="Enter Method"
                  onChange={(e) => {
                    changeHandler(e, "Discount", index);
                  }}
                ></TextField>
                <IconButton
                  style={{
                    marginRight: "7%",
                    float: "right",
                  }}
                  onClick={() => {
                    const newState = [...discountSchemes];
                    newState.splice(index, index + 1);
                    setDiscountSchemes(newState);
                  }}
                >
                  <ImgIcon>{deleteIcon}</ImgIcon>
                </IconButton>
                <TextField
                  sx={{
                    marginRight: "7%",
                    width: "6%",
                    float: "right",
                    height: "44px",
                    "& .MuiFilledInput-input": { py: 0 },
                  }}
                  variant="filled"
                  value={discount?.value || 0}
                  placeholder="%"
                ></TextField>
              </Box>
            </AccordionDetails>
          ))}
        </Accordion>
      </AccordionContainer>
      <GradientButton
        sx={{ maxWidth: "fit-content" }}
        onClick={() => {
          setStatus((initial) => ({
            ...initial,
            payMethod: false,
            discountStatus: false,
          }));
          updateData();
          // addNewDiscount();
        }}
      >
        Save
      </GradientButton>
      <GradientButton
        onClick={handleDiscard}
        invert
        sx={{ marginLeft: "20px" }}
      >
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
