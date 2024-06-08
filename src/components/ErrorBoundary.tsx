import React,{ErrorInfo,ReactNode} from 'react'

interface ErrorBoundaryProps{
    children:ReactNode;
}
interface ErrorBoundaryState{
    hasError:boolean;
    error:Error| null;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps,ErrorBoundaryState>{
    constructor(props:ErrorBoundaryProps){
        super(props)
        this.state = {
            hasError:false,
            error:null
        }
    }
    static getDerivedStateFromError(error:Error):ErrorBoundaryState{
        return {hasError:true,error}
    }
    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        console.error('Error caught by Error Boundary',error,errorInfo)
        
    }

    render(){
        if(this.state.hasError){
            return <div>Something Went Wrong. Please try again later.</div>
        }
        return this.props.children
    }
}

export default ErrorBoundary