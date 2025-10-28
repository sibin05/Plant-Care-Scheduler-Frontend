import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import "../../styles/auth.css";

const ForgotPasswordPage = () => {
  const [forgotEmail, setForgotEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loadingForgot, setLoadingForgot] = useState(false);

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-image" />

        <div className="auth-form">
          <h2>Reset Password</h2>
          
          {!otpSent ? (
            <form onSubmit={async (e) => {
              e.preventDefault();
              if (!forgotEmail) {
                toast.error("Enter your email");
                return;
              }

              setLoadingForgot(true);

              try {
                const response = await fetch(
                  "http://localhost:8080/api/auth/forgot-password",
                  {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email: forgotEmail }),
                  }
                );

                const data = await response.json();

                if (!response.ok) {
                  toast.error(data.message || "Email not registered");
                } else {
                  setOtpSent(true);
                  toast.success(data.message || "OTP sent to your registered email");
                }
              } catch (err) {
                console.error(err);
                toast.error("Network error. Try again later.");
              }

              setLoadingForgot(false);
            }}>
              <div className="form-group">
                <label>Enter your registered email</label>
                <input
                  type="email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              <button type="submit" disabled={loadingForgot}>
                {loadingForgot ? "Sending OTP..." : "Send OTP"}
              </button>
            </form>
          ) : (
            <form onSubmit={async (e) => {
              e.preventDefault();
              if (!otp || !newPassword) {
                toast.error("Fill all fields");
                return;
              }

              setLoadingForgot(true);

              try {
                const response = await fetch(
                  "http://localhost:8080/api/auth/reset-password",
                  {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      email: forgotEmail,
                      otp,
                      newPassword,
                    }),
                  }
                );

                const data = await response.json();

                if (!response.ok) {
                  toast.error(data.message || "Failed to reset password");
                } else {
                  toast.success(data.message || "Password reset successful");
                  // Reset form and go back to email step or redirect to login
                  setOtpSent(false);
                  setForgotEmail("");
                  setOtp("");
                  setNewPassword("");
                }
              } catch (err) {
                console.error(err);
                toast.error("Network error. Try again later.");
              }

              setLoadingForgot(false);
            }}>
              <div className="form-group">
                <label>Enter OTP</label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter 6-digit OTP"
                  maxLength="6"
                  style={{ textAlign: 'center', letterSpacing: '2px' }}
                  required
                />
              </div>

              <div className="form-group">
                <label>New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  required
                />
              </div>

              <button type="submit" disabled={loadingForgot}>
                {loadingForgot ? "Resetting..." : "Reset Password"}
              </button>
            </form>
          )}

          <p>
            Remember your password? <Link to="/login">Back to Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;