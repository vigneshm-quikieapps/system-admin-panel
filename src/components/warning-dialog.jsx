import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import ImgIcon from "./img-icon";
import errorIcon from "../assets/icons/icon-error.png";
import warningIcon from "../assets/icons/icon-warning.png";

export default function DialogBox({
  open,
  onAccept,
  onReject,
  title,
  description,
  acceptButtonTitle = "Yes",
  rejectButtonTitle = "No",
  showReject = false,
}) {
  return (
    <Dialog
      open={open}
      onClose={onReject}
      sx={{
        "& .MuiDialog-paper": {
          minWidth: "380px",
          padding: "40px 30px",
          margin: "27px 300px 31px 200px",
          alignItems: "center",
          borderRadius: "20px",
        },
      }}
    >
      {title === "Warning" ? (
        <ImgIcon>{errorIcon}</ImgIcon>
      ) : (
        <ImgIcon>{warningIcon}</ImgIcon>
      )}

      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText component="pre">{description}</DialogContentText>
      </DialogContent>
      <DialogActions>
        {showReject && (
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
            onClick={onReject}
            autoFocus
          >
            {rejectButtonTitle}
          </Button>
        )}
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
          onClick={onAccept}
        >
          {acceptButtonTitle}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
