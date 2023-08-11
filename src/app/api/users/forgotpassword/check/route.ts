import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/database/dbconfig";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token } = reqBody;

    const user = await User.findOne({
      forgotPasswordToken: token,
      forgotPasswordTokenExpiry: { $gt: Date.now() },
    }).select("-password");

    if (!user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }    

    return NextResponse.json({
      message: "successfully",
      success: true,
      user,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
    
}
