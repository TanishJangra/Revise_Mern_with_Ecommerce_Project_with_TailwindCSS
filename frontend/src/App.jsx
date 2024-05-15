import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import summaryApi from "./common";
import Context from "./context/index";
import {useDispatch} from 'react-redux'
import { setUserDetails } from "./store/userSlice";

function App() {
  
  const dispatch = useDispatch()
  const fetchUserDetails = async () => {
    const response = await fetch(summaryApi.current_user.url, {
      method: summaryApi.current_user.method,
      credentials: "include", //to send cookies to backend
    });

    const apidata = await response.json();

    if(apidata.success){
      dispatch(setUserDetails(apidata.data))
    }

    console.log("data-user", apidata);
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <>
      <Context.Provider value={{ fetchUserDetails }}>
        <ToastContainer />
        <Header />
        <main className="min-h-[calc(100vh-120px)]">
          <Outlet />
        </main>
        <Footer />
      </Context.Provider>
    </>
  );
}

export default App;
