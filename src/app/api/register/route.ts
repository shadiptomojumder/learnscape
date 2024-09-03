import { User } from "@/model/user-model";
import { dbConnect } from "@/services/mongo";

import { NextResponse } from "next/server";

import bcrypt from "bcryptjs";

export const POST = async (request: Request) => {
    const { firstName, lastName, email, password, userRole } =
        await request.json();

    console.log(firstName, lastName, email, password, userRole);

    await dbConnect();

    const hashedPassword = await bcrypt.hash(password, 5);

    const newUser = {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role: userRole,
    };

    console.log(newUser);

    try {
        await User.create(newUser);
        return new NextResponse("User has been created", {
            status: 201,
        });
    } catch (error) {
        console.error(error);
        return new NextResponse((error as Error).message, {
            status: 500,
        });
    }
};
