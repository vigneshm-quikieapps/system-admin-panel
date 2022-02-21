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
} from "../../components";
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
  const [logo, setLogo] = useState([]);
  const [pic, setPic] = useState([]);
  const [links, setLinks] = useState([]);
  const [newLogo, setNewLogo] = useState([]);
  const [newPic, setNewPic] = useState([]);
  const [isSocialDataUpdated, setIsSocialDataUpdated] = useState(false);
  const [errors, setErrors] = useState({});
  const [showWarning, setShowWarning] = useState(false);
  const temps = useGetBusiness(id);
  if (temps?.data?.business && !isSocialDataUpdated) {
    var temp = {
      name: temps?.data?.business?.name,
      socialMediaUrl: temps?.data?.business?.socialMediaUrl,
      imageUrl: temps?.data?.business?.imageUrl,
      logoUrl: temps?.data?.business?.logoUrl,
      isLoading: temps?.isLoading,
    };
    setLogo(temp.logoUrl);
    setPic(temp.imageUrl);
    for (let i = temp.socialMediaUrl.length; i < 4; i++) {
      temp.socialMediaUrl.push({ link: "" });
    }
    setLinks(temp.socialMediaUrl);
    setIsSocialDataUpdated(true);
  }

  const setNewLogoData = (init) => {
    setNewLogo(init);
  };
  const setNewPictureData = (init) => {
    setNewPic(init);
  };
  const setlinksData = (link) => {
    setLinks(link);
  };

  const updateOtherData = async () => {
    await updateOtherInfo(id, {
      socialMediaUrl: links.map((data) => data.link).join(","),
      oldImagesLinks: pic.map((data) => data.link).join(","),
      oldLogoLinks: logo.map((data) => data.link).join(","),
      newImages: newPic,
      newLogos: newLogo,
    });
  };
  const handleClose = () => navigate("/evaluation");
  const handleDiscard = () => {
    setShowWarning(true);
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
                  value={links[0]?.link || ""}
                  variant="filled"
                  placeholder="Enter Link"
                  onChange={(e) => {
                    const temp = [...links];
                    temp[0].link = e.target.value;
                    setlinksData(temp);
                  }}
                ></TextField>
              </Box>
              <Box sx={{ width: "10%" }}>
                <IconButton
                  onClick={() => {
                    const temp = [...links];
                    temp[0].link = "";
                    setlinksData(temp);
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
                  value={links[1]?.link || ""}
                  variant="filled"
                  placeholder="Enter Link"
                  onChange={(e) => {
                    const temp = [...links];
                    temp[1].link = e.target.value;
                    setlinksData(temp);
                  }}
                ></TextField>
              </Box>
              <Box sx={{ width: "10%" }}>
                <IconButton
                  onClick={() => {
                    const temp = [...links];
                    temp[1].link = "";
                    setlinksData(temp);
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
                  value={links[2]?.link || ""}
                  variant="filled"
                  placeholder="Enter Link"
                  onChange={(e) => {
                    const temp = [...links];
                    temp[2].link = e.target.value;
                    setlinksData(temp);
                  }}
                ></TextField>
              </Box>
              <Box sx={{ width: "10%" }}>
                <IconButton
                  // sx={{ marginLeft: "20%" }}
                  onClick={() => {
                    const temp = [...links];
                    temp[2].link = "";
                    setlinksData(temp);
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
                  value={links[3]?.link || ""}
                  variant="filled"
                  placeholder="Enter Link"
                  onChange={(e) => {
                    const temp = [...links];
                    temp[3].link = e.target.value;
                    setlinksData(temp);
                  }}
                ></TextField>
              </Box>
              <Box sx={{ width: "10%" }}>
                <IconButton
                  onClick={() => {
                    const temp = [...links];
                    temp[3].link = "";
                    setlinksData(temp);
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
            <Logo setNewLogoData={setNewLogoData} logoData={logo} />
          </AccordionDetails>
          <AccordionDetails>
            <Picture setNewPicData={setNewPictureData} picData={pic} />
          </AccordionDetails>
        </Accordion>
      </AccordionContainer>
      <GradientButton
        sx={{ maxWidth: "fit-content" }}
        onClick={updateOtherData}
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
