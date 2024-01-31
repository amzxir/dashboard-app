import logo from "@assets/images/logo.svg"
import { useForm } from "react-hook-form";
import { Link, useActionData, useNavigate, useNavigation, useRouteError, useSubmit } from "react-router-dom";
import { HttpService } from "@core/http-service";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const Register = () => {

    const { t } = useTranslation();

    const { register, watch, formState: { errors }, handleSubmit } = useForm();

    const submitForm = useSubmit();

    const onSubmit = data => {
        const { confirmPassword, ...newData } = data
        submitForm(newData, { method: 'post' })
    }

    const navigation = useNavigation();
    const isSubmiting = navigation.state !== 'idle';

    const isSuccessForm = useActionData();

    const navigate = useNavigate();

    useEffect(() => {
        if (isSuccessForm) {
            setTimeout(() => {
                navigate('/login')
            }, 2000);
        }
    }, [isSuccessForm])

    const routeError = useRouteError();

    return (
        <>
            <div className="text-center mt-4">
                <img src={logo} style={{ height: "100px" }} />
                <h1 className="h2">پلتفرم آموزش آنلاین</h1>
                <p className="lead">
                    جهت ورود لازم است از طریق موبایل و رمز عبور خود اقدام کنید
                </p>
                <p className="lead">
                    قبلا ثبت نام نکرده اید؟
                    <Link to="/login" className="me-2">ورود کنید </Link>
                </p>
            </div>

            <div className="card">
                <div className="card-body">
                    <div className="m-sm-4">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-3">
                                <label className="form-label">موبایل</label>
                                <input
                                    {...register("mobile", { required: 'فیلد موبایل الزامی است.', minLength: 11, maxLength: 11 })}
                                    className={`form-control form-control-lg ${errors.mobile && 'is-invalid'}`}
                                />
                                {
                                    errors.mobile && errors.mobile.type === "required" && (
                                        <p className="text-danger small fw-bolder mt-1">{errors.mobile?.message}</p>
                                    )
                                }
                                {
                                    errors.mobile && (errors.mobile.type === "minLength" || errors.mobile.type === "maxLength") && (
                                        <p className="text-danger small fw-bolder mt-1">موبایل باید 11 رقم باشد</p>
                                    )
                                }
                            </div>
                            <div className="mb-3">
                                <label className="form-label">رمز عبور</label>
                                <input
                                    {...register("password", { required: 'فیلد رمز عبور اجباری است.' })}
                                    className={`form-control form-control-lg ${errors.password && 'is-invalid'}`}
                                    type="password"
                                />
                                {
                                    errors.password && errors.password.type === "required" && (
                                        <p className="text-danger small fw-bolder mt-1">{errors.password?.message}</p>
                                    )
                                }
                            </div>
                            <div className="mb-3">
                                <label className="form-label">تکرار رمز عبور</label>
                                <input
                                    {...register("confirmPassword", {
                                        required: 'فیلد تکرار رمز عبور الزامی است.', validate: (value) => {
                                            if (watch("password") !== value) {
                                                return "عدم تطابق با رمز عبور وارد شده";
                                            }
                                        }
                                    })}
                                    className={`form-control form-control-lg ${errors.confirmPassword && 'is-invalid'}`}
                                    type="password"
                                />
                                {
                                    errors.confirmPassword && errors.confirmPassword.type === "required" && (
                                        <p className="text-danger small fw-bolder mt-1">{errors.confirmPassword?.message}</p>
                                    )
                                }
                                {
                                    errors.confirmPassword && errors.confirmPassword.type === "validate" && (
                                        <p className="text-danger small fw-bolder mt-1">{errors.confirmPassword?.message}</p>
                                    )
                                }
                            </div>
                            <div className="text-center mt-3">
                                <button type="submit" disabled={isSubmiting} className="btn btn-lg btn-primary">
                                    {isSubmiting ? 'درحال انجام عملیات' : t('register.register')}
                                </button>
                            </div>
                            {
                                isSuccessForm && (
                                    <div className="alert alert-success text-success p-2 mt-3">
                                        عملیات با موفقیت انجام شد
                                    </div>
                                )
                            }
                            {
                                routeError && (
                                    <div className="alert alert-danger text-danger p-2 mt-3">
                                        {
                                            routeError.response?.data.map((error, index) => <p className="mb-0" key={index}>{error.description}</p>)
                                        }
                                    </div>
                                )
                            }
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register;

export async function submitAction({ request }) {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    const response = await HttpService.post("/Users", data);
    return response.status === 200;
} 