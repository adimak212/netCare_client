import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

export default function form() {
  const [checked, setChecked] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleSignIn = async () => {
    const response: any = await axios.post("http://localhost:3000/v1/users/login", {
      email,
      password,
    });
    if (checked) {
      localStorage.setItem("user", JSON.stringify(response.data.user));
    }
    console.log(response.data.user);
    setUser(response.data.user);
    navigate(`/newProject`);
  };

  return (
    <div className="space-y-4 w-[100%]">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-300">Email Address</label>
        <input
          className="w-full px-4 py-3 bg-[#0d1b2a] border border-slate-600 rounded-[8px] text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-base"
          id="email"
          name="email"
          placeholder="name@company.com"
          required
          type="email"
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-slate-300">Password</label>
        <input
          className="w-full px-4 py-3 bg-[#0d1b2a] border border-slate-600 rounded-[8px] text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-base"
          id="email"
          name="email"
          placeholder="••••••••"
          required
          type="email"
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <div className="flex items-center">
        <label htmlFor="remember-me" className="flex items-center gap-3 cursor-pointer select-none">
          <input
            id="remember-me"
            type="checkbox"
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
            className="sr-only"
          />

          <div
            className={`h-6 w-6 rounded-lg border-2 flex items-center justify-center transition-all bg-background" ${
              checked ? "border-primary" : "border-slate-500"
            }`}
          >
            {checked && <span className="text-slate-200 text-sm">✓</span>}
          </div>

          <span className="text-slate-400 text-sm">Keep me signed in</span>
        </label>
      </div>
      <button
        className="w-full py-3 px-4 bg-primary hover:bg-blue-600 text-white font-bold rounded-[8px] shadow-lg shadow-primary/20 transition-base active:scale-[0.98]"
        type="submit"
        onClick={handleSignIn}
      >
        Sign In
      </button>
    </div>
  );
}
