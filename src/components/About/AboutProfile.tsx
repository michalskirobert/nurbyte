export default function AboutProfile() {
  return (
    <article className="about-profile">
      <span className="about-card-label">PLAYER 01 // SOFTWARE ENGINEER</span>
      <h3>
        ENGINEER.
        <br />
        <em>PRODUCT THINKER.</em>
        <br />
        BUILDER.
      </h3>
      <p>
        I design and build production-ready web applications, SaaS products and
        developer tools — combining maintainable engineering with product
        thinking, accessibility and a strong focus on the people who actually
        use the software.
      </p>
      <div className="about-location about-professional-meta">
        <span>WORK MODE</span>
        <b>REMOTE</b>
        <i>•</i>
        <span>FOCUS</span>
        <b>PRODUCT ENGINEERING</b>
      </div>
      <div className="about-actions">
        <a href="#projects" className="btn primary">
          ▶ VIEW PROJECTS
        </a>
      </div>
    </article>
  );
}
