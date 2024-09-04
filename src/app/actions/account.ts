"use server"

import { User } from "@/model/user-model";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import { validatePassword } from "@/queries/users";

export async function updateUserInfo(email:string, updatedData:any) {
    try {
        const filter = {email: email};
        await User.findOneAndUpdate(filter, updatedData);
        revalidatePath('/account');
} catch(error) {
        throw new Error(error?.toString())
    }
}

export async function changePassword(email:string, oldPassword:string, newPassword:string) {
    const isMatch = await validatePassword(email, oldPassword);

    if (!isMatch) {
        throw new Error("Please enter a valid current password");
    }

    const filter = {email: email};

    const hashedPassword = await bcrypt.hash(newPassword, 5);

    const dataToUpdate = {
        password: hashedPassword
    }

    try{
        await User.findOneAndUpdate(filter, dataToUpdate);
        revalidatePath('/account');
    } catch(error) {
        throw new Error(error?.toString());
    }

}