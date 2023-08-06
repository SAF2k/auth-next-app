import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

import { connect } from "@/database/dbconfig";
import User from "@/models/userModel";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { message: "User not found!" },
        { status: 400 }
      )}

      // check the password
      const validPassword = await bcryptjs.compare(password, user.password);
      if (!validPassword) {
        return NextResponse.json(
          { message: "Invalid password" },
          { status: 400 }
        );
      }

      // create a token data
      const tokenData = {
        id: user._id,
        email: user.email,
        username: user.username,
      }

      // create a token
      const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1d"});

      const response = NextResponse.json({
        message: "User logged in successfully",
        success: true,
      })
      response.cookies.set("token", token, {httpOnly: true})

      return response;


  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
