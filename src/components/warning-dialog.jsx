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
}) {
  return (
    <Dialog open={open} onClose={onReject}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{description}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onReject} autoFocus>
          {rejectButtonTitle}
        </Button>
        <Button onClick={onAccept}>{acceptButtonTitle}</Button>
      </DialogActions>
    </Dialog>
  );
}
