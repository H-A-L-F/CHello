import { useRef } from "react";
import { useUserAuth } from "../../AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const emailRef = useRef()
    const passRef = useRef()

    const { login } = useUserAuth()
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        login(emailRef.current.value, passRef.current.value)
            .then(() => {
                navigate("/main/home")
            })
            .catch((e) => {
                console.log(e)
            })
    }

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">Please input your registered email and password! Do remember that the email must be in valid email format and the password must be at least 8 characters long. Login now and start browsing!</p>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">
                        <form onSubmit={handleLogin}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="text" ref={emailRef} name="email" id="email" placeholder="email" className="input input-bordered"/>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" ref={passRef} name="password" id="password" placeholder="password" className="input input-bordered" />
                                <Link to={"/register"}>
                                    <label class="label label-text-alt link link-hover">
                                        Already have an account? Register!
                                    </label>
                                </Link>
                            </div>
                            <div className="form-control mt-6">
                                <button type="submit" className="btn btn-primary">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;