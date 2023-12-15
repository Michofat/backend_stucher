export const randomNumber = () => {
  const randomNumber = Math.floor(Math.random() * 9000) + 1000;
  return randomNumber;
};

export const validatePhoneNumber = (phoneNumber) => {
  const cleanedNumber = phoneNumber.replace(/\D/g, "");

  const isValid = /^234[789]\d{9}$/.test(cleanedNumber);

  return isValid;
};
