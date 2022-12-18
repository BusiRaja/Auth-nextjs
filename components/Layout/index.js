import Link from "next/link";
import { useRouter } from "next/router";

const Layout = ({
  authTitle,
  authNote,
  formTitle,
  formNote,
  children,
  src,
}) => {
  const location = useRouter();

  return (
    <div
      className={`layout-container ${
        location.pathname === "/signup" ? "form-right" : " form-left"
      }`}
    >
      <div className={`layout-left ${src ? "p-0" : ""}`}>
        {src ? (
          <img src={src} alt={authTitle} className="auth-image" />
        ) : (
          <>
            <h1 className="auth-title">{authTitle}</h1>
            <p className="auth-text">{authNote}</p>
            <Link
              href={location.pathname === "/signup" ? "/login" : "/signup"}
              className="auth-button"
            >
              {location.pathname === "/signup" ? "Login" : "Signup"}
            </Link>
            <div className="layout-circle"></div>
          </>
        )}
      </div>
      <div className="layout-right">
        <h2 className="auth-title">{formTitle}</h2>
        <p className="auth-text">{formNote}</p>
        <div className="auth-form-container">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
