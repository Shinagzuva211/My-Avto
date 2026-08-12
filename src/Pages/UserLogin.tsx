import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useUserAuth } from "../context/UserAuthContext";
import "./UserLogin.css";

export default function UserLogin() {
  const { t } = useTranslation();
  const { login, register } = useUserAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const switchMode = (m: "login" | "register") => {
    setMode(m);
    setError("");
    setName("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (mode === "register") {
        if (password !== confirmPassword) {
          throw new Error("passwordMismatch");
        }
        await register(name, email, password);
      } else {
        await login(email, password);
      }
      navigate("/");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "unknownError");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="user-login-container">
      <div className="user-login-box">
        <h2>{mode === "login" ? t("userAuth.loginTitle") : t("userAuth.registerTitle")}</h2>
        <p className="user-login-subtitle">
          {mode === "login" ? t("userAuth.loginSubtitle") : t("userAuth.registerSubtitle")}
        </p>
        <div className="user-auth-tabs">
          <button
            className={mode === "login" ? "active" : ""}
            onClick={() => switchMode("login")}
            type="button"
          >
            {t("userAuth.login")}
          </button>
          <button
            className={mode === "register" ? "active" : ""}
            onClick={() => switchMode("register")}
            type="button"
          >
            {t("userAuth.register")}
          </button>
        </div>
        {error && <div className="login-error">{t(`userAuth.errors.${error}`)}</div>}
        <form onSubmit={handleSubmit}>
          {mode === "register" && (
            <div className="form-group">
              <label>{t("userAuth.name")}</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={loading}
                placeholder={t("userAuth.namePlaceholder")}
              />
            </div>
          )}
          <div className="form-group">
            <label>{t("userAuth.email")}</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              placeholder="example@mail.com"
            />
          </div>
          <div className="form-group">
            <label>{t("userAuth.password")}</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              minLength={6}
            />
          </div>
          {mode === "register" && (
            <div className="form-group">
              <label>{t("userAuth.confirmPassword")}</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                disabled={loading}
                minLength={6}
              />
            </div>
          )}
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading
              ? mode === "login"
                ? t("userAuth.loggingIn")
                : t("userAuth.registering")
              : mode === "login"
                ? t("userAuth.login")
                : t("userAuth.createAccount")}
          </button>
        </form>
        <div className="user-login-footer">
          <Link to="/">{t("userAuth.backHome")}</Link>
          <span className="divider">|</span>
          <Link to="/admin/login">{t("userAuth.adminLink")}</Link>
        </div>
      </div>
    </div>
  );
}
