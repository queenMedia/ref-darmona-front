import "./select.css"

export const Select = ({ title, data, func, required, className = "form-select" }) => {
  return (
    <select
      className={className}
      onChange={(e) => func(e.target.value)}
      required={required}
    >
      <option value="" disabled selected>{title}</option>
      {data?.map((i, index) => {
        return (
          <option key={index} value={i}>
            {i}
          </option>
        );
      })}
    </select>
  );
};