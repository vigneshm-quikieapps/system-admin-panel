import { useState, useEffect, useMemo } from "react";
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
  DialogContentText,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import errorIcon from "../../assets/icons/icon-error.png";
import { usePostRole, usePutRole } from "../../services/mutations";
import { useGetRole } from "../../services/queries";
import { transformError } from "../../utils";
import { privilegeTypes } from "../../helper/constants";
import {
  ElevationScroll,
  Input,
  GradientButton,
  Grid,
  WarningDialog,
  ImgIcon,
  Button,
} from "../../components";
import Privileges from "./components/privileges";

const FormModal = styled(Dialog)(({ theme }) => ({
  "& .MuiPaper-root": { borderRadius: theme.shape.borderRadiuses.ternary },
  "& label": { lineHeight: "initial !important" },
}));

const validationSchema = Yup.object()
  .shape({
    name: Yup.string().required("Role Name is mandatory").label("Role Name"),
    code: Yup.string()
      .required("Role Code is mandatory and must be at most 5 characters")
      .max(6, "Role Code must be at most 5 characters"),
    description: Yup.string(),
    functionalPrivileges: Yup.array()
      .min(1)
      .required()
      .of(
        Yup.object()
          .shape({
            type: Yup.string().required(),
            permission: Yup.object()
              .shape({
                create: Yup.boolean().required(),
                read: Yup.boolean().required(),
                update: Yup.boolean().required(),
                delete: Yup.boolean().required(),
              })
              .required(),
          })
          .required(),
      ),
  })
  .required();

const defaultPermission = {
  create: false,
  read: false,
  update: false,
  delete: false,
};

const AddRolePage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [showWarning, setShowWarning] = useState(false);
  const [showError, setShowError] = useState(false);
  const [error, setError] = useState("");
  const [contentRef, setContentRef] = useState();
  const [displayError, setDisplayError] = useState({});
  const { data, isLoading: getIsLoading } = useGetRole(id, {
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    onError: (error) => {
      setShowError(true);
      setError(error);
    },
  });
  const { isLoading, mutate: postRole } = usePostRole({
    onError: (error) => {
      setShowError(true);
      setError(error);
    },
  });
  const { isLoading: isPutLoading, mutate: putRole } = usePutRole({
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
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    reValidateMode: "onChange",
    defaultValues: {
      functionalPrivileges: Object.keys(privilegeTypes).map((type) => ({
        type,
        permission: defaultPermission,
      })),
    },
  });

  const onSubmit = ({ code, ...data }) => {
    id
      ? putRole({ _id: id, ...data }, { onSuccess: () => navigate("/roles") })
      : postRole({ code, ...data }, { onSuccess: () => navigate("/roles") });
  };

  const handleClose = () => navigate("/roles");
  const handleDiscard = () => {
    setShowWarning(true);
  };

  const privileges = useMemo(() => {
    if (!data?.role) return [];
    const functionalPrivileges = data.role.functionalPrivileges;
    return Object.entries(privilegeTypes).map(([type], index) => {
      const privilegeIndex = functionalPrivileges.findIndex(
        ({ type: privilegeType }) => privilegeType === type,
      );
      if (privilegeIndex === -1) return { type, permission: defaultPermission };
      return {
        type,
        permission: functionalPrivileges[privilegeIndex].permission,
      };
    });
  }, [data]);

  useEffect(() => {
    if (data?.role) {
      const { name, code, description } = data.role;
      resetFormData({
        name,
        code,
        description,
        functionalPrivileges: privileges,
      });
    }
  }, [resetFormData, data, privileges]);
  useEffect(() => {
    setDisplayError(errors);
  }, [errors]);
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
            Role Definition
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
            sx={{ fontSize: "20px", fontWeight: "bold", mb: 2 }}
            component="h3"
          >
            Role Details
          </Typography>
          <Grid
            columnCount={2}
            component="form"
            rowGap="20px"
            sx={{
              minWidth: "940px",
              "& .MuiOutlinedInput-root": {
                height: "58px !important",
              },
            }}
          >
            {data?.role && data?.role?.name.length > "0" ? (
              <Input
                name="name"
                control={control}
                error={!!errors?.name?.message}
                variant="outlined"
                label="Role Name*"
                // InputLabelProps={{ style: { background: "#fff" } }}
              />
            ) : (
              <Input
                name="name"
                control={control}
                error={!!errors?.name?.message}
                variant="outlined"
                label="Role Name*"
              />
            )}
            {data?.role && data?.role?.code.length > "0" ? (
              <Input
                name="code"
                disabled
                control={control}
                error={!!errors?.code?.message}
                variant="outlined"
                label="Role Code*"
                inputProps={{ readOnly: !!id }}
                // InputLabelProps={{ style: { background: "#fff" } }}
              />
            ) : (
              <Input
                name="code"
                control={control}
                error={!!errors?.code?.message}
                variant="outlined"
                label="Role Code*"
                inputProps={{ readOnly: !!id }}
              />
            )}
            {data?.role && data?.role?.description.length > "0" ? (
              <Input
                name="description"
                control={control}
                variant="outlined"
                label="Description"
                multiline
                rows={4}
                // InputLabelProps={{ style: { background: "#fff" } }}
                sx={{
                  gridColumnEnd: "span 2",
                  "& .MuiOutlinedInput-root": { height: "initial !important" },
                }}
              />
            ) : (
              <Input
                name="description"
                control={control}
                variant="outlined"
                label="Description"
                multiline
                rows={4}
                sx={{
                  gridColumnEnd: "span 2",
                  "& .MuiOutlinedInput-root": { height: "initial !important" },
                }}
              />
            )}

            <Privileges control={control} />
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
        {/* {!!Object.keys(errors).length && (
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
        )} */}
        <Dialog
          open={!!Object.keys(displayError).length}
          sx={{
            "& .MuiDialog-paper": {
              minWidth: "380px",
              padding: "40px 30px",
              margin: "27px 300px 31px 200px",
              alignItems: "center",
              borderRadius: " 20px",
            },
          }}
        >
          <ImgIcon>{errorIcon}</ImgIcon>
          <DialogTitle>Error</DialogTitle>
          {!!Object.keys(errors).length && (
            <DialogContent sx={{ textAlign: "center" }}>
              {Object.values(errors)
                // .reverse()
                .map(({ message }, index) => (
                  <DialogContentText key={index}>{message}</DialogContentText>
                ))}
            </DialogContent>
          )}
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
              onClick={() => {
                setDisplayError({});
              }}
            >
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </FormModal>
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

export default AddRolePage;
