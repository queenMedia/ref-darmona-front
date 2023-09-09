export const Select = ({ title, data, func, required, className="form-select" }) => {
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
export const GeoSelect = ({ title, data, func, required }) => {
  return (
    <select
      className="form-select"
      onChange={(e) => func(e.target.value)}
      required={required}
    >
      <option>{title}</option>
      {data?.map((i, index) => {
        return (
          <option key={index} value={i}>
            {i.split("/")[0]}
          </option>
        );
      })}
    </select>
  );
};
export const LangSelect = ({ title, data, func, required }) => {
  return (
    <select
      className="form-select"
      onChange={(e) => func(e.target.value)}
      required={required}
    >
      <option>{title}</option>
      {data?.map((i, index) => {
        return (
          <option key={index} value={i}>
            {i.split("/")[1]}
          </option>
        );
      })}
    </select>
  );
};
