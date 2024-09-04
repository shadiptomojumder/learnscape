import { User } from "@/model/user-model";
import { replaceMongoIdInObject } from "@/lib/convertData";

import bcrypt from "bcryptjs";

export async function getUserByEmail(email:string) {
    const user = await User.findOne({ email: email }).lean();
    return replaceMongoIdInObject(user);
}

export async function validatePassword(email:string, password:string) {
    const user = await getUserByEmail(email);
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );
    return isMatch;
 }
