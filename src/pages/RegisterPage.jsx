import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, User, Image, Sparkles, ArrowRight, Check, X, Loader2, Upload, Link as LinkIcon, Trash2 } from "lucide-react";
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

  const [photoMode, setPhotoMode] = useState("file"); // "file" or "url"
  const [photoPreview, setPhotoPreview] = useState("");
  const fileInputRef = useRef(null);

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleSubmitting, setIsGoogleSubmitting] = useState(false);

  const { registerWithEmail, loginWithGoogle, showToast } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === "photo") {
      setPhotoPreview(value);
    }
  };

  // Handle local image file upload from user device
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      showToast("Please select a valid image file (JPG, PNG, WEBP).", "error");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      showToast("Image file size should be less than 5MB.", "error");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64Url = event.target?.result;
      if (typeof base64Url === "string") {
        setPhotoPreview(base64Url);
        setFormData(prev => ({ ...prev, photo: base64Url }));
        showToast("Profile image loaded from device!", "info");
      }
    };
    reader.readAsDataURL(file);
  };

  const clearPhoto = () => {
    setPhotoPreview("");
    setFormData(prev => ({ ...prev, photo: "" }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
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

  const handleGoogleAuth = async () => {
    setIsGoogleSubmitting(true);
    try {
      const res = await loginWithGoogle();
      const isAdmin = res?.email && res.email.toLowerCase().trim() === "admin@digitallife.com";
      setTimeout(() => { navigate(isAdmin ? "/dashboard/admin" : "/dashboard"); }, 150);
    } catch (err) {
      console.error("Google Auth error:", err);
    } finally {
      setIsGoogleSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF9] dark:bg-[#0C0A09] text-[#1C1917] dark:text-[#FAFAF9]">
      <Navbar />

      <main className="flex-1 max-w-[1280px] w-full mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 flex items-center justify-center">
        
        {/* 2-Column Matching Layout identical to LoginPage */}
        <div className="w-full max-w-5xl bg-white dark:bg-[#292524] rounded-3xl border border-stone-200 dark:border-stone-700/80 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">
          
          {/* Left Column: Photography & Brand Statement */}
          <div className="relative hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-[#059669] to-[#0D9488] text-white">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80"
              alt="Join Digital Life Lessons"
              className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay"
            />
            <div className="relative z-10">
              <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white mb-6">
                <Sparkles className="w-5 h-5" />
              </div>
              <h2 className="text-3xl font-extrabold tracking-tight leading-snug">
                Join a community dedicated to lifelong wisdom.
              </h2>
              <p className="text-sm text-stone-100 mt-3 leading-relaxed">
                Document your core life lessons, save valuable mental models, and inspire others on their journey.
              </p>
            </div>

            <div className="relative z-10 pt-8 border-t border-white/20 text-xs text-stone-200">
              <p className="italic">"The unexamined life is not worth living."</p>
              <p className="font-semibold mt-1">— Socrates</p>
            </div>
          </div>

          {/* Right Column: Register Form */}
          <div className="p-8 sm:p-12 flex flex-col justify-center">
            
            <div className="mb-6">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-stone-100 tracking-tight">
                Create Account
              </h1>
              <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
                Sign up to get started in seconds.
              </p>
            </div>

            {/* Google Quick Auth */}
            <button
              type="button"
              onClick={handleGoogleAuth}
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

              {/* Dual-Mode Profile Photo Selector (Upload File OR Web URL) */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-400">
                    Profile Photo (Optional)
                  </label>

                  {/* Mode Switcher Tabs */}
                  <div className="flex items-center space-x-1 bg-stone-100 dark:bg-stone-800 p-0.5 rounded-lg text-[11px] font-bold">
                    <button
                      type="button"
                      onClick={() => setPhotoMode("file")}
                      className={`px-2 py-0.5 rounded-md transition ${photoMode === "file" ? "bg-white dark:bg-[#292524] text-[#059669] dark:text-[#34D399] shadow-2xs" : "text-stone-500 hover:text-stone-800 dark:hover:text-stone-200"}`}
                    >
                      📁 Upload File
                    </button>
                    <button
                      type="button"
                      onClick={() => setPhotoMode("url")}
                      className={`px-2 py-0.5 rounded-md transition ${photoMode === "url" ? "bg-white dark:bg-[#292524] text-[#059669] dark:text-[#34D399] shadow-2xs" : "text-stone-500 hover:text-stone-800 dark:hover:text-stone-200"}`}
                    >
                      🌐 Image URL
                    </button>
                  </div>
                </div>

                {/* Option A: Upload File from Device */}
                {photoMode === "file" && (
                  <div className="space-y-2">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="avatar-file-upload"
                    />

                    {photoPreview ? (
                      <div className="flex items-center space-x-3 p-2.5 rounded-xl border border-emerald-500/30 bg-emerald-50/50 dark:bg-emerald-950/20">
                        <img
                          src={photoPreview}
                          alt="Preview"
                          className="w-10 h-10 rounded-full object-cover border border-emerald-500/40 shadow-xs flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-emerald-700 dark:text-emerald-300 truncate">
                            Image selected from device
                          </p>
                          <p className="text-[10px] text-stone-500">Ready to save</p>
                        </div>
                        <button
                          type="button"
                          onClick={clearPhoto}
                          className="p-1.5 rounded-lg text-stone-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-white dark:hover:bg-stone-800 transition"
                          title="Remove image"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <label
                        htmlFor="avatar-file-upload"
                        className="flex items-center justify-between p-3 border-2 border-dashed border-stone-200 dark:border-stone-700 hover:border-[#059669] dark:hover:border-[#34D399] bg-stone-50/60 dark:bg-[#1C1917]/60 rounded-xl cursor-pointer transition group"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="p-2 rounded-lg bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 group-hover:border-[#059669]/40">
                            <Upload className="w-4 h-4 text-stone-500 group-hover:text-[#059669]" />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-stone-700 dark:text-stone-300 group-hover:text-[#059669]">
                              Click to choose image from device
                            </p>
                            <p className="text-[10px] text-stone-400">PNG, JPG, WEBP (Max 5MB)</p>
                          </div>
                        </div>
                      </label>
                    )}
                  </div>
                )}

                {/* Option B: Enter Web URL */}
                {photoMode === "url" && (
                  <div className="space-y-2">
                    <div className="relative flex items-center">
                      <LinkIcon className="w-4 h-4 absolute left-3.5 text-stone-400 pointer-events-none" />
                      <input
                        type="url"
                        name="photo"
                        value={formData.photo}
                        onChange={handleChange}
                        placeholder="https://images.unsplash.com/..."
                        className="w-full h-11 pl-10 pr-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-[#1C1917] text-stone-900 dark:text-stone-100 text-sm focus:outline-none focus:border-[#059669] focus:ring-2 focus:ring-[#D1FAE5] dark:focus:ring-[#059669]/30 transition"
                      />
                    </div>

                    {photoPreview && (
                      <div className="flex items-center space-x-3 p-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800/40">
                        <img
                          src={photoPreview}
                          alt="Preview URL"
                          onError={(e) => { e.currentTarget.style.display = "none"; }}
                          className="w-9 h-9 rounded-full object-cover border border-stone-300"
                        />
                        <span className="text-xs text-stone-500 truncate flex-1">{formData.photo}</span>
                        <button
                          type="button"
                          onClick={clearPhoto}
                          className="p-1 text-stone-400 hover:text-red-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                )}
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
