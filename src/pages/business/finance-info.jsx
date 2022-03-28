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
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import informationIcon from "../../assets/icons/icon-information.png";
import warningIcon from "../../assets/icons/icon-warning.png";
import errorIcon from "../../assets/icons/icon-error.png";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Done as DoneIcon,
  Save as AddIcon,
  Undo as RestoreDefaultsIcon,
  ClearRounded as CancelIcon,
} from "@mui/icons-material";
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
  Button,
} from "../../components";
import deleteIcon from "../../assets/icons/icon-delete.png";
import { useUpdateFinance, useCreateFinance } from "../../services/mutations";
import { useGetBusiness, useGetBusinessFinance } from "../../services/queries";
import { transformError } from "../../utils";
import {
  // updateFinance,
  getDiscount,
  addDiscount,
  updateDiscount,
  deleteDiscount,
} from "../../services/businessServices";
import { da } from "date-fns/locale";

const customTransformError = (error, customMessage = "Error") => {
  error = error?.response?.data;
  let message = error?.message || customMessage;
  let errors = error?.errors;
  if (Array.isArray(errors) && errors.length > 0) {
    message = errors.reduce((prev, errorItem) => {
      if (typeof errorItem === "string") return (prev += errorItem + "\n");
      const errorEntries = Object.values(errorItem);
      console.log(errorEntries);
      return (prev += errorEntries.join("\n") + "\n");
    }, "");
  }
  return message;
};

