import fs from "fs";
import { generateID } from "@utils/common";

export default function handler(req, res) {
  //👇🏻 Get the user's credentials
  const { email, password, tel, username } = req.body;
  //👇🏻 Checks if there is an existing user with the same email or password
  let data = fs.readFileSync("./users.json");
  console.log(data);
  data = JSON.parse(data);
  console.log(data);
  let result = data.users.filter(
    (user) => user.email === email || user.tel === tel
  );

  //👇🏻 if none
  if (result.length === 0) {
    //👇🏻 creates the structure for the user
    const newUser = { id: generateID(), email, password, username, tel };
    //👇🏻 Adds the user to the array of users
    let newData = [];
    newData.push(newUser);
    console.log(newData);

    let usersList = {
      users: [...data.users, newData[0]],
    };

    fs.writeFileSync("./users.json", JSON.stringify(usersList));

    //👇🏻 Returns a message
    return res.json({
      message: "Account created successfully!",
    });
  }
  //👇🏻 Runs if a user exists
  res.json({
    error_message: "User already exists",
  });
}
