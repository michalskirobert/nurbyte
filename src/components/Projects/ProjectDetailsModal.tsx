"use client";
import Image from "next/image";import {useEffect} from "react";import type {Project} from "./types";
export default function ProjectDetailsModal({project,onClose}:{project:Project|null;onClose:()=>void}){
 useEffect(()=>{if(!project)return;const key=(e:KeyboardEvent)=>e.key==="Escape"&&onClose();addEventListener("keydown",key);document.body.style.overflow="hidden";return()=>{removeEventListener("keydown",key);document.body.style.overflow=""}},[project,onClose]);
 if(!project)return null;
 return <div className="arcade-modal-backdrop" role="presentation" onMouseDown={e=>e.target===e.currentTarget&&onClose()}>
  <section className="arcade-modal" role="dialog" aria-modal="true" aria-labelledby="projectModalTitle">
   <div className="arcade-modal-bar"><span>PROJECT_DATA.EXE</span><button onClick={onClose} aria-label="Close">×</button></div>
   {project.image&&<div className="arcade-modal-art"><Image src={project.image} alt="" fill sizes="(max-width:760px) 92vw,760px" style={{objectFit:"cover"}}/></div>}
   <div className="arcade-modal-body"><div className="project-meta"><span>{project.type}</span><i>{project.status}</i></div><h3 id="projectModalTitle">{project.name}</h3><p>{project.details??project.description}</p><div className="project-tech">{project.tech.map(x=><span key={x}>{x}</span>)}</div>
    <div className="arcade-modal-actions">{project.url?<a className="btn primary" href={project.url} target={project.external?"_blank":undefined} rel={project.external?"noreferrer":undefined}>{project.actionLabel??"▶ OPEN PROJECT"}</a>:<span className="btn ghost disabled-action">{project.id==="hosts-editor"?"GITHUB RELEASE URL REQUIRED":"◆ LOCKED"}</span>}<button className="btn ghost" onClick={onClose}>ESC / CLOSE</button></div>
   </div>
  </section>
 </div>
}
