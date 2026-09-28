import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found-scene">
      <div className="not-found-shade" aria-hidden="true" />
      <div className="not-found-scanlines" aria-hidden="true" />

      <header className="not-found-brand">
        <Image
          src="/assets/brand/nurbyte-mark.png"
          alt=""
          width={38}
          height={38}
          priority
        />
        <span>
          <strong>
            <b>Nur</b>Byte
          </strong>
          <small>Software Lab &lt;/&gt;</small>
        </span>
      </header>

      <section className="not-found-panel" aria-labelledby="not-found-title">
        <p className="not-found-kicker">ERROR // ROUTE NOT FOUND</p>
        <h1 id="not-found-title">
          <span>4</span>0<span>4</span>
        </h1>
        <h2>
          LOST IN THE <em>ARCHIPELAGO.</em>
        </h2>
        <p className="not-found-copy">
          This route drifted off the map. The signal is gone, but the base camp
          is still online.
        </p>
        <div className="not-found-terminal" aria-hidden="true">
          <div>
            <i />
            <i />
            <i />
            <span>nurbyte@dev: ~ — zsh</span>
          </div>
          <code>
            nurbyte@dev:~$ locate route{"\n"}✗ route_not_found{"\n"}✓ fallback
            available
          </code>
        </div>
        <Link href="/" className="not-found-home">
          ▶ RETURN HOME
        </Link>
      </section>

      <Image
        className="not-found-lady"
        src="/assets/characters/lady/contact-question-full.png"
        alt="Lady waiting by the lost route"
        width={320}
        height={360}
        priority
      />
    </main>
  );
}
