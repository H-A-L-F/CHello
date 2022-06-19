import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../../AuthContext";

const Register = () => {
    const unameRef = useRef();
    const emailRef = useRef();
    const passRef = useRef();
    const cpassRef = useRef();

    const {signUp, setName} = useUserAuth();

    const navigate = useNavigate();

    const onSubmit = (e) => {
        // console.log(unameRef.current.value, emailRef.current.value, passRef.current.value, cpassRef.current.value);
        e.preventDefault();
        signUp(emailRef.current.value, passRef.current.value)
            .then(() => {
                setName(unameRef.current.value)
                    .then(() => {
                        navigate('/home');
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })
            .catch(err => {
                console.log(err);
            });
    }

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Register now!</h1>
                    <p className = "py-6">Register now and login to start enjoying all the features that our website provides! Please do keep in mind that your username will be used to refer to you and your email must be in a valid email format. Also don't forget your password must be at least 8 characters long. We are happy to welcome new users like you!</p>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">
                        <form onSubmit={onSubmit}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Username</span>
                                </label>
                                <input type="text" ref={unameRef} required name="username" id="username" placeholder="username" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" ref={emailRef} required name="email" id="email" placeholder="email" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" ref={passRef} required name="password" id="password" placeholder="password" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Confirm Password</span>
                                </label>
                                <input type="password" ref={cpassRef} required name="confirm" id="confirm" placeholder="confirm password" className="input input-bordered" />
                            </div>
                            <div className="form-control mt-6">
                                <button type="submit" className="btn btn-primary" >Register</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;