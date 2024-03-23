"use client"
import Image from "next/image";
import React,{useEffect} from "react";
import Navbar from "./components/navbar";
import "./home.css"
import Top from "./components/top";
import { useAccount,useReadContract } from 'wagmi';
import { useRouter } from 'next/navigation'
import ABI from './components/abi.json'

export default function Home() {
  const {isConnected,address}=useAccount();
  const router =useRouter();
  const data = useReadContract({
    address: '0x0fC27a307E40D7DF874Ac0Fdc08880950B97A20a',
    abi: ABI,
    functionName: 'isUserRegistered',
    args: [address],
});
const r = useReadContract({
  address: '0x0fC27a307E40D7DF874Ac0Fdc08880950B97A20a',
  abi: ABI,
  functionName: 'viewOwnProfile',
  account:[address],
});
console.log(r)
  useEffect(() => {
    if (isConnected) {
        router.push('/Dashboard');
    }
}, [isConnected, router]);
  return (
<body>
  <Image src={'/BG1.png'} className="bgimage" height={10000} width={10000}/>
  <Navbar/>
  <Top/>
  
</body>
  );
}
