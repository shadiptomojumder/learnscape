import { Button } from "@/components/ui/button";
import Image from "next/image";
import Google from "../../../../public/google.png";
import { doSocialLogin } from "@/app/actions";

const SocialLogins = () => {
    return (
        <>
            <div className="text-center text-md mt-3 text-gray-500">
                or Signup with
            </div>
            <form action={doSocialLogin}>
                <div className="flex justify-center py-2 max-w-sm w-full mx-auto rounded-md gap-2">
                    <Button
                        className="w-full bg-slate-800 px-3 py-5 rounded-md flex items-center gap-5 justify-center"
                        type="submit"
                        name="action"
                        value="google"
                    >
                        <Image
                            src={Google}
                            alt="google"
                            width={40}
                            height={40}
                        />
                        <span className="font-semibold">Login with Google</span>
                    </Button>
                </div>
            </form>
        </>
    );
};

export default SocialLogins;
