import "./input.css"

export const Input = ({
    type,
    handleChange,
    defValue,
    required,
    placeholder,
    param = undefined
}) => {

    const onChange = (e) => {
        const value = e.target.value;
        if (param !== undefined) {
            handleChange(param, value);
        } else {
            handleChange(value);
        }
    };

    return (
        <input
            type={type}
            onChange={onChange}
            value={defValue}
            required={required}
            placeholder={placeholder}
        />
    );
};
