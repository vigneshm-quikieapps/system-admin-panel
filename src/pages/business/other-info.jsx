import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import {
  AccordionSummary,
  AccordionDetails,
  Box,
  MenuItem,
  Typography,
  IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  GradientButton,
  Grid,
  AddButton,
  Accordion,
  AccordionContainer,
  TextField,
  CheckBox,
  ImgIcon,
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
  const { id } = useParams();
  const [logo, setLogo] = useState([]);
  const [pic, setPic] = useState([]);
  const [links, setLinks] = useState([]);
  const [newLogo, setNewLogo] = useState([]);
  const [newPic, setNewPic] = useState([]);
  const [isSocialDataUpdated, setIsSocialDataUpdated] = useState(false);

  const temps = useGetBusiness(id);
  if (temps?.data?.business && !isSocialDataUpdated) {
    var temp = {
      name: temps?.data?.business?.name,
      socialMediaUrl: temps?.data?.business?.socialMediaUrl,
      imageUrl: temps?.data?.business?.socialMediaUrl,
      logoUrl: temps?.data?.business?.logoUrl,
      isLoading: temps?.isLoading,
    };
    setLogo(temp.logoUrl);
    setPic(temp.imageUrl);
    setLinks(temp.socialMediaUrl);
    setIsSocialDataUpdated(true);
  }
  // const {
  //   business: { name, socialMediaUrl, imageUrl, logoUrl, isLoading },
  // } = data;
  // const { data = { business: {} } } = useGetBusiness(id);

  const setLogoData = (logo) => {
    setLogo(logo);
  };
  const setPictureData = (pic) => {
    setPic(pic);
  };
  const setlinksData = (link) => {
    setLinks(link);
  };

  const updateOtherData = async () => {
    await updateOtherInfo(id, {
      socialMediaUrl: links.join(","),
      oldImagesLinks: pic.map((data) => data.link).join(","),
      oldLogoLinks: logo.map((data) => data.link).join(","),
      newImages: newPic,
      newLogos: newLogo,
    });
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
        <Accordion defaultExpanded={false} enabled={false}>
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
            <Box>
              <Box
                style={{
                  marginRight: "5%",
                  fontSize: "18px",
                  display: "inline-block",
                }}
              >
                <Typography>Facebook</Typography>
              </Box>
              <TextField
                sx={{
                  height: "44px",
                  "& .MuiFilledInput-input": { py: 0 },
                  width: "60%",
                }}
                value={links[0]?.link || ""}
                variant="filled"
                placeholder="Enter Link"
                onChange={(e) => {
                  const temp = links;
                  temp[0].link = e.target.value;
                  setlinksData(temp);
                  console.log(links);
                }}
              ></TextField>
              <IconButton
                style={{
                  marginRight: "7%",
                  float: "right",
                }}
                onClick={() => {}}
              >
                <ImgIcon>{deleteIcon}</ImgIcon>
              </IconButton>
            </Box>
          </AccordionDetails>
          <AccordionDetails>
            <Box>
              <Box
                style={{
                  marginRight: "5%",
                  fontSize: "18px",
                  display: "inline-block",
                }}
              >
                <Typography>Instagram</Typography>
              </Box>
              <TextField
                sx={{
                  height: "44px",
                  "& .MuiFilledInput-input": { py: 0 },
                  width: "60%",
                }}
                value={links[1]?.link || ""}
                variant="filled"
                placeholder="Enter Link"
                onChange={(e) => {}}
              ></TextField>
              <IconButton
                style={{
                  marginRight: "7%",
                  float: "right",
                }}
                onClick={() => {}}
              >
                <ImgIcon>{deleteIcon}</ImgIcon>
              </IconButton>
            </Box>
          </AccordionDetails>
          <AccordionDetails>
            <Box>
              <Box
                style={{
                  marginRight: "5%",
                  fontSize: "18px",
                  display: "inline-block",
                }}
              >
                <Typography>Pinterest</Typography>
              </Box>
              <TextField
                sx={{
                  height: "44px",
                  "& .MuiFilledInput-input": { py: 0 },
                  width: "60%",
                }}
                value={links[2]?.link || ""}
                variant="filled"
                placeholder="Enter Link"
                onChange={(e) => {}}
              ></TextField>
              <IconButton
                style={{
                  marginRight: "7%",
                  float: "right",
                }}
                onClick={() => {}}
              >
                <ImgIcon>{deleteIcon}</ImgIcon>
              </IconButton>
            </Box>
          </AccordionDetails>
          <AccordionDetails>
            <Box>
              <Box
                style={{
                  marginRight: "5%",
                  fontSize: "18px",
                  display: "inline-block",
                }}
              >
                <Typography>LinkedIn</Typography>
              </Box>
              <TextField
                sx={{
                  height: "44px",
                  "& .MuiFilledInput-input": { py: 0 },
                  width: "60%",
                }}
                value={links[3]?.link || ""}
                variant="filled"
                placeholder="Enter Link"
                onChange={(e) => {}}
              ></TextField>
              <IconButton
                style={{
                  marginRight: "7%",
                  float: "right",
                }}
                onClick={() => {}}
              >
                <ImgIcon>{deleteIcon}</ImgIcon>
              </IconButton>
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
            <Logo setNewLogoData={() => setNewLogo(logo)} logoData={logo} />
          </AccordionDetails>
          <AccordionDetails>
            <Picture setNewPicData={() => setNewPic(pic)} picData={pic} />
          </AccordionDetails>
        </Accordion>
      </AccordionContainer>
      <GradientButton
        sx={{ maxWidth: "fit-content" }}
        onClick={updateOtherData}
      >
        Save
      </GradientButton>
    </>
  );
};

export default Page;
