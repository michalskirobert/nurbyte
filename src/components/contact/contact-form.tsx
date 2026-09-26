"use client";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { RefreshCw, Send } from "lucide-react";
import { InputField, TextareaField } from "@/components/ui/form-field";
const schema = z.object({
  name: z.string().min(2, "Enter at least 2 characters"),
  email: z.string().email("Enter a valid email"),
  message: z.string().min(10, "Enter at least 10 characters"),
  captcha: z.string().min(4, "Enter the code from the image"),
});
type FormData = z.infer<typeof schema>;
export function ContactForm() {
  const [captcha, setCaptcha] = useState<{
    image: string;
    token: string;
  } | null>(null);
  const [status, setStatus] = useState<string>("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });
  const load = useCallback(async () => {
    const r = await fetch("/api/captcha", { cache: "no-store" });
    setCaptcha(await r.json());
  }, []);
  useEffect(() => {
    void load();
  }, [load]);
  const submit = async (data: FormData) => {
    setStatus("");
    const r = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, captchaToken: captcha?.token }),
    });
    const body = await r.json();
    if (!r.ok) {
      setStatus(body.error ?? "Transmission failed.");
      await load();
      return;
    }
    reset();
    setStatus("MESSAGE SENT // TRANSMISSION COMPLETE");
    await load();
  };
  return (
    <form className="contact-form" onSubmit={handleSubmit(submit)}>
      <div className="form-grid">
        <InputField
          label="NAME / CALLSIGN"
          {...register("name")}
          error={errors.name?.message}
        />
        <InputField
          label="EMAIL / RETURN CHANNEL"
          type="email"
          {...register("email")}
          error={errors.email?.message}
        />
      </div>
      <TextareaField
        label="MESSAGE / PAYLOAD"
        rows={6}
        {...register("message")}
        error={errors.message?.message}
      />
      <div className="captcha-row">
        <div className="captcha-image">
          {captcha ? (
            <img src={captcha.image} alt="CAPTCHA challenge" />
          ) : (
            <span>LOADING...</span>
          )}
          <button
            type="button"
            onClick={() => void load()}
            aria-label="Refresh CAPTCHA"
          >
            <RefreshCw size={18} />
          </button>
        </div>
        <InputField
          label="SECURITY CODE"
          autoComplete="off"
          {...register("captcha")}
          error={errors.captcha?.message}
        />
      </div>
      <button className="submit" disabled={isSubmitting || !captcha}>
        {isSubmitting ? "TRANSMITTING..." : "SEND MESSAGE"} <Send size={17} />
      </button>
      {status && <p className="form-status">{status}</p>}
    </form>
  );
}
