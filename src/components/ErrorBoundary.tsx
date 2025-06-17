import React, { Component, ReactNode } from 'react'

type Props = {
     children: ReactNode;
}

type State = {
    hasError:boolean,
    error:null | string
}

export default class ErrorBoundary extends Component<Props, State> {
    // state: Readonly<State>
    constructor(props:Props){
        super(props)
        this.state = {hasError:false,error:null}
    }
    static getDerivedStateFromError(error:any){
        return { hasError: true, error }
    }
    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        console.error("Error caught by MyErrorBoundary:", error);
        console.error("Component stack:", errorInfo.componentStack);
    }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ color: 'red' }}>
          <h2>Something went wrong.</h2>
          <p>{this.state.error?.toString()}</p>
        </div>
      );
    }

    return this.props.children;
  }
}