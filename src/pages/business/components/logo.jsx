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

export default function Logo(props) {
  const { id } = useParams();

  const [logo, setLogo] = useState();
  const [prevLogo, setPrevLogo] = useState();
  const [newLogo, setNewLogo] = useState([]);
  useEffect(() => {
    setLogo(props.logoData);
    setPrevLogo(props.logoData);
    props.getUpdatedLogo(prevLogo);
  }, []);
  const onDrop = useCallback(
    (acceptedFiles) => {
      const newState = [...logo];
      const temp = [...newLogo];
      for (let i = 0; i < acceptedFiles.length; i++) {
        newState.push({ link: URL.createObjectURL(acceptedFiles[i]) });
        temp.push(acceptedFiles[i]);
      }
      setLogo(newState);
      setNewLogo(temp);
      props.setNewLogoData(temp);
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
              src={data.link !== "" && data.link}
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
                newState.splice(index, 1);
                setLogo(newState);
                const temp1 = [...newLogo];
                const temp2 = [...prevLogo];
                if (index > props.logoData.length) {
                  temp1.splice(index - props.logoData.length, 1);
                  setNewLogo(temp1);
                  props.setNewLogoData(temp1);
                } else if (index <= props.logoData.length) {
                  temp2.splice(index, 1);
                  setPrevLogo(temp2);
                  props.getUpdatedLogo(temp2);
                }
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
