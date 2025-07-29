import { useState } from "react";
import type {FormEvent, JSX} from "react"
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";
import Cookies from "js-cookie";
// import GoogleLogin from "../compounts/GoogleLogin";
import toast, { Toaster } from 'react-hot-toast';
import type { FirebaseError } from "firebase/app";

function Login(): JSX.Element {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const login = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
        localStorage.setItem("uid",user.uid) 

      const token: string = await user.getIdToken();
      Cookies.set("token", token);

      toast.success(`✅ Logged in as ${user.email}`);
    } catch (err) {
      const errorCode = (err as FirebaseError).code;

      if(errorCode === "auth/invalid-credential"){
        toast.error("linvalid user name or password");
      }else{
        toast.error("something went wrong try again later");
      }
    }
  };

  return (
    <>
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <form
        onSubmit={login}
        className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8 w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white">Login</h2>
        <div>
          <label className="block mb-1 text-sm text-gray-600 dark:text-gray-300">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm text-gray-600 dark:text-gray-300">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300"
        >
          Login
        </button>
      </form>
        {/* <GoogleLogin /> */}
    </div>
       <Toaster position="top-center" />
    </>
  );
}

export default Login;
