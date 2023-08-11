import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

import User from "@/models/userModel";
import { connect } from "@/database/dbconfig";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { password, data } = reqBody;

    //hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(
      password.password.password,
      salt
    );

    //check if user already exists
    const user = await User.findByIdAndUpdate(
      { _id: data.data._id },
      {
        password: hashedPassword,
      }
    );

    if (!user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    user.forgotPasswordToken = undefined;
    user.forgotPasswordTokenExpiry = undefined;
    await user.save();

    return NextResponse.json({
      message: "User created successfully",
      success: true,
      user,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
