"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage(){

const router = useRouter();

const [email,setEmail] = useState("");
const [newPassword,setNewPassword] = useState("");

const handleReset = () => {

const user = JSON.parse(
localStorage.getItem("userAccount") || "null"
);

if(!user){
  alert("No account found.");
  return;
}

if(user.email !== email){
  alert("Email not found.");
  return;
}

user.password = newPassword;

localStorage.setItem(
"userAccount",
JSON.stringify(user)
);

alert("Password updated successfully!");

router.push("/login");

};

return(

<div className="flex flex-col items-center justify-center min-h-screen">

<h1 className="text-3xl font-bold mb-6">
Reset Password
</h1>

<input
className="border p-2 mb-3 w-72"
placeholder="Email"
onChange={(e)=>setEmail(e.target.value)}
/>

<input
type="password"
className="border p-2 mb-4 w-72"
placeholder="New password"
onChange={(e)=>setNewPassword(e.target.value)}
/>

<button
className="bg-red-400 text-white px-6 py-2 rounded"
onClick={handleReset}
>

Reset Password

</button>

</div>

);

}