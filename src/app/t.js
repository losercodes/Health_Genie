"use client"
import Image from "next/image";
import Link from "next/link";
import React,{useState} from "react";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { useStorageUpload } from "@thirdweb-dev/react";
import CryptoJS from 'crypto-js';
import { useAccount } from "wagmi";
import { PDFDocument, rgb } from 'pdf-lib';
import { saveAs } from 'file-saver';

export default function H() {
  
  const { mutateAsync: upload } = useStorageUpload();
  const [file, setFile] = useState(null);
  const [uploadedUrl, setUploadedUrl] = useState("");
  const [encryptedFile, setEncryptedFile] = useState(null);
  const [decryptedFile, setDecryptedFile] = useState(null);
  const {isConnected,address} = useAccount();
  const [pdfBytes, setPdfBytes] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const encryptFile = (file) => {
    const reader = new FileReader();
    reader.onload = function (e) {
      const encryptedData = CryptoJS.AES.encrypt(e.target.result, address);
      setEncryptedFile(encryptedData.toString());
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file");
      return;
    }
encryptFile(file);
console.log(encryptedFile);
    try {
      const uris = await upload({
        data: [encryptedFile],
        options: { uploadWithGatewayUrl: false, uploadWithoutDirectory: true },
      });
      setUploadedUrl((uris[0].replace("ipfs://", "")));
      console.log((uris[0].replace("ipfs://", "")));
    } catch (error) {
      console.error('Error uploading file: ', error);
      alert("Error uploading file. Please try again.");
    }
  };
  
  const decryptFile = (encryptedData) => {
    const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, address);
    const decryptedData = decryptedBytes.toString(CryptoJS.enc.Utf8);
    setDecryptedFile(decryptedData);
  };
  const convertToPdf = () => {
    if (!decryptedFile) {
      alert("No decrypted file data available");
      return;
    }
    // Remove the data:application/pdf;base64, prefix
    const base64Data = decryptedFile.replace(/^data:application\/pdf;base64,/, '');
    // Convert base64 to binary
    const binaryString = window.atob(base64Data);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    // Create Blob
    const blob = new Blob([bytes], { type: 'application/pdf' });
    // Save the Blob as a PDF file
    window.open(URL.createObjectURL(blob), '_blank');
    //saveAs(blob, 'decrypted_file.pdf');
  };
  const handleDecrypt = () => {
    decryptFile(encryptedFile);
    
  };
  return (
    <main >
        <input type="file" accept="application/pdf" onChange={handleFileChange}/><button onClick={handleUpload}>upload</button>
        <p>{uploadedUrl}</p>
        <Link href={`https://ipfs.io/ipfs/${uploadedUrl}`} target="_blank">view</Link>
        <br/>
        <iframe src={`https://ipfs.io/ipfs/${uploadedUrl}`} height={1000} width={100}/>
        <br/>
        <button onClick={handleDecrypt}>dec</button>
        <p>{decryptedFile}</p>
        <button onClick={convertToPdf}>Convert to PDF</button>
    </main>
  );
}
