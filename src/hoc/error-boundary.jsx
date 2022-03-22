import { Component as ReactComponent } from "react";
import { withRouter } from "react-router-dom";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { ImgIcon } from "../components";
import ErrorIcon from "../../assets/icons/icon-error.png";

class ErrorBoundary extends ReactComponent {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    this.setState({ hasError: true });
    // console.log(error, errorInfo);
  }

  errorHandler = () => {
    this.props.history.replace("/");
    this.setState({ hasError: false });
  };

  render() {
    // You can render any custom fallback UI
    return this.state.hasError ? (
      <Dialog
        open
        onClose={this.removeErrorHandler}
        sx={{
          zIndex: (theme) => theme.zIndex.modal + 2,
          "& .MuiDialog-paper": {
            minWidth: "380px",
            padding: "40px 30px",
            margin: "27px 300px 31px 200px",
            alignItems: "center",
            borderRadius: "20px",
          },
        }}
      >
        <ImgIcon>{ErrorIcon}</ImgIcon>

        <DialogTitle>Error</DialogTitle>
        <DialogContent>
          <DialogContentText>Something went wrong!</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={this.errorHandler}
            sx={{
              color: "#ff2c60",
              border: "solid 1px #f2f1f6",
              textTransform: "none",
              fontSize: "20px",
              fontWeight: "600px",
              borderRadius: "12px",
              width: "170px",
            }}
          >
            Go to home Page
          </Button>
        </DialogActions>
      </Dialog>
    ) : (
      this.props.children
    );
  }
}

export default withRouter(ErrorBoundary);
