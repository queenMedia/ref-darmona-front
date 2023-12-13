import "./input.css"

export const Input = ({
    type,
    handleChange,
    handleClick = () => { },
    defValue,
    required,
    placeholder,
    param = undefined,
    disable = false,
    width = undefined
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
            onClick={handleClick}
            type={type}
            onChange={onChange}
            value={defValue}
            required={required}
            placeholder={placeholder}
            disable={disable}
            style={{ width: width }}
        />
    );
};
