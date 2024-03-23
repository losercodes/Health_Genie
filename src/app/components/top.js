import Image from "next/image";
import Link from "next/link";

import "./top.css";

export default function Top() {
  return (

<div className="top">
    <div className="timage-cont">
        <Image src={"/doc.png"} className="timg" height={1000} width={1000}/>
    </div>
    <div className="top-text">
    🌟 Hello there! I'm your dedicated health assistant here to guide you on your wellness journey. Whether you're looking to boost your fitness, improve your diet, or stay motivated, I'm here to help every step of the way.
    </div>
</div>
  );
}
