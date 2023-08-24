export const Select = ({title, data, func, required}) => {
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
            {i}
          </option>
        );
      })}
    </select>
  );
};
