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
import { GradientButton, ImgIcon } from "../../../components";
import deleteIcon from "../../../assets/icons/icon-delete.png";
import {
  useGetBusiness,
  useGetBusinessFinance,
} from "../../../services/queries";

export default function Logo(props) {
  const { id } = useParams();

  const [logo, setLogo] = useState(props.logoData);
  const [newLogo, setNewLogo] = useState([]);
  const onDrop = useCallback(
    (acceptedFiles) => {
      for (let i = 0; i < acceptedFiles.length; i++) {
        const newState = logo;
        newState.push({ link: URL.createObjectURL(acceptedFiles[i]) });
        setLogo(newState);
        setNewLogo(acceptedFiles[i]);
      }
      props.setNewLogoData(newLogo);
    },
    [logo],
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  return (
    <>
      <Box>
        <Typography style={{ fontSize: "17px" }}>Logo</Typography>

        <div
          style={{
            backgroundColor: "gray",
            height: "200px",
            margin: "10px 22px",
            padding: "21px 334px 50px 286px0",
            borderRadius: "8px",
            backgroundColor: "#f4f4f4",
            position: "relative",
          }}
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          <div
            style={{
              justifyContent: "center",
              position: "absolute",
              top: "30%",
              left: "40%",
            }}
          >
            Drag 'n' drop image here
            <GradientButton sx={{ display: "block", margin: "10px 0 0 10px" }}>
              Browse Image
            </GradientButton>
          </div>
        </div>
      </Box>
      <Box>
        {logo?.map((data, index) => (
          <Box
            sx={{
              display: "inline-block",
              position: "relative",
              marginRight: "40px",
            }}
          >
            <img
              src={data.link}
              id={index}
              alt="preview"
              width="80"
              height="80"
              style={{ borderRadius: "10px" }}
            ></img>
            <IconButton
              style={{
                display: "inline-block",
                position: "absolute",
                top: "20%",
                left: "85%",
                backgroundColor: "white",
              }}
              onClick={() => {
                const newState = [...logo];
                newState.splice(index, index + 1);
                setLogo(newState);
              }}
            >
              <ImgIcon>{deleteIcon}</ImgIcon>
            </IconButton>
          </Box>
        ))}
      </Box>
    </>
  );
}
