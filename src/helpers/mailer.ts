import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    // create a hashed token
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 900000,
      });
    }

    // var transport = nodemailer.createTransport({
    //   host: "sandbox.smtp.mailtrap.io",
    //   port: 2525,
    //   auth: {
    //     user: process.env.MAILTRAP_USER,
    //     pass: process.env.MAILTRAP_PASS,
    //   },
    // });

    // const verifyUrl = `${process.env.domain}/verify-email?token=${hashedToken}`;
    // const resetUrl = `${process.env.domain}/forgot-password/check?token=${hashedToken}`;

    // const mailOptions = {
    //   from: "hitesh@gmail.com",
    //   to: email,
    //   subject:
    //     emailType === "VERIFY" ? "Verify your email" : "Reset your password",
    //   html: `<p>Click <a href=${emailType === "VERIFY" ? verifyUrl : resetUrl}>here</a> to ${
    //     emailType === "VERIFY" ? "verify your email" : "reset your password"
    //   }
    //         or copy and paste the link below in your browser. <br> ${
    //           process.env.domain
    //         }/verify-email?token=${hashedToken}
    //         </p>`,
    // };

    // const mailResponse = await transport.sendMail(mailOptions);
    // return mailResponse;
    return true;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
