import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../lib/firebase";
import Cookies from "js-cookie";
import axios from "axios";
import type { JSX } from "react";

function GoogleLogin(): JSX.Element {
  const handleGoogleLogin = async (): Promise<void> => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const token: string = await user.getIdToken();

      // 🍪 Store token in cookie
      Cookies.set("token", token, { secure: true, sameSite: "strict" });

      // Optional: Send to backend
      const res = await axios.get("http://localhost:3000/protected", {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("User:", user.email);
      console.log("Backend response:", res.data);
    } catch (err: any) {
      console.error("Google sign-in error:", err.message);
    }
  };

  return (
    <button onClick={handleGoogleLogin}>
      Sign in with Google
    </button>
  );
}

export default GoogleLogin;
