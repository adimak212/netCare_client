import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUpPage = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setComfrimPassword] = useState<string>("");
  const navigate = useNavigate();

  const register = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (password === confirmPassword) {
      try {
        const response: any = await axios.post("http://localhost:3000/v1/users/register", {
            userName: username,
            email,
            password,
        });
        toast.success("signed up successfully", {
          duration: 1500,
          style: {
            background: "#102235",
            color: "white",
          },
        });
        navigate(`/`);
      } catch (error) {
        e.stopPropagation();
        console.log(error)
      }
    } else {
      e.stopPropagation();
    }
  };
  return (
    <div className="flex h-[90vh] flex-col bg-background-dark text-slate-100">
      <main className="flex flex-1 items-center justify-center p-5">
        <div className="flex w-full max-w-[360px] flex-col gap-4 rounded-lg border border-slate-700 bg-slate-800/40 p-5 shadow-md">
          <div className="flex flex-col gap-1">
            <h1 className="text-xl font-bold">Create Account</h1>

            <p className="text-sm text-slate-400">Join our community</p>
          </div>

          <div className="flex flex-col gap-3">
            <input
              className="h-10 w-full rounded-md border border-slate-700 bg-slate-900 px-3 text-sm outline-none focus:ring-1 focus:ring-primary"
              placeholder="User name"
              type="text"
              autoComplete="username"
              onChange={(event) => setUsername(event.target.value)}
            />
            <input
              className="h-10 w-full rounded-md border border-slate-700 bg-slate-900 px-3 text-sm outline-none focus:ring-1 focus:ring-primary"
              placeholder="Email"
              type="email"
              autoComplete="email"
              onChange={(event) => setEmail(event.target.value)}
            />
            <input
              className="h-10 w-full rounded-md border border-slate-700 bg-slate-900 px-3 text-sm outline-none focus:ring-1 focus:ring-primary"
              placeholder="Password"
              type="password"
              autoComplete="new-password"
              onChange={(event) => setPassword(event.target.value)}
            />
            <input
              className="h-10 w-full rounded-md border border-slate-700 bg-slate-900 px-3 text-sm outline-none focus:ring-1 focus:ring-primary"
              placeholder="Confirm password"
              type="password"
              autoComplete="new-password"
              onChange={(event) => setComfrimPassword(event.target.value)}
            />

            <button
              className="mt-1 h-10 rounded-md bg-primary text-sm font-bold hover:brightness-110"
              onClick={(e) => register(e)}
            >
              Create Account
            </button>
          </div>

          <div className="text-center text-xs text-slate-400">
            <a className="hover:text-primary" href="/">
              Back to login
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SignUpPage;
