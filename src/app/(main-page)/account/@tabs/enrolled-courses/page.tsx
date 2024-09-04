//import { CourseProgress } from "@/components/course-progress";
import { Badge } from "@/components/ui/badge";
import { BookOpen } from "lucide-react";
import Image from "next/image";
import { getEnrollmentsForUser } from "@/queries/enrollments";
import { auth } from "@/auth";

import { redirect } from "next/navigation";

import { getUserByEmail } from "@/queries/users";

import EnrolledCourseCard from "../../component/enrolled-coursecard";

async function EnrolledCourses() {
	const session = await auth();

    if (!session?.user) {
        redirect("/login");
    }

    const loggedInUser = await getUserByEmail(session?.user?.email ?? "");

    const enrollments = await getEnrollmentsForUser(loggedInUser?.id);

    console.log("the enrollments is 25:",enrollments);
	return (
		<div className="grid sm:grid-cols-2 gap-6">
            {enrollments && enrollments.length > 0 ? (
                <>
                    {enrollments.map((enrollment) => (
                        <EnrolledCourseCard
                            key={enrollment?.id}
                            enrollment={enrollment}
                        />
                    ))}
                </>
            ) : (
                <p> No Enrollments found!</p>
            )}
        </div>
	);
}

export default EnrolledCourses;
