"use client"
import Image from "next/image";
import Link from "next/link";
import "./navbar.css";
import React,{useState,useEffect} from 'react'
import {
  useConnectModal,
  useAccountModal,
} from '@rainbow-me/rainbowkit';
import { useAccount,useReadContract } from 'wagmi';

import ABI from '../components/abi.json'
import { useRouter } from 'next/navigation'

export default function Navbar() {
  const {isConnected,address}=useAccount();
  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();
  const router =useRouter();
  
  const {data:isUserRegistered} = useReadContract({
    address: '0x0fC27a307E40D7DF874Ac0Fdc08880950B97A20a',
    abi: ABI,
    functionName: 'isUserRegistered',
    args: [address],
});
console.log("hi",isUserRegistered)
useEffect(() => {
  if (isUserRegistered==false) {
      router.push('/CreateProfile');
  }
}, [isConnected, router]);
  return (

<div className="navbar">
    <div className="image-cont">
      <Image src={"/hg.png"} className="img" height={1000} width={1000}/>
    </div>
    <div className="menu-bar">
      
      {!isConnected ? <button className="wallet" onClick={openConnectModal}>
        Connect Wallet
      </button>:<div className="menu-button">
      <Link href="./Dashboard"><p className="bhome">Home</p></Link>
      <Link href="./MyProfile"><p className="bhome">My Profile</p></Link>
      <button className="wallet" onClick={openAccountModal}>
        Disconnect
      </button>
        </div>}
    </div>
</div>
  );
}
