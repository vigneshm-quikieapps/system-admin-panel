import { styled } from "@mui/material/styles";
import MuiAccordion from "@mui/material/Accordion";

const Accordion = styled(MuiAccordion)(({ theme }) => ({
  margin: "10px 0 !important",
  "&.MuiAccordion-root": {
    border: `1px solid ${theme.palette.ternary.main}`,
    borderRadius: `${theme.shape.borderRadiuses.secondary}`,
    boxShadow: "none",
    "&::before": {
      display: "none !important",
    },
  },
  "& .MuiAccordionSummary-root": {
    height: "68px",
    "& .MuiTypography-root": {
      fontWeight: "bold",
      fontSize: "20px",
    },
  },
  "& .MuiAccordionSummary-expandIconWrapper": {
    border: `1px solid ${theme.palette.ternary.main}`,
    borderRadius: `${theme.shape.borderRadiuses.primary}`,
    color: `${theme.palette.text.primary}`,
    padding: "11px 13px",
  },
  "& .MuiAccordionDetails-root": {
    borderTop: `1px solid ${theme.palette.ternary.main}`,
  },
}));

export default Accordion;
