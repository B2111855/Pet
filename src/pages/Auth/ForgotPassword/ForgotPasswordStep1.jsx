import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthService from "../../../service/auth.service";
import useMessageByApiCode from "../../../hooks/useMessageByApiCode";

const ForgotPasswordStep1 = ({onNext}) => {
    const [data, setData] = useState({});
    const [errors, setErrors] = useState({});
    const [errorMessage, setErrorMessage] = useState();
    const [loading, setLoading] = useState(false);
    const getMessage = useMessageByApiCode();

    const handleChange = (name, value) => {
        setErrors({
            ...errors,
            [name]: "",
        });
        data[name] = value;
        setData(data);
    }

    const handleChangeEmail = ((e) => {
        handleChange("email", e.target.value)
    });

    const onSubmit = async (data) => {
        const [result, error] = await AuthService.forgotPassword(data);
        if (error) {
            setErrorMessage(getMessage(error.code));
            toast.error(getMessage(error.code), {
                autoClose: 3000,
            });
            return;
        }
        toast.success(getMessage(result.code), {
            autoClose: 3000,
        })
        onNext();
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await onSubmit(data);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setLoading(false);
    }

    return (
        <section className="d-flex align-items-center justify-content-center min-vh-100">
            <div className="bg-white rounded shadow border-md mt-0 sm-max-w-md p-0">
                <div className="p-4 space-y-4 md-space-y-6">
                    <h1 className="h5 fw-bold text-gray-900">
                        Quên mật khẩu
                    </h1>
                    <div className="fs-6 text-primary">Nhập email của bạn để nhận mã xác nhận</div>
                    <form className="space-y-4 md-space-y-6" onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="form-control rounded"
                                placeholder="abc@gmail.com"
                                required
                                onChange={(e) => handleChangeEmail(e)}
                            />
                        </div>
                        <p className="text-danger mb-4">{errorMessage}</p>
                        <button
                            type="submit"
                            className={`btn btn-primary w-100 rounded ${loading ? "disabled" : ""}`}
                            disabled={loading}
                        >
                            {loading ? "Đang xử lý..." : "Xác nhận"}
                        </button>
                        <div className="d-flex mt-4">
                            <p className="mx-auto small text-muted">
                                Bạn đã có tài khoản?
                                <Link to="/login" className="text-primary fs-5"> Đăng nhập ngay</Link>
                            </p>
                        </div>
                        <div className="d-flex">
                            <p className="mx-auto small text-muted">
                                Bạn chưa có tài khoản?
                                <Link to="/register" className="text-primary fs-5"> Đăng kí ngay</Link>
                            </p>
                        </div>
                        <div className="d-flex align-items-center justify-content-center">
                            <Link to="/" className="text-primary fs-4">Về trang chủ</Link>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default ForgotPasswordStep1;