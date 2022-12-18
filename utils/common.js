const { Novu } = require("@novu/node");
const novu = new Novu(process.env.NOVU_API_KEY);

export const users = [];
export const generateID = () => Math.random().toString(36).substring(2, 10);
export const generateCode = () => {
  // Declare a string variable
  // which stores all string
  var string = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let OTP = "";

  // Find the length of string
  var len = string.length;
  for (let i = 0; i < 5; i++) {
    OTP += string[Math.floor(Math.random() * len)];
  }
  return OTP;
};

export const sendNovuNotification = async (recipient, verificationCode) => {
  try {
    let response = await novu.trigger("sendsms", {
      to: {
        subscriberId: `+91${recipient}`,
        phone: `+91${recipient}`,
      },
      payload: {
        code: verificationCode,
      },
    });
    console.log(response);
  } catch (err) {
    console.error(err);
  }
};
