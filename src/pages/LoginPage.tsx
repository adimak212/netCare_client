import Form from "@/componnents/Login/form";
import LockIcon from "@/assets/icons/lock.png";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "@/context/UserContext";

function Login() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const userLocal = JSON.parse(localStorage.getItem("user") || "null");
    if (userLocal != null) {
      setUser(userLocal)
      navigate(`/newProject`);
    }
  }, []);
  return (
    <div className="flex flex-col justify-center items-center w-[100vw] h-[90vh]">
      <div className="flex flex-col justify-center items-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
          <img className="w-8 h-fit" src={LockIcon} alt="" />
        </div>
        <div className="w-full font-extrabold text-white text-3xl text-center">Welcome Back</div>
        <div className="text-slate-400 mt-2">Please enter your details to sign in</div>
      </div>

      <div className="bg-[#162a3f] border border-slate-700/50 p-7 mt-3 shadow-2xl rounded-[8px] w-[22%]">
        <Form />
      </div>
      <div className="mt-8 text-center" data-purpose="signup-navigation">
        <p className="text-slate-400">
          Don't have an account?
          <a className="font-bold text-primary hover:text-blue-400 transition-base ml-2" href="/signup">
            Sign up for free
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
