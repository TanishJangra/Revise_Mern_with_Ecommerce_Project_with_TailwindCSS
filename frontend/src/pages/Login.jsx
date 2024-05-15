import React, { useContext, useState } from "react";
import signInLogo from "./../assets/signin.gif";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import summaryApi from "../common";
import { toast } from "react-toastify";
import Context from "../context";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email:"",
    password:""
  })
  const navigate = useNavigate();
  const {fetchUserDetails} = useContext(Context)

  const handleOnChange = (e) => {
    const {name, value} = e.target

    setData((prev)=>{
      return {
        ...prev,
        [name]:value
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(summaryApi.signIn.url,{
      method: summaryApi.signIn.method,
      credentials: 'include',
      headers:{
        "content-type":"application/json"
      },
      body: JSON.stringify(data)
    })

    const apiData = await response.json();

    if(apiData.success){
        toast.success(apiData.message, {autoClose: 1000});
        fetchUserDetails()
        navigate("/");
      }

      if(apiData.error){
        toast.error(apiData.message, {autoClose: 1000});
      }
  }

  console.log("data", data);
  return (
    <section id="login">
      <div className="mx-auto container p-4">
        <div className="bg-white p-5 w-full max-w-sm mx-auto">
          <div className="w-20 h-20 mx-auto ">
            <img src={signInLogo} alt="login icon" />
          </div>
          <form className="pt-6 flex flex-col gap-2" onSubmit={handleSubmit}>
            <div className="grid">
              <label>Email:</label>
              <div className="bg-slate-100 p-2">
                <input
                  type="email"
                  placeholder="Enter your email..."
                  name="email"
                  value={data.email}
                  className="w-full outline-none bg-transparent h-full"
                  onChange={handleOnChange}
                />
              </div>
            </div>
            <div>
              <label>Password:</label>
              <div className="bg-slate-100 p-2 flex">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password..."
                  className="w-full outline-none bg-transparent h-full"
                  name="password"
                  value={data.password}
                  onChange={handleOnChange}
                />
                <div
                  className="cursor-pointer text-xl"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  <span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
              </div>
              <Link to={'/forgot-password'} className="block w-fit ml-auto hover:underline hover:text-red-600">Forgot Password ?</Link>
            </div>
            <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6">
              Login
            </button>
          </form>
          <p className="my-5">Don't have account? <Link to={'/sign-up'} className="text-red-600 hover:text-red-700 hover:underline">Sign up</Link></p>
        </div>
      </div>
    </section>
  );
};

export default Login;
