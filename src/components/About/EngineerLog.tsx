const stats = [
  ["01", "PRODUCT ENGINEERING", "From idea and architecture to polished production UI — focused on solving real business problems."],
  ["02", "END-TO-END THINKING", "UX, accessibility, security and maintainable code are part of the product — not afterthoughts."],
  ["03", "INDEPENDENT BUILDER", "Building NurByte products alongside professional software engineering work, from concept to release."],
] as const;

const inventory = ["REACT", "NEXT.JS", "TYPESCRIPT", "ACCESSIBILITY", "SECURITY", "PRODUCT UX"];

export default function EngineerLog() {
  return (
    <div className="about-log" aria-label="Player attributes">
      <div className="about-log-title"><span>ENGINEER.LOG</span><i>● AVAILABLE</i></div>
      {stats.map(([number, title, description]) => (
        <div className="about-stat" key={number}>
          <span>{number}</span>
          <div><b>{title}</b><p>{description}</p></div>
        </div>
      ))}
      <div className="about-inventory" aria-label="Professional strengths">
        {inventory.map((item) => <span key={item}>{item}</span>)}
      </div>
    </div>
  );
}
