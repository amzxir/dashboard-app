import CoursesItem from "./courses-item";

const CoursesList = ({ courses }) => {
    return(
        <div className="row">
            {
                courses.map((courses) => (
                    <div className="col-lg-4 col-sm-6 col-md-6 col-12" key={courses.id}>
                        <CoursesItem {...courses}/>
                    </div>
                ))
            }
        </div>
    )
}

export default CoursesList;