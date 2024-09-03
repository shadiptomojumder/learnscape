import { UserType } from "./user.type";

export type TestimonialType = {
    id?:string;
    content: string;
    rating: number;
    courseId: string; // Assuming you're using ObjectId as a string
    user: UserType;
};
