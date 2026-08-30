import React from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("React ErrorBoundary caught an error:", error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = "/";
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#FAFAF9] dark:bg-[#0C0A09] p-4 text-[#1C1917] dark:text-[#FAFAF9]">
          <div className="max-w-md w-full p-8 rounded-3xl bg-white dark:bg-[#1C1917] border border-stone-200 dark:border-stone-800 shadow-2xl text-center space-y-5">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-500 flex items-center justify-center shadow-md">
              <AlertTriangle className="w-7 h-7" />
            </div>
            
            <div>
              <h2 className="text-xl font-extrabold tracking-tight">Something went wrong</h2>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 leading-relaxed">
                An unexpected interface error occurred. You can reload the page or return to the home screen.
              </p>
            </div>

            <div className="flex items-center justify-center space-x-3 pt-2">
              <button
                onClick={this.handleReload}
                className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 text-stone-700 dark:text-stone-300 text-xs font-bold transition cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reload Page</span>
              </button>

              <button
                onClick={this.handleGoHome}
                className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-[#059669] hover:bg-[#047857] text-white text-xs font-bold shadow-md transition cursor-pointer"
              >
                <Home className="w-3.5 h-3.5" />
                <span>Home Page</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
