import React from "react";

function withStatusManager(WrappedComponent) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        hasError: false,
        errorMsg: "",
        isLoading: false,
      };
      this.originalState = {
        ...this.state,
      };
    } // constructor
    resetStatusManagerState = () => {
      this.setState({
        ...this.originalState,
      });
    }; //resetStatusManagerState
    errorOccurred = msg => {
      this.setState({
        ...this.originalState,
        hasError: true,
        errorMsg: msg,
      });
    }; //errorOccured
    startLoading = () => {
      this.setState({
        ...this.originalState,
        isLoading: true,
      });
    }; //startLoading

    endLoading = () => {
      this.setState({
        ...this.originalState,
        isLoading: false,
      });
    }; //endLoading

    render() {
      const { hasError, isLoading, errorMsg } = this.state;
      const statusManagement = {
        resetStatusManagerState: this.resetStatusManagerState,
        errorOccurred: this.errorOccurred,
        startLoading: this.startLoading,
        endLoading: this.endLoading,
        hasError,
        isLoading,
        errorMsg,
      };
      return (
        <WrappedComponent {...this.props} statusManagement={statusManagement} />
      );
    }
  };
}

export { withStatusManager };
