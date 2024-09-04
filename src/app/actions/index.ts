"use server";

import { signIn } from "@/auth";

export async function ceredntialLogin(formData: FormData) {
    try {
        const response = await signIn("credentials", {
            email: formData.get("email"),
            password: formData.get("password"),
            redirect: false,
        });
        return response;
} catch (error) {
        throw new Error(error?.toString());
    }
}

export async function doSocialLogin(formData: FormData) {
    const action = formData.get("action") as string;
    await signIn(action, { redirectTo: "/courses" });
}
