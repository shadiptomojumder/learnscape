import { replaceMongoIdInArray } from "@/lib/convertData";
import { Course } from "@/model/course-model";
import { Enrollment } from "@/model/enrollment-model";

export async function getEnrollmentsForCourse(courseId:any) {
    const enrollments = await Enrollment.find({ course: courseId }).lean();
    return replaceMongoIdInArray(enrollments);
}

export async function getEnrollmentsForUser(userId:string) {
    try {
        const enrollments = await Enrollment.find({ student: userId })
            .populate({
                path: "course",
                model: Course,
            })
            .lean();
        return replaceMongoIdInArray(enrollments);
    } catch (err:any) {
        throw new Error(err);
    }
}

export async function hasEnrollmentForCourse(courseId:string, studentId:string) {
    try {
        const enrollment = await Enrollment.findOne({
            course: courseId,
            student: studentId,
        })
            .populate({
                path: "course",
                model: Course,
            })
            .lean();

        if (!enrollment) return false;

        return true;
    } catch (error:any) {
        throw new Error(error);
    }
}

export async function enrollForCourse(courseId:string, userId:string, paymentMethod:any) {
    const newEnrollment = {
        course: courseId,
        student: userId,
        method: paymentMethod,
        enrollment_date: Date.now(),
        status: "not-started",
    };

    try {
        const response = await Enrollment.create(newEnrollment);
        return response;
    } catch (error:any) {
        throw new Error(error);
    }
}
