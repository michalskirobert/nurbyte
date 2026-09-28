import SceneParallax from "@/components/motion/SceneParallax";
import AboutHeader from "./AboutHeader";
import AboutProfile from "./AboutProfile";
import EngineerLog from "./EngineerLog";
export default function About() {
  return (
    <section
      id="about"
      className="scene about-game interactive-scene"
      aria-labelledby="aboutTitle"
    >
      <div
        className="section-parallax-bg about-parallax-bg"
        aria-hidden="true"
      />
      <div className="about-shade" />
      <div className="about-scanlines" />
      <div className="about-shell scene-content">
        <AboutHeader />
        <div className="about-layout">
          <AboutProfile />
          <EngineerLog />
        </div>
      </div>
      <SceneParallax selector="#about" />
    </section>
  );
}
