import { useRef } from "react";

const Register = () => {
    const unameRef = useRef();
    const emailRef = useRef();
    const passRef = useRef();
    const cpassRef = useRef();

    return (
        <div class="hero min-h-screen bg-base-200">
            <div class="hero-content flex-col lg:flex-row-reverse">
                <div class="text-center lg:text-left">
                    <h1 class="text-5xl font-bold">Register now!</h1>
                    <p class = "py-6">Register now and login to start enjoying all the features that our website provides! Please do keep in mind that your username will be used to refer to you and your email must be in a valid email format. Also don't forget your password must be at least 8 characters long. We are happy to welcome new users like you!</p>
                </div>
                <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div class="card-body">
                        <form action="signup" method="post">
                            <div class="form-control">
                                <label class="label">
                                    <span class="label-text">Username</span>
                                </label>
                                <input type="text" name="username" id="username" placeholder="username" class="input input-bordered" />
                            </div>
                            <div class="form-control">
                                <label class="label">
                                    <span class="label-text">Email</span>
                                </label>
                                <input type="email" name="email" id="email" placeholder="email" class="input input-bordered" />
                            </div>
                            <div class="form-control">
                                <label class="label">
                                    <span class="label-text">Password</span>
                                </label>
                                <input type="password" name="password" id="password" placeholder="password" class="input input-bordered" />
                            </div>
                            <div class="form-control">
                                <label class="label">
                                    <span class="label-text">Confirm Password</span>
                                </label>
                                <input type="password" name="confirm" id="confirm" placeholder="confirm password" class="input input-bordered" />
                            </div>
                            <div class="form-control mt-6">
                                <button type="submit" class="btn btn-primary">Register</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;