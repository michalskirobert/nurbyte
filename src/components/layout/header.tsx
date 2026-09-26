"use client";
import Image from "next/image";
import {useState} from "react";
import {Menu,X} from "lucide-react";
const links=[["HOME","#home"],["PROJECTS","#projects"],["ABOUT","#about"],["TECH","#tech"],["CONTACT","#contact"]];
export function Header(){const [open,setOpen]=useState(false);return <header className="header"><a className="brand" href="#home" aria-label="NurByte Software Lab home"><Image src="/nurbyte-logo.png" alt="NurByte Software Lab" width={198} height={82} priority/></a><nav>{links.map(([l,h])=><a key={h} href={h}>{l}</a>)}</nav><span className="online">● ONLINE</span><button className="menu-button" onClick={()=>setOpen(v=>!v)} aria-expanded={open} aria-label="Toggle navigation">{open?<X/>:<Menu/>}</button>{open&&<div className="mobile-menu">{links.map(([l,h],i)=><a key={h} href={h} onClick={()=>setOpen(false)}><small>0{i+1}</small>{l}</a>)}<span>// BUILD · EXPLORE · SHIP</span></div>}</header>}
