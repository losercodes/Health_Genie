"use client"
import Image from "next/image";
import Navbar from "../components/navbar";
import React,{useEffect} from "react";
import { useAccount,useReadContract } from 'wagmi';
import ABI from '../components/abi.json'
import { useRouter } from 'next/navigation'
import "./dsh.css";
export default function Dashboard() {
  const {isConnected,address}=useAccount();
  const router =useRouter();
  useEffect(() => {
    if (!isConnected) {
        router.push('/');
    }
}, [isConnected, router]);

const {data} = useReadContract({
  address: '0x0fC27a307E40D7DF874Ac0Fdc08880950B97A20a',
  abi: ABI,
  functionName: 'isUserRegistered',
  args: [address],
});
console.log("hi",data)
  return (
<div className="body">
<Image src={'/BG2.png'} className="bg2image" height={10000} width={10000}/>
  <Navbar/>
</div>
  );
}
