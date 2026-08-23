import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, User, Image, Sparkles, ArrowRight, Check, X, Loader2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export const RegisterPage = () => {
  useDocumentTitle("Create Account - Digital Life Lessons");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    photo: "",
    password: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleSubmitting, setIsGoogleSubmitting] = useState(false);

  const { registerWithEmail, loginWithGoogle, showToast } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Password validation rules
  const hasUppercase = /[A-Z]/.test(formData.password);
  const hasLowercase = /[a-z]/.test(formData.password);
  const hasMinLength = formData.password.length >= 6;
  const isPasswordValid = hasUppercase && hasLowercase && hasMinLength;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isPasswordValid) {
      showToast("Please fulfill all password requirements.", "error");
      return;
    }

    setIsSubmitting(true);
    try {
      await registerWithEmail(formData.name, formData.email, formData.password, formData.photo);
      navigate("/dashboard");
    } catch (err) {
      // Error handled in AuthContext
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsGoogleSubmitting(true);
    try {
      await loginWithGoogle();
      navigate("/dashboard");
    } catch (err) {
      // Error handled in AuthContext
    } finally {
      setIsGoogleSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF9] dark:bg-[#0C0A09] text-[#1C1917] dark:text-[#FAFAF9]">
      <Navbar />

      <main className="flex-1 max-w-[1280px] w-full mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 flex items-center justify-center">
        <div className="w-full max-w-5xl bg-white dark:bg-[#292524] rounded-3xl border border-stone-200 dark:border-stone-700/80 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">
          
          {/* Left Column: Photography & Insight */}
          <div className="relative hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-[#059669] to-[#0D9488] text-white">
            <img
              src="https://images.unsplash.com/photo-1499209974431-9dac3ada00d7?auto=format&fit=crop&w=800&q=80"
              alt="Join Community"
              className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay"
            />
            <div className="relative z-10">
              <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white mb-6">
                <Sparkles className="w-5 h-5" />
              </div>
              <h2 className="text-3xl font-extrabold tracking-tight leading-snug">
                Join a community of deliberate thinkers.
              </h2>
              <p className="text-sm text-stone-100 mt-3 leading-relaxed">
                Capture your personal milestones, reflect on career breakthroughs, and learn from shared life wisdom.
              </p>
            </div>

            <div className="relative z-10 pt-8 border-t border-white/20 text-xs text-stone-200">
              <p className="italic">"The unexamined life is not worth living."</p>
              <p className="font-semibold mt-1">— Socrates</p>
            </div>
          </div>

          {/* Right Column: Register Form Card */}
          <div className="p-8 sm:p-12 flex flex-col justify-center">
            <div className="mb-6">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-stone-100 tracking-tight">
                Create Account
              </h1>
              <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
                Start preserving your personal life lessons today.
              </p>
            </div>

            {/* Google Sign-In Button */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={isGoogleSubmitting || isSubmitting}
              className="w-full py-3 px-4 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-[#1C1917] hover:bg-stone-50 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-200 font-semibold text-sm shadow-sm flex items-center justify-center space-x-3 transition mb-6 cursor-pointer disabled:opacity-50"
            >
              {isGoogleSubmitting ? (
                <Loader2 className="w-5 h-5 animate-spin text-[#059669]" />
              ) : (
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
              )}
              <span>{isGoogleSubmitting ? "Connecting to Google..." : "Continue with Google"}</span>
            </button>

            <div className="relative flex items-center justify-center mb-6">
              <div className="border-t border-stone-200 dark:border-stone-800 w-full" />
              <span className="bg-white dark:bg-[#292524] px-3 text-[11px] font-bold uppercase tracking-wider text-stone-400 absolute">
                Or Register With Email
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-400 mb-1">
                  Full Name
                </label>
                <div className="relative flex items-center">
                  <User className="w-4 h-4 absolute left-3.5 text-stone-400 pointer-events-none" />
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Marcus Vance"
                    className="w-full h-11 pl-10 pr-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-[#1C1917] text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:border-[#059669] focus:ring-2 focus:ring-[#D1FAE5] dark:focus:ring-[#059669]/30 transition"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-400 mb-1">
                  Email Address
                </label>
                <div className="relative flex items-center">
                  <Mail className="w-4 h-4 absolute left-3.5 text-stone-400 pointer-events-none" />
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    className="w-full h-11 pl-10 pr-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-[#1C1917] text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:border-[#059669] focus:ring-2 focus:ring-[#D1FAE5] dark:focus:ring-[#059669]/30 transition"
                  />
                </div>
              </div>

              {/* Photo URL */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-400 mb-1">
                  Photo URL (Optional)
                </label>
                <div className="relative flex items-center">
                  <Image className="w-4 h-4 absolute left-3.5 text-stone-400 pointer-events-none" />
                  <input
                    type="url"
                    name="photo"
                    value={formData.photo}
                    onChange={handleChange}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full h-11 pl-10 pr-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-[#1C1917] text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:border-[#059669] focus:ring-2 focus:ring-[#D1FAE5] dark:focus:ring-[#059669]/30 transition"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-400 mb-1">
                  Password
                </label>
                <div className="relative flex items-center">
                  <Lock className="w-4 h-4 absolute left-3.5 text-stone-400 pointer-events-none" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full h-11 pl-10 pr-10 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-[#1C1917] text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:border-[#059669] focus:ring-2 focus:ring-[#D1FAE5] dark:focus:ring-[#059669]/30 transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {/* Live Password Requirements Checklist */}
                <div className="mt-2.5 p-3 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/80 dark:border-stone-700/60 space-y-1.5 text-xs">
                  <p className="font-semibold text-stone-600 dark:text-stone-400 text-[11px] uppercase tracking-wider">
                    Password Requirements:
                  </p>
                  
                  <div className={`flex items-center space-x-2 transition ${hasUppercase ? "text-emerald-600 dark:text-emerald-400 font-semibold" : "text-stone-400"}`}>
                    {hasUppercase ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                    <span>Must contain an uppercase letter (A-Z)</span>
                  </div>

                  <div className={`flex items-center space-x-2 transition ${hasLowercase ? "text-emerald-600 dark:text-emerald-400 font-semibold" : "text-stone-400"}`}>
                    {hasLowercase ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                    <span>Must contain a lowercase letter (a-z)</span>
                  </div>

                  <div className={`flex items-center space-x-2 transition ${hasMinLength ? "text-emerald-600 dark:text-emerald-400 font-semibold" : "text-stone-400"}`}>
                    {hasMinLength ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                    <span>At least 6 characters long</span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={!isPasswordValid || isSubmitting || isGoogleSubmitting}
                className="w-full py-3.5 rounded-xl bg-[#059669] hover:bg-[#047857] disabled:opacity-40 text-white font-bold text-sm shadow-md transition flex items-center justify-center space-x-2 mt-4 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Creating Account...</span>
                  </>
                ) : (
                  <>
                    <span>Complete Registration</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <p className="text-xs text-center text-stone-500 dark:text-stone-400 mt-6">
              Already have an account?{" "}
              <Link to="/login" className="text-[#059669] dark:text-[#34D399] font-bold hover:underline">
                Log In
              </Link>
            </p>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};
