import AmbientWorld from "./AmbientWorld";
import HeroCharacters from "./HeroCharacters";
import HeroContent from "./HeroContent";
import HeroTerminal from "./HeroTerminal";
import HomeEffects from "./HomeEffects";
import HomeStatus from "./HomeStatus";

export default function Home() {
  return (
    <section id="home" className="scene hero" data-scene="home">
      <AmbientWorld />
      <HomeStatus />
      <div className="shade" />
      <div className="ambient" />
      <HeroContent />
      <HeroTerminal />
      <HeroCharacters />
      <a className="scroll-hint" href="#projects">SCROLL TO EXPLORE <span>⌄</span></a>
      <HomeEffects />
    </section>
  );
}
