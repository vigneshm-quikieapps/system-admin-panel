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

export default function Picture(props) {
  const { id } = useParams();

  const [pic, setPic] = useState(props.picData);
  const [newPic, setNewPic] = useState([]);
  const onDrop = useCallback(
    (acceptedFiles) => {
      for (let i = 0; i < acceptedFiles.length; i++) {
        const newState = pic;
        newState.push({ link: URL.createObjectURL(acceptedFiles[i]) });
        setPic(newState);
        setNewPic(acceptedFiles[i]);
      }
      props.setNewPicData(newPic);
    },
    [pic],
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  // console.log("pic", pic);
  return (
    <>
      <Box>
        <Typography style={{ fontSize: "17px" }}>Picture</Typography>

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
        {pic?.map((data, index) => (
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
                const newState = [...pic];
                newState.splice(index, index + 1);
                setPic(newState);
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
