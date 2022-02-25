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

  const [pic, setPic] = useState();
  const [prevPic, setPrevPic] = useState();
  const [newPic, setNewPic] = useState([]);
  useEffect(() => {
    setPic(props.picData);
    setPrevPic(props.picData);
    props.getUpdatedPic(prevPic);
  }, []);
  const onDrop = useCallback(
    (acceptedFiles) => {
      const newState = [...pic];
      const temp = [...newPic];
      for (let i = 0; i < acceptedFiles.length; i++) {
        newState.push({ link: URL.createObjectURL(acceptedFiles[i]) });
        temp.push(acceptedFiles[i]);
      }
      setPic(newState);
      setNewPic(temp);
      props.setNewPicData(temp);
    },
    [pic],
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

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
                const newState = [...pic];
                newState.splice(index, 1);
                setPic(newState);
                const temp1 = [...newPic];
                const temp2 = [...prevPic];
                if (index > props.picData.length) {
                  temp1.splice(index - pic.length, 1);
                  setNewPic(temp1);
                  props.setNewPicData(temp1);
                } else if (index <= props.picData.length) {
                  temp2.splice(index, 1);
                  setPrevPic(temp2);
                  props.getUpdatedPic(temp2);
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
