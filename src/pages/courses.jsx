import { HttpInterCeptoredService } from "@core/http-service";
import CoursesList from "../features/courses/components/courses-list";
import { Await, defer, useLoaderData } from "react-router-dom";
import { Suspense } from "react";

const Courses = () => {

    const data = useLoaderData();

    return (
        <div className="row">
            <div className="col-12">
                <div className="d-flex align-items-center justify-content-between mb-5">
                    <a className="btn btn-primary fw-bolder mt-n1">افزودن دوره جدید</a>
                </div>
                <Suspense fallback={<p className="text-info">درحال دریافت اطلاعات</p>}>
                    <Await resolve={data.courses}>
                        {
                            (loaderCourses) => <CoursesList courses={loaderCourses} />
                        }
                    </Await>
                </Suspense>
            </div>
        </div>
    )
}

export default Courses;

export async function coursesLodear() {
    return defer({
        courses: loadCourses()
    })
}

const loadCourses = async () => {
    const response = await HttpInterCeptoredService.get('/Course/list')
    return response.data
}