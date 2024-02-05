import { useForm } from "react-hook-form";
import { HttpInterCeptoredService } from "@core/http-service";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useCategoryContext } from "./category-context";


const AddOrUpdateCategory = ({ setShowAddCategory }) => {

    const { register, handleSubmit, formState: { errors } , setValue } = useForm();

    const { category , setCategory } = useCategoryContext();

    const navigate = useNavigate();

    useEffect(() => {
        if (category) {
            setValue('name' , category.name)
            setValue('id' , category.id)
        }
    },[category])

    const onSubmit = async (data) => {
        setShowAddCategory(false);
        const response = HttpInterCeptoredService.post('/CourseCategory' , data);

        toast.promise(
            response , {
                pending:'در حال انجام عملیات ...',
                success:{
                    render(){
                        const url = new URL(window.location.href);
                        navigate(url.pathname + url.search);
                        if (category) {
                            setCategory(null)
                        }
                        return 'عملیات با موفقیت انجام شد'
                    }
                },
                error:{
                    render({ data }){
                        if (data.response.status === 400) {
                            return ('categoryList' + data.response.data.code)
                        } else {
                            return 'خطا در اجرای عملیات'
                        }
                    }
                }
            },{
                position:'bottom-left'
            }
        )
    }

    const onClose = () => {
        setShowAddCategory(false);
        setCategory(null)
    }

    return (
        <div className="card">
            <div className="card-body">
                <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
                    <div>
                        <label className="form-label">نام</label>
                        <input
                            {...register("name", { required: true })}
                            type="text"
                            className={`form-control form-control-lg ${errors.name && 'is-invalid'}`}
                        />
                        {
                            errors.name && errors.name.type === 'required' && (
                                <p className="text-danger small fw-bolder mt-1">فیلد نام الزامی است.</p>
                            )
                        }
                    </div>
                    <div className="text-start mt-3">
                        <button type="button" className="btn btn-lg btn-secondary ms-2" onClick={onClose}>بستن</button>
                        <button type="submit" className="btn btn-lg btn-primary me-2">ثبت تغییرات</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddOrUpdateCategory;