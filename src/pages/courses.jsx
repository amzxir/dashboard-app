import { HttpInterCeptoredService } from "@core/http-service";
import CoursesList from "../features/courses/components/courses-list";

const Courses = () => {
    return(
        <div className="row">
            <div className="col-12">
                <div className="d-flex align-items-center justify-content-between mb-5">
                    <a className="btn btn-primary fw-bolder mt-n1">افزودن دوره جدید</a>
                </div>
                <CoursesList/>
            </div>
        </div>
    )
}

export default Courses;

export async function coursesLodear (){
    const response = await HttpInterCeptoredService.get('/Course/list')
    return response.data
}