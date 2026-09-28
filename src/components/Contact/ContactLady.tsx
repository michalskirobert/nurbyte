"use client";
import Image from "next/image";
import {useRef,useState} from "react";
type Mood="sit"|"question"|"heart"|"happy";
const frames:Record<Mood,string>={sit:"contact-sit.png",question:"nav-question.png",heart:"nav-heart.png",happy:"nav-happy.png"};
export default function ContactLady(){
 const [mood,setMood]=useState<Mood>("sit");const timer=useRef<ReturnType<typeof setTimeout>|null>(null);
 const click=()=>{if(timer.current)clearTimeout(timer.current);setMood("heart");timer.current=setTimeout(()=>setMood("happy"),1200)};
 return <button type="button" className="contact-lady" onMouseEnter={()=>mood==="sit"&&setMood("question")} onMouseLeave={()=>mood==="question"&&setMood("sit")} onClick={click} aria-label="Say hello to Lady">
  <Image src={`/assets/characters/lady/${frames[mood]}`} alt="Lady" width={180} height={180} style={{width:"auto",height:"auto"}}/>
  <span>{mood==="heart"?"WOOF! ♥":mood==="question"?"HELLO?":"NEED A DEVELOPER?"}</span>
 </button>
}
