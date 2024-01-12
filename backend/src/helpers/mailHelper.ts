import { createTransport } from "nodemailer";
import fs from "fs";
import path from "path";
import Handlebars from "handlebars";

import config from "../config";
import { IMail } from "../interfaces/mailInterface";

const appDir = path.dirname(require.main!.filename);
const pathToTemplate = path.join(appDir, "./emailTemplate");

const transporter = createTransport({
  service: "gmail",
  auth: {
    user: config.mail.user,
    pass: config.mail.password,
  },
});

export const sendMail = (data: IMail) => {
  const templateContent = fs.readFileSync(
    `${pathToTemplate}/addTeamTemplate.hbs`,
    "utf-8"
  );
  const compiledTemplate = Handlebars.compile(templateContent);
  const mailOptions = {
    from: config.mail.user,
    to: data.email,
    html: compiledTemplate(data),
  };
  console.log("mailOptions", mailOptions);
  // change credentials before uncomment
  transporter.sendMail(mailOptions, (error, response) => {
    if (error) {
      //error
      console.log("mailerror", { error });
    } else {
      //success
      console.log("success");
    }
  });

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
