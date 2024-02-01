import { useLoaderData } from "react-router-dom";
import CoursesItem from "./courses-item";

const CoursesList = () => {

    const loaderCourses = useLoaderData();

    return(
        <div className="row">
            {
                loaderCourses.map((courses) => (
                    <div className="col-lg-4 col-sm-6 col-md-6 col-12" key={courses.id}>
                        <CoursesItem {...courses}/>
                    </div>
                ))
            }
        </div>
    )
}

export default CoursesList;