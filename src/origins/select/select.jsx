import "./select.css"

export const Select = ({ title, data, func, required, className = "form-select", customOption = undefined, customOptionText = undefined }) => {
  return (
    <select
      className={className}
      onChange={(e) => func(e.target.value)}
      required={required}
    >
      <option value="" disabled selected>{title}</option>
      {customOption && <option value={customOption} >{customOptionText}</option>}
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
export const ComplexSelect = ({ title, data, func, required, className = "form-select", customOption = undefined, customOptionText = undefined }) => {
  return (
    <select
      className={className}
      onChange={(e) => func(e.target.value)}
      required={required}
    >
      <option value="" disabled selected>{title}</option>
      {customOption && <option value={customOption} >{customOptionText}</option>}
      {data?.map((i, index) => {
        return (
          <option key={index} value={i.code}>
            {i.name}
          </option>
        );
      })}
    </select>
  );
};