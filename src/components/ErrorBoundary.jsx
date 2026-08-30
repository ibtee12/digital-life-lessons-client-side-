import React from "react";
import { AlertTriangle, RefreshCw, Home, RotateCcw } from "lucide-react";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("React ErrorBoundary caught:", error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  handleResetAuth = () => {
    try {
      localStorage.removeItem("dll_user");
    } catch (e) {}
    window.location.href = "/login";
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
                {this.state.error?.message || "An unexpected interface error occurred."}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              <button
                onClick={this.handleReload}
                className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 text-stone-700 dark:text-stone-300 text-xs font-bold transition cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reload Page</span>
              </button>

              <button
                onClick={this.handleResetAuth}
                className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/40 text-amber-700 dark:text-amber-400 text-xs font-bold transition cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Session</span>
              </button>

              <button
                onClick={this.handleGoHome}
                className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-[#059669] hover:bg-[#047857] text-white text-xs font-bold shadow-md transition cursor-pointer"
              >
                <Home className="w-3.5 h-3.5" />
                <span>Home</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
