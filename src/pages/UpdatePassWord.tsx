import { useState, useEffect } from "react";
import { supabase } from "../../services/supabaseClient";
import { useNavigate } from "react-router-dom";
import { Eye, EyeClosed } from "lucide-react";

export default function UpdatePasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Listen for the PASSWORD_RECOVERY event
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "PASSWORD_RECOVERY") {
          console.log("Recovery session active");
          // You can now show the password update form
        } else {
          //   navigate("/login");
        }
      },
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  async function updatePassword() {
    setLoading(true);
    // Ideally, enforce a new password policy here
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }
    if (password || confirmPassword) {
      const { data, error } = await supabase.auth.updateUser({
        password: password,
      });

      if (data) {
        alert("Password updated successfully!");
        navigate("/login");
      }
      if (error) {
        setError("There was an error updating your password.");
    }
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0F1221] flex flex-col items-center justify-center p-4 font-sans">
      {/* Header/Logo Section (Matches the 'RECTO' text in the image) */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-[#5B6BF9] mb-2 tracking-tight">
          RECTO
        </h1>
        <p className="text-gray-400 text-sm">
          Set A new password for your account and get back to designing amazing
          things!
        </p>
      </div>

      {/* Card Container: White background, rounded corners, shadow */}
      <div className="bg-white w-full max-w-112.5 rounded-3xl shadow-2xl p-8 md:p-10">
        {/* Title (Replacing your simple <h2>) */}
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
          Set New Password
        </h2>
        {error && (
          <p className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm">
            {error}
          </p>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            updatePassword();
          }}
          className="space-y-6"
        >
          {/* Input Group */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-600 ml-1">
              New Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pr-12 px-4 py-3.5 rounded-xl border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5B6BF9]/50 focus:border-[#5B6BF9] transition-all duration-200 bg-white"
              />
              <button
                type="button"
                aria-label={showPassword ? "Hide password" : "Show password"}
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-600 hover:text-gray-900"
              >
                {showPassword ? (
                  <Eye className="w-4 h-4" />
                ) : (
                  <EyeClosed className="w-4 h-4" />
                )}
              </button>
            </div>
            <label className="block text-sm font-medium text-gray-600 ml-1">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pr-12 px-4 py-3.5 rounded-xl border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5B6BF9]/50 focus:border-[#5B6BF9] transition-all duration-200 bg-white"
              />
              <button
                type="button"
                aria-label={
                  showConfirmPassword
                    ? "Hide confirm password"
                    : "Show confirm password"
                }
                onClick={() => setShowConfirmPassword((s) => !s)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-600 hover:text-gray-900"
              >
                {showConfirmPassword ? (
                  <Eye className="w-4 h-4" />
                ) : (
                  <EyeClosed className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Button */}
          <button
            className="w-full bg-[#5B6BF9] hover:bg-[#4a5ae0] text-white font-bold py-3.5 rounded-xl transition-colors duration-200 shadow-[0_4px_14px_0_rgba(91,107,249,0.39)] disabled:bg-gray-400 disabled:shadow-none disabled:cursor-not-allowed"
            disabled={!password || !confirmPassword}
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
}
