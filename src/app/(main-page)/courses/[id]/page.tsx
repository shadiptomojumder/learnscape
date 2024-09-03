import Testimonials from "./_components/Testimonials";
import RelatedCourses from "./_components/RelatedCourses";
import CourseDetails from "./_components/CourseDetails";

import { getCourseDetails } from "@/queries/course.query";
import { replaceMongoIdInArray } from "@/lib/convertData";
import CourseDetailsIntro from "./_components/CourseDetailsIntro";

const SingleCoursePage: React.FC<{ params: { id: string } }> = async ({ params: { id } }) => {
    const course = await getCourseDetails(id);
    //console.log("course details:",course);
    
    return (
        <>
            <CourseDetailsIntro
                title={course?.title}
                subtitle={course?.subtitle}
                thumbnail={course?.thumbnail} />

            <CourseDetails course={course} />

            {course?.testimonials && <Testimonials testimonials={replaceMongoIdInArray(course?.testimonials)} />}

            <RelatedCourses />
        </>
    );
};
export default SingleCoursePage;
