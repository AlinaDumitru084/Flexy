"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage(){

const router = useRouter();

const [email,setEmail] = useState("");
const [password,setPassword] = useState("");

const handleLogin = () => {

const savedUser = JSON.parse(
localStorage.getItem("userAccount") || "{}"
);

if(email === savedUser.email && password === savedUser.password){

localStorage.setItem(
"currentUser",
JSON.stringify(savedUser)
);

router.push("/profile");

}else{

alert("Wrong email or password");

}

};

return(

<div className="flex flex-col items-center justify-center min-h-screen">

<h1 className="text-3xl font-bold mb-6">
Login
</h1>

<input
className="border p-2 mb-3 w-64"
placeholder="Email"
onChange={(e)=>setEmail(e.target.value)}
/>

<input
type="password"
className="border p-2 mb-4 w-64"
placeholder="Password"
onChange={(e)=>setPassword(e.target.value)}
/>

<button
className="bg-red-400 text-white px-6 py-2 rounded hover:bg-red-500"
onClick={handleLogin}
>
Login
</button>

<Link
href="/forgot-password"
className="text-sm text-blue-500 mt-2 hover:underline"
>
Forgot password?
</Link>

<p className="mt-4">
Don't have an account?

<Link href="/signup" className="ml-2 text-blue-500 hover:underline">
Sign up
</Link>

</p>

</div>

);

}