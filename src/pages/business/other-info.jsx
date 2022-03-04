import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
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
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";
import {
  GradientButton,
  Grid,
  AddButton,
  Accordion,
  AccordionContainer,
  TextField,
  CheckBox,
  ImgIcon,
  WarningDialog,
  Button,
} from "../../components";
import informationIcon from "../../assets/icons/icon-information.png";
import deleteIcon from "../../assets/icons/icon-delete.png";
import { useGetBusiness } from "../../services/queries";
import { updateOtherInfo } from "../../services/businessServices";
import Logo from "../../pages/business/components/logo";
import Picture from "../../pages/business/components/picture";
const Page = ({ setPageTitle }) => {
  useEffect(() => {
    setPageTitle("Other Info");
  });

  const navigate = useNavigate();
  const { id } = useParams();
  const [message, setMessage] = useState();
  const [updateStatus, setUpdateStatus] = useState(false);
  const [logo, setLogo] = useState([]);
  const [pic, setPic] = useState([]);
  const [updatedLogo, setUpdatedLogo] = useState([]);
  const [updatedPic, setUpdatedPic] = useState([]);
  const [facebookUrl, setFacebookUrl] = useState("");
  const [instagramUrl, setInstagramUrl] = useState("");
  const [pinterestUrl, setPinterestUrl] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [newLogo, setNewLogo] = useState([]);
  const [newPic, setNewPic] = useState([]);
  const [isSocialDataUpdated, setIsSocialDataUpdated] = useState(false);
  const [errors, setErrors] = useState({});
  const [showWarning, setShowWarning] = useState(false);
  const temps = useGetBusiness(id);

  if (temps?.data?.business && !isSocialDataUpdated) {
    var temp = {
      name: temps?.data?.business?.name,
      facebook: temps?.data?.business?.facebookUrl,
      instagram: temps?.data?.business?.instagramUrl,
      pinterest: temps?.data?.business?.pinterestUrl,
      linkedin: temps?.data?.business?.linkedinUrl,
      imageUrl: temps?.data?.business?.imageUrl,
      logoUrl: temps?.data?.business?.logoUrl,
      isLoading: temps?.isLoading,
    };
    setFacebookUrl(temp.facebook);
    setInstagramUrl(temp.instagram);
    setPinterestUrl(temp.pinterest);
    setLinkedinUrl(temp.linkedin);
    setLogo(temp.logoUrl);
    setPic(temp.imageUrl);

    setIsSocialDataUpdated(true);
  }

  const setNewLogoData = (init) => {
    // const newState = [...newLogo];
    // newState.concat(init);
    setNewLogo(init);
  };
  const setNewPictureData = (init) => {
    setNewPic(init);
  };

  const getUpdatedLogo = (init) => {
    setUpdatedLogo(init);
  };
  const getUpdatedPic = (init) => {
    setUpdatedPic(init);
  };
  const updateOtherData = async () => {
    const temp1 = updatedPic
      ? updatedPic?.map((data) => data.link).join(",")
      : pic?.map((data) => data.link).join(",");
    // updatedPic?.map((data) => data.link).join(",") !== ""
    //   ? updatedPic?.map((data) => data.link).join(",")
    //   : pic?.map((data) => data.link).join(",");
    const temp2 = updatedLogo
      ? updatedLogo.map((data) => data.link).join(",")
      : logo?.map((data) => data.link).join(",");
    // updatedLogo.map((data) => data.link).join(",") !== ""
    //   ? updatedLogo.map((data) => data.link).join(",")
    //   : logo?.map((data) => data.link).join(",");
    await updateOtherInfo(
      id,
      //   {
      //   facebookUrl: facebookUrl,
      //   instagramUrl: instagramUrl,
      //   pinterestUrl: pinterestUrl,
      //   linkedinUrl: linkedinUrl,
      //   oldImagesLinks: updatedPic.map((data) => data.link).join(","),
      //   oldLogoLinks: updatedLogo.map((data) => data.link).join(","),
      //   newImages: newPic,
      //   newLogos: newLogo,
      // }
      facebookUrl,
      instagramUrl,
      pinterestUrl,
      linkedinUrl,
      temp1,
      temp2,
      newPic,
      newLogo,
    ).then((res) => {
      // console.log(res);
      setMessage(res.message);
      setUpdateStatus(true);
    });
  };
  const handleClose = () => navigate(`/business/details/${id}`);
  const handleDiscard = () => {
    setShowWarning(true);
  };
  const handleOnClickSubmit = () => {
    setUpdateStatus(false);
    navigate(`/business/details/${id}`);
  };
  // if (temps?.isLoading) {
  //   return (
  //     <AccordionContainer>
  //       <Accordion defaultExpanded={false} enabled={false}>
  //         <AccordionSummary style={{ height: "123px", cursor: "default" }}>
  //           <Box sx={{ display: "flex", flexDirection: "column" }}>
  //             <Typography style={{ fontSize: "28px" }}>
  //               {temps?.data?.business?.name}
  //             </Typography>
  //             <Typography sx={{ opacity: 0.5, fontSize: "14px !important" }}>
  //               BusinessID
  //             </Typography>
  //             <Typography sx={{ fontSize: "13px important" }}>{id}</Typography>
  //           </Box>
  //         </AccordionSummary>
  //       </Accordion>
  //     </AccordionContainer>
  //   );
  // }

  return (
    <>
      <AccordionContainer>
        <Accordion defaultExpanded={true} enabled={false}>
          <AccordionSummary style={{ height: "123px", cursor: "default" }}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography style={{ fontSize: "28px" }}>
                {temps?.data?.business?.name}
              </Typography>
              <Typography sx={{ opacity: 0.5, fontSize: "14px !important" }}>
                BusinessID
              </Typography>
              <Typography sx={{ fontSize: "13px important" }}>{id}</Typography>
            </Box>
          </AccordionSummary>
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
              <Typography style={{ flex: 1 }}>Social Media</Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ padding: " 5px 17px" }}>
              <Typography
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  display: "inline",
                  marginRight: "10%",
                }}
              >
                Label
              </Typography>
              <Typography
                style={{
                  marginRight: "5%",
                  fontSize: "18px",
                  fontWeight: "bold",
                  display: "inline",
                }}
              >
                Link
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
          <AccordionDetails>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <Box sx={{ width: "10%" }}>
                <Typography>Facebook</Typography>
              </Box>
              <Box sx={{ width: "75%" }}>
                <TextField
                  sx={{
                    height: "44px",
                    "& .MuiFilledInput-input": { py: 0 },
                    width: "65%",
                  }}
                  value={facebookUrl || ""}
                  variant="filled"
                  placeholder="Enter Link"
                  onChange={(e) => {
                    setFacebookUrl(e.target.value);
                  }}
                ></TextField>
              </Box>
              <Box sx={{ width: "10%" }}>
                <IconButton
                  onClick={() => {
                    setFacebookUrl("");
                  }}
                >
                  <ImgIcon>{deleteIcon}</ImgIcon>
                </IconButton>
              </Box>
            </Box>
          </AccordionDetails>
          <AccordionDetails>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <Box sx={{ width: "10%" }}>
                <Typography>Instagram</Typography>
              </Box>
              <Box sx={{ width: "75%" }}>
                <TextField
                  sx={{
                    height: "44px",
                    "& .MuiFilledInput-input": { py: 0 },
                    width: "65%",
                  }}
                  value={instagramUrl || ""}
                  variant="filled"
                  placeholder="Enter Link"
                  onChange={(e) => {
                    setInstagramUrl(e.target.value);
                  }}
                ></TextField>
              </Box>
              <Box sx={{ width: "10%" }}>
                <IconButton
                  onClick={() => {
                    setInstagramUrl("");
                  }}
                >
                  <ImgIcon>{deleteIcon}</ImgIcon>
                </IconButton>
              </Box>
            </Box>
          </AccordionDetails>
          <AccordionDetails>
            <Box sx={{ display: "flex", justifyContent: "space-around" }}>
              <Box sx={{ width: "10%" }}>
                <Typography>Pinterest</Typography>
              </Box>
              <Box sx={{ width: "75%" }}>
                <TextField
                  sx={{
                    height: "44px",
                    "& .MuiFilledInput-input": { py: 0 },
                    width: "65%",
                  }}
                  value={pinterestUrl || ""}
                  variant="filled"
                  placeholder="Enter Link"
                  onChange={(e) => {
                    setPinterestUrl(e.target.value);
                  }}
                ></TextField>
              </Box>
              <Box sx={{ width: "10%" }}>
                <IconButton
                  // sx={{ marginLeft: "20%" }}
                  onClick={() => {
                    setPinterestUrl("");
                  }}
                >
                  <ImgIcon>{deleteIcon}</ImgIcon>
                </IconButton>
              </Box>
            </Box>
          </AccordionDetails>
          <AccordionDetails>
            <Box sx={{ display: "flex", justifyContent: "space-around" }}>
              <Box sx={{ width: "10%" }}>
                <Typography>LinkedIn</Typography>
              </Box>
              <Box sx={{ width: "75%" }}>
                <TextField
                  sx={{
                    height: "44px",
                    "& .MuiFilledInput-input": { py: 0 },
                    width: "65%",
                  }}
                  value={linkedinUrl || ""}
                  variant="filled"
                  placeholder="Enter Link"
                  onChange={(e) => {
                    setLinkedinUrl(e.target.value);
                  }}
                ></TextField>
              </Box>
              <Box sx={{ width: "10%" }}>
                <IconButton
                  onClick={() => {
                    setLinkedinUrl("");
                  }}
                >
                  <ImgIcon>{deleteIcon}</ImgIcon>
                </IconButton>
              </Box>
            </Box>
          </AccordionDetails>
        </Accordion>
      </AccordionContainer>
      <AccordionContainer>
        <Accordion defaultExpanded={true}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography style={{ fontSize: "20px" }}>
                Logo and Pictures
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Logo
              setNewLogoData={setNewLogoData}
              getUpdatedLogo={getUpdatedLogo}
              logoData={logo}
            />
          </AccordionDetails>
          <AccordionDetails>
            <Picture
              setNewPicData={setNewPictureData}
              getUpdatedPic={getUpdatedPic}
              picData={pic}
            />
          </AccordionDetails>
        </Accordion>
      </AccordionContainer>
      <GradientButton
        sx={{ maxWidth: "fit-content" }}
        onClick={() => {
          updateOtherData();
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
      <Dialog
        open={updateStatus}
        sx={{
          "& .MuiDialog-paper": {
            minWidth: "380px",
            padding: "40px 30px",
            margin: "27px 300px 31px 200px",
            alignItems: "center",
          },
        }}
      >
        <ImgIcon>{informationIcon}</ImgIcon>
        <DialogTitle>Information</DialogTitle>
        <DialogContent>Update Successful</DialogContent>
        <DialogActions>
          <Button
            sx={{ color: "#ff2c60" }}
            onClick={handleOnClickSubmit}
            autoFocus
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Page;
