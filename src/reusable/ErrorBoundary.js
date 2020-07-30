import React from 'react';
import ErrorComponent from '../helpers/ErrorComponent.js'

class ErrorBoundary extends React.Component {

  state = {
    hasError: false
  }

  componentDidCatch() {
    this.setState({
      hasError: true
    })
  }

  render() {

    if (this.state.hasError) {
      return <ErrorComponent/>
    }
    return this.props.children;
  }
}

export default ErrorBoundary;