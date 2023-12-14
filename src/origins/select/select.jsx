import "./select.css"

export const Select = ({ title, data, func, required, className = "form-select", customOption = undefined, customOptionText = undefined }) => {

  const sortedData = [...data].sort();
  return (
    <select
      className={className}
      onChange={(e) => func(e.target.value)}
      required={required}
      defaultValue={""}
    >
      <option value="" disabled >{title}</option>
      {customOption && <option value={customOption} >{customOptionText}</option>}
      {sortedData?.map((i, index) => {
        return (
          <option key={index} value={i}>
            {i}
          </option>
        );
      })}
    </select>
  );
};
export const SelectWithFuncParam = ({ title, data, func, funcParam, required, className = "form-select", customOption = undefined, customOptionText = undefined }) => {
  return (
    <select
      className={className}
      onChange={(e) => func(funcParam, e.target.value,)}
      required={required}
      defaultValue={""}
    >
      <option value="" disabled >{title}</option>
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
      defaultValue={""}
    >
      <option value="" disabled >{title}</option>
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