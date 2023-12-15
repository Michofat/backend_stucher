import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "iwillmichofat@gmail.com",
    pass: "chfygbtazihukgrx",
  },
});

const sendMail = (email, phonenumber, activationCode) => {
  const mailOptions = {
    from: "info@iWill.com",
    to: email,
    subject: "activation code",
    text: `${phonenumber} registered with the code ${activationCode}. `,
  };
  return mailOptions;
};

export const sendActivationEmail = (email, phonenumber, activationCode) => {
  return new Promise((resolve, reject) => {
    transporter.sendMail(
      sendMail(email, phonenumber, activationCode),
      (error, info) => {
        if (error) {
          reject(error);
        } else {
          resolve(info.response);
        }
      }
    );
  });
};
