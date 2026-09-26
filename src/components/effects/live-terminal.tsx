"use client";
import {useEffect,useState} from "react";

const commands=[
  "git status",
  "git add .",
  'git commit -m "feat: ship something useful"',
  'git commit --amend -m "feat: ship something better"',
  "git push --force-with-lease"
];

export function LiveTerminal(){
  const [lines,setLines]=useState<string[]>([]);
  const [current,setCurrent]=useState("");
  const [commandIndex,setCommandIndex]=useState(0);
  const [charIndex,setCharIndex]=useState(0);
  useEffect(()=>{
    const reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if(reduce){setLines(commands);setCurrent("");return;}
    const command=commands[commandIndex];
    if(charIndex<command.length){const t=window.setTimeout(()=>{setCurrent(command.slice(0,charIndex+1));setCharIndex(v=>v+1)},36+Math.random()*45);return()=>window.clearTimeout(t)}
    const t=window.setTimeout(()=>{setLines(prev=>[...prev.slice(-3),command]);setCurrent("");setCharIndex(0);setCommandIndex(v=>(v+1)%commands.length)},650);
    return()=>window.clearTimeout(t)
  },[commandIndex,charIndex]);
  return <div className="live-terminal" aria-label="Animated Git terminal">
    <div className="live-terminal__bar"><span/><span/><span/><b>nurbyte — zsh</b></div>
    <div className="live-terminal__body">{lines.map((line,i)=><div key={`${line}-${i}`}><em>➜</em> <strong>nurbyte</strong> <code>{line}</code></div>)}<div><em>➜</em> <strong>nurbyte</strong> <code>{current}</code><i className="terminal-cursor"/></div></div>
  </div>
}
