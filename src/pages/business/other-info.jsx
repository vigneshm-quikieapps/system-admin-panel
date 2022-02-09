import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
  Card,
  CardRow,
  DashboardCard,
  TextField,
  CheckBox,
  ImgIcon,
} from "../../components";
import deleteIcon from "../../assets/icons/icon-delete.png";
import { useGetBusiness, useGetBusinessFinance } from "../../services/queries";
import { updateFinance } from "../../services/businessServices";
import { da } from "date-fns/locale";
import { Instagram } from "@mui/icons-material";

const Page = ({ setPageTitle }) => {
  useEffect(() => setPageTitle("Other Info"));
  const { id } = useParams();
  const { data = { business: {} } } = useGetBusiness(id);
  const {
    business: { name },
  } = data;
  const [links,setLinks]=useState({
    Facebook:"",
    Instagram:"",
    Pinterest:"",
    LinkedIn:""
  })
  return (
    <>
      <AccordionContainer>
        <Accordion defaultExpanded={false} enabled={false}>
          <AccordionSummary style={{ height: "123px", cursor: "default" }}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography style={{ fontSize: "28px" }}>{name}</Typography>
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
                  marginRight:"10%"
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
            {Object.keys(links).map((key)=>(<AccordionDetails>
              <Box>
              <Box style={{
                      marginRight: "5%",
                      fontSize: "18px",
                      display: "inline-block",
                    }}>
              <Typography
                    
                  >
                    {key}
                  </Typography>
              </Box>
                <TextField
                  sx={{
                    height: "44px",
                    "& .MuiFilledInput-input": { py: 0 },
                    width: "60%",
                  }}
                  value={links[key]}
                  variant="filled"
                  placeholder="Enter Link"
                  onChange={(e) => {
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
            </AccordionDetails>))}
        </Accordion>
      </AccordionContainer>
      <AccordionContainer>
        <Accordion defaultExpanded={false}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography style={{ fontSize: "20px" }}>
                Auto-Numbering Sequence
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <TextField
              sx={{ minWidth: "600px" }}
              variant="filled"
              placeholder="Club Membership Sequence"
              onChange={(e) => {
              }}
            ></TextField>
          </AccordionDetails>
        </Accordion>
      </AccordionContainer>
    </>
  );
};

export default Page;
