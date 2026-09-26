import type {InputHTMLAttributes,TextareaHTMLAttributes} from "react";
export function InputField({label,error,...props}:InputHTMLAttributes<HTMLInputElement>&{label:string;error?:string}){return <label className="field"><span>{label}</span><input {...props}/>{error&&<small>{error}</small>}</label>}
export function TextareaField({label,error,...props}:TextareaHTMLAttributes<HTMLTextAreaElement>&{label:string;error?:string}){return <label className="field"><span>{label}</span><textarea {...props}/>{error&&<small>{error}</small>}</label>}
