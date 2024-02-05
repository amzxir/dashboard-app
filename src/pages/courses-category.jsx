import { Await, defer, useLoaderData, useNavigate } from "react-router-dom";
import { HttpInterCeptoredService } from "@core/http-service";
import CategoryList from "../features/category/components/category-list";
import { Suspense, useState } from "react";
import Modal from "../components/modal";

const CoursesCategory = () => {

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedCategory , setSelectedCategory] = useState();

    const navigate = useNavigate();

    const deleteCategory = (categoryId) => {
        setSelectedCategory(categoryId);
        setShowDeleteModal(true);
    }

    const handleDeleteCategory = async () => {
        setShowDeleteModal(false);
        const response = await HttpInterCeptoredService.delete(`/CourseCategory/${selectedCategory}`);

        if (response.status === 200) {
            const url = new URL(window.location.href);
            navigate(url.pathname + url.search);
        }

    }

    const data = useLoaderData();

    return (
        <>
            <div className="row">
                <div className="col-12">
                    <div className="d-flex align-items-center justify-content-between mb-5">
                        <a className="btn btn-primary fw-bolder mt-n1">افزودن دسته جدید</a>
                    </div>
                    <Suspense fallback={<p>... درحال دریافت اطلاعات</p>}>
                        <Await resolve={data.categories}>
                            {
                                (loaderCategories) => <CategoryList deleteCategory={deleteCategory} categories={loaderCategories} />
                            }
                        </Await>
                    </Suspense>
                </div>
            </div>
            <Modal isOpen={showDeleteModal} close={setShowDeleteModal} title="حذف" body="آیا از حذف این دسته اطمینان دارید ؟" >
                <button type="button" className="btn btn-secondary fw-bolder" onClick={() => setShowDeleteModal(false)}>انصراف</button>
                <button type="button" className="btn btn-primary fw-bolder" onClick={handleDeleteCategory}>حذف</button>
            </Modal>
        </>
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
    const pageSize = import.meta.env.VITE_PAGE_SIZE;
    let url = '/CourseCategory/sieve';
    url += `?page=${page}&pageSize=${pageSize}`
    const response = await HttpInterCeptoredService.get(url);
    return response.data;
}