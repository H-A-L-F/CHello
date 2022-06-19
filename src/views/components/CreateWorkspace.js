const CreateWorkspace = () => {
    return (
        <div>
            <div class="form-control">
                <label class="label">
                    <span class="label-text">Email</span>
                </label>
                <input type="text" placeholder="email" class="input input-bordered" />
            </div>
            <div class="form-control">
                <label class="label">
                    <span class="label-text">Password</span>
                </label>
                <input type="text" placeholder="password" class="input input-bordered" />
                <label class="label">
                    <a href="#" class="label-text-alt link link-hover">Forgot password?</a>
                </label>
            </div>
            <div class="form-control mt-6">
                <button class="btn btn-primary">Login</button>
            </div>
        </div>
    );
}

export default CreateWorkspace;