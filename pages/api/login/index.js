import fs from "fs";
import { sendNovuNotification, generateCode } from "@utils/common";

export default function handler(req, res) {
  const { email, password } = req.body;

  let data = fs.readFileSync("./users.json");
  data = JSON.parse(data);
  let result = data.users.filter(
    (user) => user.email === email && user.password === password
  );

  if (result.length !== 1) {
    return res.json({
      error_message: "Incorrect credentials",
    });
  }
  const code = generateCode();
  let newCode = [];
  newCode.push(code);
  let codeList = {
    code: newCode,
  };

  fs.writeFileSync("./code.json", JSON.stringify(codeList));

  //👇🏻 Send the SMS via Novu
  //sendNovuNotification(result[0].tel, code);

  res.json({
    message: "Login successfully",
    data: {
      username: result[0].username,
    },
  });
}
