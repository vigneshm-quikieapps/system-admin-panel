import { useParams, useNavigate } from "react-router-dom";
import {
  AccordionDetails,
  AccordionSummary,
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";
import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";
import { backIcon } from "../../assets/icons";
import {
  Accordion,
  Card,
  CardTitle,
  IconButton,
  ImgIcon,
  Outputs,
} from "../../components";
import { useGetUser } from "../../services/queries";
import { toPascal, transformError } from "../../utils";
import { countries } from "../../helper/constants";
import { arrowDownIcon } from "../../assets/icons";
import Roles from "./components/role-detail";
import DataPrivilege from "./components/role-detail/data-privileges";

const UserDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data = { user: {} }, isLoading, isError, error } = useGetUser(id);
  // console.log("userListdata", data);
  const {
    user: {
      name,
      email,
      password,
      mobileNo,
      _id,
      status,
      addressLine1,
      addressLine2,
      city,
      country,
      postcode,
      roles,
      dataPrivileges,
    },
  } = data;
  // console.log("datalist", data);
  const countryName = countries.find(({ code }) => code === country)?.label;

  const items = {
    Email: toPascal(email),
    Password: password,
    "Contact Number": mobileNo,
    "Full Name": toPascal(name),
    Status: status,
    "": " ",
    Address: toPascal(
      postcode +
        "  / " +
        addressLine1 +
        " " +
        addressLine2 +
        " / " +
        city +
        " / " +
        country,
    ),
  };
  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
        <IconButton onClick={() => navigate("../")}>
          <ImgIcon>{backIcon}</ImgIcon>
        </IconButton>
        <Typography
          variant="h3"
          sx={{ fontSize: "20px", fontWeight: "bold", ml: 1 }}
        >
          User Account
        </Typography>
      </Box>
      <Box>
        <Card>
          {isError ? (
            <Typography color="error" component="pre">
              {"Something went wrong: " + transformError(error)}
            </Typography>
          ) : isLoading ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "200px",
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <>
              <CardTitle>{toPascal(name)}</CardTitle>{" "}
              <Typography
                sx={{
                  color: (theme) => theme.palette.text.secondary,
                }}
              >
                User ID
              </Typography>
              <Typography
                sx={{
                  color: (theme) => theme.palette.text.secondary,
                  fontWeight: "bold",
                  mb: "10px",
                }}
              >
                {toPascal(_id)}
              </Typography>
              <Outputs items={data.user?.name ? items : []} columnCount={3} />
            </>
          )}
        </Card>
      </Box>
      {roles &&
        roles.map((roleData, index) => {
          // console.log("roleDtaa", roleData);
          return (
            <Accordion defaultExpanded>
              <AccordionSummary expandIcon={<ImgIcon>{arrowDownIcon}</ImgIcon>}>
                <Box
                  sx={{ flex: 1, mr: 1, display: "flex", alignItems: "center" }}
                >
                  <Typography>Roles</Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails sx={{ padding: 0, paddingBottom: "10px" }}>
                <Box
                  sx={{
                    padding: " 10px 17px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderTop: `1px solid #e9e7f1`,
                    borderBottom: `1px solid #e9e7f1`,
                  }}
                >
                  <Typography variant="subtitle2" component="div">
                    Role Name
                  </Typography>
                </Box>
                <Box
                  sx={{
                    border: "1px solid #e9e7f1",
                    height: "44px",
                    margin: "6px 40px 9px 22px",
                    padding: " 12px 442px 12px 12px",
                    borderRadius: "8px",
                  }}
                >
                  <Typography>{roleData.name}</Typography>
                </Box>
              </AccordionDetails>
            </Accordion>
          );
        })}
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ImgIcon>{arrowDownIcon}</ImgIcon>}>
          <Box sx={{ flex: 1, mr: 1, display: "flex", alignItems: "center" }}>
            <Typography> Data Privileges</Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails sx={{ padding: 0, paddingBottom: "10px" }}>
          <Box
            sx={{
              padding: " 10px 17px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderTop: `1px solid #e9e7f1`,
              borderBottom: `1px solid #e9e7f1`,
            }}
          >
            <Typography variant="subtitle2" component="div">
              Business Name
            </Typography>
          </Box>
          {dataPrivileges?.list &&
            dataPrivileges?.list?.map((listData) => {
              // console.log("listData", listData);
              return (
                <Box
                  sx={{
                    border: "1px solid #e9e7f1",
                    height: "44px",
                    margin: "6px 40px 9px 22px",
                    padding: " 12px 442px 12px 12px",
                    borderRadius: "8px",
                  }}
                >
                  <Typography>{listData.name}</Typography>
                </Box>
              );
            })}
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default UserDetailPage;
