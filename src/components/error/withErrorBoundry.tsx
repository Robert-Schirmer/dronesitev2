import React from 'react';
import ErrorBoundry from './ErrorBoundry';

// HOC for wrapping a component in an error boundry
const withErrorBoundry = <P extends object>(Component: React.ComponentType<P>) => {
  // Wrapper component needs a display name so need to use named function
  return function errorBoundryWrapper(props: P) {
    return (
      <ErrorBoundry>
        <Component {...props} />
      </ErrorBoundry>
    );
  };
};

export default withErrorBoundry;
