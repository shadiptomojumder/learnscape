import { TestimonialType } from "./testimonial.type";
import { UserType } from "./user.type";

export type CourseType = {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    thumbnail: string;
    modules: any[];
    price: number;
    active: boolean;
    category: {
        _id: string;
        title: string;
        description: string;
        thumbnail: string;
        __v: number;
    };
    instructor: UserType;
    quizSet: string;
    testimonials: TestimonialType[];
    learning: string[];
    createdOn: Date;
    modifiedOn: Date;
};
