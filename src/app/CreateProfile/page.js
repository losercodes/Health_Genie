"use client"
import Image from "next/image";
import Navbar from "../components/navbar";
import React,{useEffect,useState} from "react";
import { useAccount,useWriteContract } from 'wagmi';
import { useRouter } from 'next/navigation'
import ABI from '../components/abi.json'
import "./cp.css";
export default function CreateProfile() {


  const {isConnected,address}=useAccount();


const { write: createUserProfile } = useWriteContract({
    address: '0x0fC27a307E40D7DF874Ac0Fdc08880950B97A20a',
    abi: ABI,
    functionName: 'createUserProfile',
  });


  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [bloodType, setBloodType] = useState('');
  const [dob, setDOB] = useState('');
  const [allergies, setAllergies] = useState('');

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await createUserProfile(name, age, bloodType, dob, allergies);
      console.log(data);
      console.log("Submitted:", { name, age, bloodType, dob, allergies });
      setName('');
      setAge('');
      setBloodType('');
      setDOB('');
      setAllergies('');
    } catch (error) {
      console.error("Failed to write to contract:", error);
    }
  };
  
  return (
<div className="body-profile">
<form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Age:</label>
          <input type="number" value={age} onChange={(e) => setAge(e.target.value)} required />
        </div>
        <div>
          <label>Blood Type:</label>
          <input type="text" value={bloodType} onChange={(e) => setBloodType(e.target.value)} required />
        </div>
        <div>
          <label>Date of Birth (DOB):</label>
          <input type="date" value={dob} onChange={(e) => setDOB(e.target.value)} required />
        </div>
        <div>
          <label>Allergies:</label>
          <textarea value={allergies} onChange={(e) => setAllergies(e.target.value)} required />
        </div>
        <button type="submit">Submit</button>
      </form>

</div>
  );
}
