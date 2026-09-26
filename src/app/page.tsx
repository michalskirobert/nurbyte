import type {CSSProperties} from "react";
import Image from "next/image";
import {Header} from "@/components/layout/header";
import {Hero} from "@/components/hero/hero";
import {ProjectCard} from "@/components/projects/project-card";
import {ContactForm} from "@/components/contact/contact-form";
import {SceneSection} from "@/components/effects/scene-section";
import {projects} from "@/data/projects";

const tech=["React","Next.js","TypeScript","Node.js","MongoDB","PostgreSQL","Docker","Git","Tailwind","MUI"];
export default function Home(){return <><Header/><Hero/>
<SceneSection id="projects" variant="projects" className="projects-v4"><p className="eyebrow">// FEATURED PROJECTS</p><h2 className="section__title">PROJECTS.</h2><p className="section-intro">Real tools. Real solutions.<br/>Built for everyday life.</p><div className="project-grid">{projects.map((p,i)=><ProjectCard key={p.slug} project={p} index={i}/>)}</div><article className="coming-card"><b>?</b><div><h3>MORE TO COME</h3><p>New tools and ideas are always in progress.</p></div></article></SceneSection>
<SceneSection id="tech" variant="tech" className="tech-v4"><div className="tech-layout"><div><p className="eyebrow">// TECH STACK</p><h2 className="section__title">TECHNOLOGIES<br/><span>I WORK WITH.</span></h2><div className="tech-grid">{tech.map((x,i)=><span key={x} style={{"--i":i} as CSSProperties}>{x}</span>)}</div></div><div className="stack-terminal"><div className="stack-terminal__title">$ nurbyte --stack</div><p><b>Frontend</b> React, Next.js, TypeScript</p><p><b>Backend</b> Node.js, Express</p><p><b>Database</b> MongoDB, PostgreSQL</p><p><b>Tools</b> Docker, Electron, Git</p><p><b>Design</b> Tailwind, MUI</p><p><b>More</b> ... always learning</p></div></div></SceneSection>
<SceneSection id="about" variant="about" className="about-v4"><p className="eyebrow">// ABOUT</p><h2 className="section__title">MORE THAN<br/><span>JUST CODE.</span></h2><p className="about-copy">NurByte is my independent software lab — a place where technology meets purpose, creativity and exploration. Products are shaped by real engineering work, travel and a perspective stretching from Europe to Indonesia.</p><a className="about-cta" href="#contact">LEARN MORE ABOUT ME →</a></SceneSection>
<SceneSection id="contact" variant="contact" className="contact-v4"><p className="eyebrow">// GET IN TOUCH</p><h2 className="section__title">LET&apos;S BUILD<br/><span>SOMETHING GREAT.</span></h2><div className="contact-layout"><div><p className="contact-copy">Have an idea, a product or just want to say hello? Send a transmission.</p><p className="terminal-note">SECURE_CHANNEL: CAPTCHA ENABLED<br/>STATUS: ACCEPTING MESSAGES<br/>REGION: EUROPE / SE ASIA</p></div><ContactForm/></div></SceneSection>
<footer><Image src="/nurbyte-logo.png" alt="NurByte Software Lab" width={198} height={82}/><nav><a href="#home">Home</a><a href="#projects">Projects</a><a href="#about">About</a><a href="#tech">Tech</a><a href="#contact">Contact</a></nav><span>© {new Date().getFullYear()} NurByte</span></footer></>}
