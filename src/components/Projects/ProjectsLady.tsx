"use client";
import Image from "next/image";
import {useEffect,useRef,useState} from "react";
type Mood="idle"|"question"|"surprised"|"heart"|"happy";
const frame:Record<Mood,string>={
 idle:"nav-idle.png",question:"nav-question.png",surprised:"nav-surprised.png",
 heart:"nav-heart.png",happy:"nav-happy.png"
};
export default function ProjectsLady(){
 const [mood,setMood]=useState<Mood>("idle");
 const [label,setLabel]=useState("SELECT!");
 const timer=useRef<ReturnType<typeof setTimeout>|null>(null);
 useEffect(()=>{
   const cards=[...document.querySelectorAll<HTMLElement>("#projects .project-rail-card")];
   const listeners=cards.map(card=>{
     const enter=()=>{const locked=card.classList.contains("locked");setMood(locked?"surprised":"question");setLabel(locked?"LOCKED?!":"THIS ONE?");};
     const leave=()=>{setMood("idle");setLabel("SELECT!");};
     card.addEventListener("mouseenter",enter);card.addEventListener("mouseleave",leave);
     return {card,enter,leave};
   });
   return()=>listeners.forEach(x=>{x.card.removeEventListener("mouseenter",x.enter);x.card.removeEventListener("mouseleave",x.leave);});
 },[]);
 const click=()=>{
   if(timer.current)clearTimeout(timer.current);
   setMood("heart");setLabel("WOOF! ♥");
   timer.current=setTimeout(()=>{setMood("happy");setLabel("SELECT!");},1300);
 };
 return <button type="button" className="projects-lady projects-lady-button" onClick={click}
   onMouseEnter={()=>{if(mood!=="heart"){setMood("question");setLabel("SELECT?");}}}
   onMouseLeave={()=>{if(mood!=="heart"){setMood("idle");setLabel("SELECT!");}}}
   aria-label="Lady">
   <Image src={`/assets/characters/lady/${frame[mood]}`} alt="Lady" width={96} height={96} style={{width:"auto",height:"auto"}}/>
   <span>{label}</span>
 </button>;
}
