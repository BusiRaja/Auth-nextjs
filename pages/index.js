import Link from "next/link";

export default function Home() {
  return (
    <div className="layout-container welcome-wrapper">
      <h1 className="auth-title">Welcome</h1>
      <p className="auth-text">Two-factor authentication using nextjs, novu</p>
      <div className="auth-btns-wrapper">
        <Link href="/login" className="auth-button">
          Login
        </Link>
        <span>( or )</span>
        <Link href={"/signup"} className="auth-button">
          Signup
        </Link>
      </div>
    </div>
  );
}
