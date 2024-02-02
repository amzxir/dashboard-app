import { Await, defer, useLoaderData } from "react-router-dom";
import { HttpInterCeptoredService } from "@core/http-service";
import CategoryList from "../features/category/components/category-list";
import { Suspense } from "react";

const CoursesCategory = () => {

    const data = useLoaderData();

    return (
        <div className="row">
            <div className="col-12">
                <div className="d-flex align-items-center justify-content-between mb-5">
                    <a className="btn btn-primary fw-bolder mt-n1">افزودن دسته جدید</a>
                </div>
                <Suspense fallback={<p>... درحال دریافت اطلاعات</p>}>
                    <Await resolve={data.categories}>
                        {
                            (loaderCategories) => <CategoryList categories={loaderCategories} />
                        }
                    </Await>
                </Suspense>
            </div>
        </div>
    )
}

export default CoursesCategory;

export async function coursesCategoryLoader({ request }) {
    return defer({
        categories: loaderCategory(request)
    })
}

const loaderCategory = async (request) => {
    const page = new URL(request.url).searchParams.get('page') || 1;
    const pageSize = 6;
    let url = '/CourseCategory/sieve';
    url += `?page=${page}&pageSize=${pageSize}`
    const response = await HttpInterCeptoredService.get(url);
    return response.data;
}