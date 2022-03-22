import React, { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";
import { Box, CircularProgress, Typography } from "@mui/material";
import {
  Card,
  CardTitle,
  IconButton,
  ImgIcon,
  Outputs,
  FormCheckbox as Checkbox,
} from "../../components";
import { backIcon } from "../../assets/icons";
import { useGetRole } from "../../services/queries";
import { toPascal, transformError } from "../../utils";
import Privileges from "./role-privileges/Privileges";
import { privilegeTypes } from "../../helper/constants";

const RoleDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data = { role: {} }, isLoading, isError, error } = useGetRole(id);
  // console.log("roleData", data);
  // console.log("roleid", id);
  const {
    role: { name, code, description, _id },
  } = data;
  const items = {
    "Role Name": toPascal(name),
    "Role Code": code,
    Description: toPascal(description),
  };
  // const functionalPrivileges = data.role.functionalPrivileges;
  // console.log("functionalPrivileges", functionalPrivileges);
  const functionalPrivileges = Object.keys(privilegeTypes).map((type) => ({
    type,
  }));
  // const {} = useForm({
  //   resolver: yupResolver(),
  //   defaultValues: {
  //     functionalPrivileges: Object.entries(privilegeTypes).map((type) => ({
  //       type,
  //       permission:
  //         data.role.functionalPrivileges[
  //           data.role.functionalPrivileges.findIndex(
  //             ({ type: privilegeType }) => privilegeType === type,
  //           )
  //         ].permission,
  //     })),
  //   },
  // });
  // const {
  //   role: {
  //     functionalPrivileges: {},
  // }} = data;

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
          Role Definition
        </Typography>
      </Box>
      <Box sx={{ mb: "20px" }}>
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
              <Outputs items={data.role?.name ? items : []} columnCount={3} />
            </>
          )}
        </Card>
      </Box>
      <Privileges />
    </>
  );
};

export default RoleDetail;
