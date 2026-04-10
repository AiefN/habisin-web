import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { AuthProvider } from "./AuthContext";
import { Component, ReactNode } from "react";
import "../styles/fonts.css";

console.log("App component loading...");

class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean; error?: Error }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    console.error("React Error Boundary caught an error:", error);
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error("React Error Boundary details:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: "20px", fontFamily: "monospace", backgroundColor: "#f5f5f5" }}>
          <h1>React Error</h1>
          <p>Something went wrong. Check the console for details.</p>
          <pre>{this.state.error?.toString()}</pre>
        </div>
      );
    }

    return this.props.children;
  }
}

export default function App() {
  console.log("App component rendering...");
  return (
    <ErrorBoundary>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ErrorBoundary>
  );
}
