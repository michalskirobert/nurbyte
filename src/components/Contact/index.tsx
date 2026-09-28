import SceneParallax from "@/components/motion/SceneParallax";
import ContactForm from "./ContactForm";
import ContactHeader from "./ContactHeader";
import ContactLady from "./ContactLady";
export default function Contact() {
  return (
    <section id="contact" className="scene contact-game interactive-scene">
      <div
        className="section-parallax-bg contact-parallax-bg"
        aria-hidden="true"
      />
      <div className="contact-shade" />
      <div className="contact-scanlines" />
      <div className="contact-shell scene-content">
        <ContactHeader />
        <div className="contact-layout">
          <ContactForm />
          <ContactLady />
        </div>
      </div>
      <SceneParallax selector="#contact" />
    </section>
  );
}
