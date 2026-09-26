"use client";
import {motion} from "framer-motion";
import type {ReactNode} from "react";
import {SceneArt} from "./scene-art";

export function SceneSection({id,variant,className="",children}:{id:string;variant:"projects"|"tech"|"about"|"contact";className?:string;children:ReactNode}){
 return <motion.section id={id} className={`game-section ${className}`} initial="hidden" whileInView="show" viewport={{amount:.38}} variants={{hidden:{opacity:.55},show:{opacity:1}}} transition={{duration:.55}}>
   <SceneArt variant={variant}/>
   <motion.div className="game-section__inner" variants={{hidden:{opacity:0,y:55},show:{opacity:1,y:0}}} transition={{duration:.72,ease:[.2,.8,.2,1]}}>{children}</motion.div>
 </motion.section>
}
