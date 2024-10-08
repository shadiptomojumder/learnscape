import { Category } from "@/model/category-model";
import { Course } from "@/model/course-model";
import { Module } from "@/model/module.model";
import { Testimonial } from "@/model/testimonial-model";
import { User } from "@/model/user-model";

import {
    replaceMongoIdInArray,
    replaceMongoIdInObject,
} from "@/lib/convertData";

import { getEnrollmentsForCourse } from "./enrollments";
import { getTestimonialsForCourse } from "./testimonials";

export async function getCourseList() {
    const courses = await Course.find({})
        .select([
            "title",
            "subtitle",
            "thumbnail",
            "modules",
            "price",
            "category",
            "instructor",
        ])
        .populate({
            path: "category",
            model: Category,
        })
        .populate({
            path: "instructor",
            model: User,
        })
        .populate({
            path: "testimonials",
            model: Testimonial,
        })
        .populate({
            path: "modules",
            model: Module,
        })
        .lean();
    return replaceMongoIdInArray(courses);
}

export async function getCourseDetails(id: any) {
    const course = await Course.findById(id)
        .populate({
            path: "category",
            model: Category,
        })
        .populate({
            path: "instructor",
            model: User,
        })
        .populate({
            path: "testimonials",
            model: Testimonial,
            populate: {
                path: "user",
                model: User,
            },
        })
        .populate({
            path: "modules",
            model: Module,
        })
        .lean();

    return replaceMongoIdInObject(course);
}

export async function getCourseDetailsByInstructor(instructorId: any) {
    const courses = await Course.find({ instructor: instructorId }).lean();

    const enrollments = await Promise.all(
        courses.map(async (course) => {
            const enrollment = await getEnrollmentsForCourse(
                course._id && course._id.toString()
            );
            return enrollment;
        })
    );

    function groupBy(arr: any, keyFn: any) {
        return arr.reduce((acc: any, item: any) => {
            const key = keyFn(item);
            if (!acc[key]) {
                acc[key] = [];
            }
            acc[key].push(item);
            return acc;
        }, {});
    }

    const groupedByCourses = groupBy(
        enrollments.flat(),
        ({ course }: { course: any }) => course
    );
    console.log("groupedByCourses is:", groupedByCourses);

    const totalRevenue = courses.reduce((acc, course: any) => {
        return acc + groupedByCourses[course._id].length * course.price;
    }, 0);

    console.log("totalRevenue is:", totalRevenue);

    const totalEnrollments = enrollments.reduce((item: any, currentValue) => {
        return item.length + currentValue.length;
    });

    const testimonials = await Promise.all(
        courses.map(async (course) => {
            const testimonial = await getTestimonialsForCourse(course._id);
            return testimonial;
        })
    );

    const totalTestimonials = testimonials.flat();
    const avgRating =
        totalTestimonials.reduce(function (acc, obj) {
            return acc + obj.rating;
        }, 0) / totalTestimonials.length;

    //console.log("testimonials Array is:", testimonials);
    return {
        courses: courses.length,
        enrollments: totalEnrollments,
        reviews: totalTestimonials.length,
        ratings: avgRating.toPrecision(2),
        revenue: totalRevenue,
    };
}
