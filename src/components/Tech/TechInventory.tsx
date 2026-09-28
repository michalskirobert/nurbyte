import type { Technology } from "./types";

type Props = {
  items: Technology[];
  selected: number;
  onSelect: (index: number) => void;
};

export default function TechInventory({ items, selected, onSelect }: Props) {
  return (
    <div className="tech-inventory" aria-label="Technology inventory">
      {items.map((item, index) => (
        <button
          key={`${item.name}-${index}`}
          className={`tech-slot${selected === index ? " selected" : ""}`}
          type="button"
          aria-label={item.name}
          title={item.name}
          onClick={() => onSelect(index)}
          onMouseOver={() => onSelect(index)}
          onFocus={() => onSelect(index)}
        >
          {/* External Simple Icons URL is intentionally kept exactly as in the HTML master. */}
          <img
            src={`https://cdn.simpleicons.org/${item.icon}/${item.color}`}
            alt=""
          />
          <span>{String(index + 1).padStart(2, "0")}</span>
        </button>
      ))}
    </div>
  );
}
