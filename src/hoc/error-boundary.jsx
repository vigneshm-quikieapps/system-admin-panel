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

class ErrorBoundary extends ReactComponent {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    this.setState({ hasError: true });
    console.log(error, errorInfo);
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
        sx={{ zIndex: (theme) => theme.zIndex.modal + 2 }}
      >
        <DialogTitle>Error Boundary</DialogTitle>
        <DialogContent>
          <DialogContentText>Something went wrong!</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.errorHandler}>Go to home Page</Button>
        </DialogActions>
      </Dialog>
    ) : (
      this.props.children
    );
  }
}

export default withRouter(ErrorBoundary);
