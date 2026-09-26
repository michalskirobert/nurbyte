import Link from "next/link"; import type {ReactNode} from "react";
export function PixelButton({href,children,variant="primary",external=false}:{href:string;children:ReactNode;variant?:"primary"|"ghost";external?:boolean}){return <Link className={`pixel-button pixel-button--${variant}`} href={href} target={external?"_blank":undefined} rel={external?"noreferrer":undefined}>{children}</Link>}
