import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";
import { connect } from "@/database/dbconfig";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email } = reqBody;

    console.log(reqBody);

    //check if user already exists
    const user = await User.findOne({ email }).select("-password");

    if (!user) {
      return NextResponse.json(
        { error: "User Not found" },
        { status: 400 }
      );
    }
    
    //send verification email
    await sendEmail({ email, emailType: "RESET", userId: user._id });

    return NextResponse.json({
      message: "User created successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
