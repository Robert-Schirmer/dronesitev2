import { Typography } from '@mui/material';
import React from 'react';

interface Props {}

interface State {
  hasError: Boolean;
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_error: any) {
    // Called when component throws an error
    return { hasError: true };
  }

  componentDidCatch(_error: any, _errorInfo: { componentStack: string }) {
    // Log the error or something
  }

  render() {
    if (this.state.hasError) {
      return <Typography variant='body1'>Ooops... somthing went wrong 😥</Typography>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