const Page = ({ setPageTitle }) => {
  const navigate = useNavigate();

  const [updateStatus, setUpdateStatus] = useState(false);
  const [isDiscountSaved, setIsDiscountSaved] = useState(false);
  const [bankDetails, setBankDetails] = useState({});
  const [paymentChannels, setPaymentChannels] = useState({
    online: false,
    manual: false,
  });
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [discountSchemes, setDiscountSchemes] = useState([]);
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [financeMessage, setFinanceMessage] = useState();
  const [icon, setIcon] = useState();
  const [title, setTitle] = useState();
  useEffect(() => setPageTitle("Finance Info"));

  const { id } = useParams();
  const { data = { business: {} } } = useGetBusiness(id);
  const {
    business: { name, finance, type, city },
  } = data;
  // console.log("data", data);
  useEffect(() => {
    setBankDetails(finance?.bankDetails || {});
    setPaymentChannels(finance?.paymentChannels || {});
    const newState =
      finance?.paymentMethods.map((pay) => ({
        pay,
      })) || [];
    setPaymentMethods(newState || []);
    getDiscount(id)
      .then((data) => setDiscountSchemes(data))
      .catch(() => setDiscountSchemes([]));
  }, [data]);
  const checkboxHandler = (name, e) => {
    if (name === "Online") {
      setPaymentChannels((initial) => ({
        ...initial,
        online: e.target.checked,
      }));
    } else {
      setPaymentChannels((initial) => ({
        ...initial,
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
      default: {
        return;
      }
    }
  };
  const { isLoading: isDataLoading, mutate: updateFinance } = useUpdateFinance({
    onError: (error) => {
      setShowError(true);
      setError(error);
    },
  });

  const { isLoading: isLoading, mutate: createFinance } = useCreateFinance({
    onError: (error) => {
      setShowError(true);
      setError(error);
    },
  });

  // const updateData = async () => {
  //   await updateFinance(finance._id, {
  //     bankDetails,
  //     paymentChannels,
  //     paymentMethods: paymentMethods?.map((data) => data.pay),
  //   }).then((response) => console.log(response));
  //   setUpdateStatus(true);
  // };

  const updateData = () => {
    if (finance?._id) {
      updateFinance(
        // finance._id,
        {
          bankDetails,
          paymentChannels,
          paymentMethods: paymentMethods?.map((data) => data.pay),
          _id: finance._id,
        },
        { onSuccess: () => navigate("/Business") },
      );
    } else {
      createFinance(
        {
          businessId: id,
          bankDetails,
          paymentChannels,
          paymentMethods: paymentMethods?.map((data) => data.pay),
          discountSchemes: discountSchemes.map((data) => ({
            name: data?.name,
            value: data?.value,
          })),
          // charges: [],
        },
        { onSuccess: () => navigate("/Business") },
      );
    }
  };

  const addNewDiscount = async (name, value) => {
    await addDiscount({ businessId: id, name, value });
  };
  const updateDiscountData = async (_id, name, value) => {
    await updateDiscount(_id, { name, value });
  };
  const deleteDiscountData = async (_id) => {
    await deleteDiscount(_id);
  };

  const handleClose = () => navigate(`/business/details/${id}`);
  const handleDiscard = () => {
    setShowWarning(true);
  };
  const handleOnClickSubmitFinance = () => {
    setUpdateStatus(false);
    navigate(`/business/details/${id}`);
  };
  const handleOnClickSubmitDiscount = () => {
    setIsDiscountSaved(false);
  };
  // const getIsDiscountSaved = () =>
  //   setIsDiscountSaved(
  //     discountSchemes.some((discount) => discount.add || discount.touched) ||
  //       paymentMethods.some((pay) => pay.add || pay.touched),
  //   );
  console.log(error);
  return (
    <>
      <AccordionContainer>
        <Accordion defaultExpanded={true} enabled={false}>
          <AccordionSummary style={{ height: "123px", cursor: "default" }}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography style={{ fontSize: "28px" }}>{name}</Typography>

              <Typography sx={{ fontSize: "13px important" }}>
                {city}
              </Typography>
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
              <Typography>Payment Channels</Typography>
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
                Online Payment (Stripe)
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
                  const newState = [...paymentMethods];
                  newState.unshift({ pay: "", add: true });
                  setPaymentMethods(newState);
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
          {paymentMethods?.map((data, index) => (
            <AccordionDetails>
              <Box sx={{ display: "flex", justifyContent: "space-around" }}>
                <TextField
                  sx={{
                    height: "44px",
                    "& .MuiFilledInput-input": { py: 0 },
                    width: "75%",
                  }}
                  variant="filled"
                  value={data.pay}
                  placeholder="Enter Method"
                  onChange={(e) => {
                    const newState = [...paymentMethods];
                    newState[index].pay = e.target.value;
                    newState[index].touched = true;
                    setPaymentMethods(newState);
                  }}
                ></TextField>
                <Box sx={{ width: "10%", marginLeft: "9%" }}>
                  {data.add && (
                    <IconButton
                      onClick={() => {
                        const newState = [...paymentMethods];
                        newState.splice(index, 1);
                        setPaymentMethods(newState);
                      }}
                    >
                      <CancelIcon color="secondary" />
                    </IconButton>
                  )}
                  {!data.touched && !data.add && (
                    <IconButton
                      onClick={() => {
                        const newState = [...paymentMethods];
                        newState.splice(index, 1);
                        setPaymentMethods(newState);
                      }}
                    >
                      <ImgIcon>{deleteIcon}</ImgIcon>
                    </IconButton>
                  )}
                  {data.touched && (
                    <IconButton
                      onClick={() => {
                        const newState = [...paymentMethods];

                        newState[index].add = false;
                        newState[index].touched = false;
                        setPaymentMethods(newState);
                      }}
                    >
                      {data.add ? <AddIcon /> : <DoneIcon color="success" />}
                    </IconButton>
                  )}
                  {!data.add && data.touched && (
                    <IconButton
                      onClick={() => {
                        const newState = [...paymentMethods];
                        newState[index].touched = false;
                        setPaymentMethods(newState);
                      }}
                    >
                      <RestoreDefaultsIcon />
                    </IconButton>
                  )}
                </Box>
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
                  const newState = [...discountSchemes];
                  newState.unshift({
                    add: true,
                  });
                  setDiscountSchemes(newState);
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
                Discount Scheme's Name
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
          {discountSchemes?.map((discount, index) => (
            <AccordionDetails>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-around",
                }}
              >
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
                    const newState = [...discountSchemes];
                    newState[index].name = e.target.value;
                    newState[index].touched = true;
                    setDiscountSchemes(newState);
                  }}
                ></TextField>
                <TextField
                  sx={{
                    marginLeft: "7%",
                    width: "7%",
                    height: "44px",
                    "& .MuiFilledInput-input": { py: 0 },
                  }}
                  variant="filled"
                  value={discount?.value || 0}
                  placeholder="%"
                  onChange={(e) => {
                    const newState = [...discountSchemes];
                    newState[index].value = e.target.value;
                    newState[index].touched = true;
                    setDiscountSchemes(newState);
                  }}
                ></TextField>
                <Box sx={{ width: "9%" }}>
                  {discount.add && (
                    <IconButton
                      onClick={() => {
                        const newState = [...discountSchemes];
                        newState.splice(index, 1);
                        setDiscountSchemes(newState);
                      }}
                    >
                      <CancelIcon color="secondary" />
                    </IconButton>
                  )}
                  {!discount.touched && !discount.add && (
                    <IconButton
                      onClick={() => {
                        const newState = [...discountSchemes];
                        newState.splice(index, 1);
                        setDiscountSchemes(newState);
                        deleteDiscountData(discount._id);
                      }}
                    >
                      <ImgIcon>{deleteIcon}</ImgIcon>
                    </IconButton>
                  )}
                  {discount.touched && (
                    <IconButton
                      onClick={() => {
                        const newState = [...discountSchemes];
                        if (!discount._id) {
                          newState[index].touched = false;
                          newState[index].add = false;
                          setDiscountSchemes(newState);
                          addNewDiscount(discount.name, discount.value);
                        } else {
                          newState[index].add = false;
                          newState[index].touched = false;
                          setDiscountSchemes(newState);
                          updateDiscountData(
                            discount._id,
                            discount.name,
                            discount.value,
                          );
                        }
                      }}
                    >
                      {discount.add ? (
                        <AddIcon />
                      ) : (
                        <DoneIcon color="success" />
                      )}
                    </IconButton>
                  )}
                  {!discount.add && discount.touched && (
                    <IconButton
                      onClick={() => {
                        const newState = [...discountSchemes];
                        newState[index].touched = false;
                        setDiscountSchemes(newState);
                      }}
                    >
                      <RestoreDefaultsIcon />
                    </IconButton>
                  )}
                </Box>
              </Box>
            </AccordionDetails>
          ))}
        </Accordion>
      </AccordionContainer>
      <GradientButton
        sx={{ maxWidth: "fit-content" }}
        size="large"
        onClick={() => {
          if (
            !(
              discountSchemes?.some(
                (discount) => discount.add || discount.touched,
              ) || paymentMethods.some((pay) => pay.add || pay.touched)
            )
          )
            updateData();
          else {
            setIsDiscountSaved(true);
          }
        }}
      >
        Save
      </GradientButton>
      <GradientButton
        onClick={handleDiscard}
        size="large"
        invert
        sx={{
          marginLeft: "20px",
          "&:hover": {
            backgroundImage: "linear-gradient(106deg, #ff1a6d, #ff6e2d 100%)",
            color: "white",
          },
        }}
      >
        Discard
      </GradientButton>

      <WarningDialog
        showReject
        open={showWarning}
        onAccept={handleClose}
        onReject={() => setShowWarning(false)}
        title="Warning"
        description="Are you sure you want to discard without saving?"
      />
      <Dialog
        open={isDiscountSaved}
        sx={{
          "& .MuiDialog-paper": {
            minWidth: "380px",
            padding: "40px 30px",
            margin: "27px 300px 31px 200px",
            alignItems: "center",
            borderRadius: "20px",
          },
        }}
      >
        <ImgIcon>{errorIcon}</ImgIcon>
        <DialogTitle>Error</DialogTitle>
        <DialogContent>"Please save the changes."</DialogContent>
        <DialogActions>
          <Button
            sx={{
              color: "#ff2c60",
              border: "solid 1px #f2f1f6",
              textTransform: "none",
              fontSize: "20px",
              fontWeight: "600px",
              borderRadius: "12px",
              width: "100px",
            }}
            onClick={handleOnClickSubmitDiscount}
            autoFocus
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
      <WarningDialog
        open={showError}
        onAccept={() => {
          setError("");
          setShowError(false);
        }}
        title="Error"
        acceptButtonTitle="OK"
        description={customTransformError(error)}
      />
    </>
  );
};

export default Page;
