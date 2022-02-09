import { useParams, useNavigate } from "react-router-dom";
import {
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
import Roles from "./components/role-detail";
import DataPrivilege from "./components/role-detail/data-privileges";

const UserDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data = { user: {} }, isLoading, isError, error } = useGetUser(id);
  console.log("userListdata", data);
  const {
    user: {
      name,
      email,
      password,
      mobileNo,
      _id,
      status,
      line1,
      line2,
      city,
      country,
      postcode,
    },
  } = data;
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
        line1 +
        " " +
        line2 +
        " / " +
        city +
        " / " +
        countryName,
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
      <Roles />
      <DataPrivilege />
    </>
  );
};

export default UserDetailPage;
