import React, { useState } from "react";
import ROLE from "../common/role";
import { IoMdClose } from "react-icons/io";
import summaryApi from "../common";
import { toast } from 'react-toastify';

const ChangeUserRole = ({name, email, role, onClose, userId, callFunc}) => {
  console.log("name", name, "email", email, "role", role, "UserId", userId);
  const [userRole, setUserRole] = useState(role)

  const handleOnChangeSelect = (e) => {
    console.log("e is ", e.target)
    setUserRole(e.target.value)
    console.log(e.target.value)
  }

  const updateUserRole = async () => {
    console.log("userId", userId, "userrole ", userRole);
    const resp = await fetch(summaryApi.updateUser.url,{
      method: summaryApi.updateUser.method,
      credentials: 'include',
      headers:{
        "content-type":'application/json'
      },
      body: JSON.stringify({
        userId: userId,
        role: userRole
      })
    })

    const apidata = await resp.json();
    console.log("role updated", apidata)
    if(apidata.success){
      toast.success(apidata.message);
      onClose();
      callFunc()
    }
    if(apidata.error){
      toast.error(apidata.message);
      onClose();
    }
  }

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-between items-center bg-slate-200 bg-opacity-50">
      <div className="mx-auto bg-white shadow-md p-4 w-full max-w-sm">
      <button className="block ml-auto" onClick={onClose}>
      <IoMdClose/>
      </button>
        <h1 className="pb-4 text-lg font-medium">Change User Role</h1>
        <p>Name : {name}</p>
        <p>Email : {email}</p>
        <div className="flex items-center justify-between my-4">
          <p>Role</p>
          <select className="border px-4 py-1" onChange={handleOnChangeSelect}>
            {Object.values(ROLE).map((elem, ind) => {
              return (
                <option value={elem} key={ind}>
                  {elem}
                </option>
              );
            })}
          </select>
        </div>
        <button className="w-fit mx-auto block py-1 px-3 rounded-full bg-red-600 text-white hover:bg-red-700" onClick={updateUserRole}>Change Role</button>
      </div>
    </div>
  );
};

export default ChangeUserRole;
