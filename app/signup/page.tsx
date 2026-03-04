"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {

const router = useRouter();

const [firstName,setFirstName] = useState("");
const [lastName,setLastName] = useState("");
const [email,setEmail] = useState("");
const [password,setPassword] = useState("");
const [phone,setPhone] = useState("");

const handleSignup = () => {

if (!firstName || !lastName || !email || !password) {
alert("Please fill in all required fields");
return;
}

const existingUser = JSON.parse(
localStorage.getItem("userAccount") || "null"
);

if (existingUser && existingUser.email === email) {
alert("An account with this email already exists.");
return;
}

const userData = {
firstName,
lastName,
email,
password,
phone
};

localStorage.setItem(
"userAccount",
JSON.stringify(userData)
);

localStorage.setItem(
"currentUser",
JSON.stringify(userData)
);

router.push("/profile");

};

return(

<div className="flex flex-col items-center justify-center min-h-screen">

<h1 className="text-3xl font-bold mb-6">
Create Account
</h1>

<input
className="border p-2 mb-3 w-72"
placeholder="First name *"
onChange={(e)=>setFirstName(e.target.value)}
/>

<input
className="border p-2 mb-3 w-72"
placeholder="Last name *"
onChange={(e)=>setLastName(e.target.value)}
/>

<input
className="border p-2 mb-3 w-72"
placeholder="Email *"
onChange={(e)=>setEmail(e.target.value)}
/>

<input
type="password"
className="border p-2 mb-3 w-72"
placeholder="Password *"
onChange={(e)=>setPassword(e.target.value)}
/>

<input
className="border p-2 mb-4 w-72"
placeholder="Phone number (optional)"
onChange={(e)=>setPhone(e.target.value)}
/>

<button
className="bg-red-400 text-white px-6 py-2 rounded hover:bg-red-500"
onClick={handleSignup}
>
Create Account
</button>

<p className="mt-4">
Already have an account?

<Link href="/login" className="ml-2 text-blue-500 hover:underline">
Sign in
</Link>

</p>

</div>

);

}