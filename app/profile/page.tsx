"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProfilePage(){

const [user,setUser] = useState<any>(null);
const [avatar,setAvatar] = useState<string | null>(null);
const [showOptions,setShowOptions] = useState(false);

const router = useRouter();

useEffect(()=>{

const savedUser = JSON.parse(
localStorage.getItem("currentUser") || "null"
);

if(!savedUser){
router.push("/login");
return;
}

setUser(savedUser);

const savedAvatar = localStorage.getItem(
`avatar_${savedUser.email}`
);

if(savedAvatar){
setAvatar(savedAvatar);
}

},[]);

const handleLogout = () => {

localStorage.removeItem("currentUser");
router.push("/");

};

const handleAvatarChange = (e:any) => {

const file = e.target.files[0];

if(!file) return;

const reader = new FileReader();

reader.onload = () => {

const img = reader.result as string;

setAvatar(img);

localStorage.setItem(
`avatar_${user.email}`,
img
);

};

reader.readAsDataURL(file);

};

if(!user){
return(
<div className="flex items-center justify-center min-h-screen">
Loading...
</div>
);
}

return(

<div className="flex items-center justify-center min-h-screen">

<div className="bg-zinc-900 p-10 rounded-xl shadow-lg w-96 text-center">

{/* AVATAR */}

<div className="relative w-24 h-24 mx-auto mb-6">

{/* NO PHOTO */}

{!avatar && (

<>

<div className="w-24 h-24 rounded-full bg-red-400 flex items-center justify-center text-3xl font-bold">
{user.firstName?.charAt(0)}
</div>

<label className="absolute bottom-0 right-0 cursor-pointer">

<div className="bg-white text-black w-7 h-7 rounded-full flex items-center justify-center text-lg font-bold shadow">
+
</div>

<input
type="file"
accept="image/*"
className="hidden"
onChange={handleAvatarChange}
/>

</label>

</>

)}

{/* PHOTO EXISTS */}

{avatar && (

<img
src={avatar}
onClick={()=>setShowOptions(true)}
className="w-24 h-24 rounded-full object-cover cursor-pointer hover:opacity-80"
/>

)}

</div>

<h1 className="text-2xl font-bold mb-8">
{user.firstName} {user.lastName}
</h1>

<div className="flex flex-col gap-4">

<Link href="/chat">
<button className="w-full bg-red-400 text-white py-3 rounded-lg font-medium hover:bg-red-500 transition">
Start Chat
</button>
</Link>

<Link href="/progress">
<button className="w-full border border-gray-600 py-3 rounded-lg hover:bg-gray-800 transition">
View Progress
</button>
</Link>

<button
onClick={handleLogout}
className="w-full border border-gray-600 py-3 rounded-lg hover:bg-gray-800 transition"
>
Logout
</button>

</div>

{/* AVATAR OPTIONS MODAL */}

{showOptions && (

<div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center">

<div className="bg-zinc-900 p-6 rounded-lg w-72 text-center">

<h2 className="text-lg font-semibold mb-4">
Profile Photo
</h2>

<img
src={avatar!}
className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
/>

<div className="flex flex-col gap-3">

<a
href={avatar!}
target="_blank"
className="bg-red-400 text-white py-2 rounded hover:bg-red-500"
>
View Photo
</a>

<label className="border border-gray-600 py-2 rounded hover:bg-gray-800 cursor-pointer">

Change Photo

<input
type="file"
accept="image/*"
className="hidden"
onChange={(e)=>{
handleAvatarChange(e);
setShowOptions(false);
}}
/>

</label>

<button
onClick={()=>setShowOptions(false)}
className="text-gray-400 text-sm"
>
Cancel
</button>

</div>

</div>

</div>

)}

</div>

</div>

);

}