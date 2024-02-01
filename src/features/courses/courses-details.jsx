import { HttpInterCeptoredService } from "@core/http-service";
import { Suspense } from "react";
import { Await, defer, useLoaderData } from "react-router-dom";

const CoursesDetails = () => {

    const data = useLoaderData();

    return (
        <Suspense fallback={<p>درحال دریافت اطلاعات ...</p>}>
            <Await resolve={data.details}>
                {
                    (details) => (
                        <>
                            <div className="row">
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-body pt-0">
                                            <img className="mx-auto my-4 d-block rounded" src={details.coverImageUrl} style={{ width: '30%' }} />
                                            <div className="d-flex flex-column justify-content-center pe-4 text-center">
                                                <div className="badge bg-info my-2 align-self-center">{details.courseCategory}</div>
                                                <h4>{details.title}</h4>
                                                <p>{details.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-3 col-xl-2 d-flex">
                                    <div className="card flex-fill text-center">
                                        <div className="card-header">
                                            <h5 className="card-title mb-0 mt-2">زمان آموزش</h5>
                                        </div>
                                        <div className="card-body my-0 pt-0">
                                            <h4 className="text-info fw-bolder">{details.duration} ساعت</h4>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-xl-2 d-flex">
                                    <div className="card flex-fill text-center">
                                        <div className="card-header">
                                            <h5 className="card-title mb-0 mt-2">سطح دوره</h5>
                                        </div>
                                        <div className="card-body my-0 pt-0">
                                            <h4 className="text-info fw-bolder">{details.courseLevel}</h4>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-xl-2 d-flex">
                                    <div className="card flex-fill text-center">
                                        <div className="card-header">
                                            <h5 className="card-title mb-0 mt-2">تعداد فصل ها</h5>
                                        </div>
                                        <div className="card-body my-0 pt-0">
                                            <h4 className="text-info fw-bolder">{details.numOfChapters} فصل</h4>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-xl-2 d-flex">
                                    <div className="card flex-fill text-center">
                                        <div className="card-header">
                                            <h5 className="card-title mb-0 mt-2">تعداد مباحث</h5>
                                        </div>
                                        <div className="card-body my-0 pt-0">
                                            <h4 className="text-info fw-bolder">{details.numOfLectures} مبحث</h4>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-xl-2 d-flex">
                                    <div className="card flex-fill text-center">
                                        <div className="card-header">
                                            <h5 className="card-title mb-0 mt-2">تعداد نظرات </h5>
                                        </div>
                                        <div className="card-body my-0 pt-0">
                                            <h4 className="text-info fw-bolder">{details.numOfReviews} نظر</h4>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-xl-2 d-flex">
                                    <div className="card flex-fill text-center">
                                        <div className="card-header">
                                            <h5 className="card-title mb-0 mt-2">میانگین نظرات</h5>
                                        </div>
                                        <div className="card-body my-0 pt-0">
                                            <h4 className="text-info fw-bolder">{details.averageReviewRating + "از 5" }</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                }

            </Await>
        </Suspense>
    )
}

export default CoursesDetails;

export async function detailsCoursesLoader({ params }) {
    return defer({
        details: loaderDetails(params.id)
    })
}

const loaderDetails = async (id) => {
    const response = await HttpInterCeptoredService.get(`/Course/by-id/${id}`);
    return response.data;
}
