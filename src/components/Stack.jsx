import "../assets/css/stack.css";
import Skills from "../data/skills.json";


export default function Stack() {

  const tools = Skills.skills;

  return (
    <section id="stack" className="stack__content optimized">
      <div className="stack__container">
        <h2 className="stack__title">Stack</h2>
        <ul className="stack__list">
          {tools.map((tool, index) => (
            <li key={index} className="stack__tool">
              <img
                src={`/images/logos/${tool}.svg`}
                loading="lazy"
                title={`${tool}`}
                alt={`${tool}`}
                width="48px"
                height="48px"
              />
              <span className="stack__tool__description--hidden">{`${tool}`}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
