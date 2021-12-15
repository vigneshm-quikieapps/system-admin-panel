import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";

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
      sx={{ "& .MuiDialog-paper": { minWidth: "400px" } }}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText component="pre">{description}</DialogContentText>
      </DialogContent>
      <DialogActions>
        {showReject && (
          <Button onClick={onReject} autoFocus>
            {rejectButtonTitle}
          </Button>
        )}
        <Button onClick={onAccept}>{acceptButtonTitle}</Button>
      </DialogActions>
    </Dialog>
  );
}
