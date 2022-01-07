export default function Input({ type, palc, name, value, onchange }) {
  return (
    <input
      type={type}
      placeholder={palc}
      name={name}
      value={value}
      onChange={(e) => onchange(e)}
      className="input-name"
    />
  );
}
