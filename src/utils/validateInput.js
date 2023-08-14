export const validateLettersOnly = (inputValue) => {
  const regex = /^[a-zA-Z]+$/;
  let lettersOnlyValue;
  if (!regex.test(inputValue) && inputValue !== "") {
    lettersOnlyValue = inputValue.replace(/[^a-zA-Z]/g, "");
  } else {
    lettersOnlyValue = inputValue;
  }
  return lettersOnlyValue;
};