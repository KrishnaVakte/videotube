import React from "react";
import { Logo, Button, Input } from "./index";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { sendOtp, setSignupData } from "../store/Slices/authSlice.js";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginSkeleton from "../skeleton/loginSkeleton.jsx";
import GetImagePreview from "./GetImagePreview.jsx";

function SignUp() {
    const {
        handleSubmit,
        register,
        control,
        formState: { errors },
        clearErrors
    } = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.auth?.loading);

    const submit = async (data) => {
        console.log(data);
        dispatch(setSignupData(data));
        const response = await dispatch(sendOtp(data.email));
        console.log(response)
        if (response?.payload?.success) {
            navigate('/verify-email')
        }
        
    }

    

    if (loading) {
        return <LoginSkeleton />;
    }

    return (
        <>
            <div className="w-full h-screen text-white p-3 flex justify-center items-start ">
                <div className="flex flex-col space-y-2 justify-center items-center border border-slate-600 p-3 sm:mt-8">
                    <div className="flex items-center gap-2">
                        <Logo />
                    </div>
                    <form
                        onSubmit={handleSubmit(submit)}
                        className="space-y-4 p-2 text-sm sm:w-96 w-full"
                    >
                        <div className="w-full relative h-28 bg-blue-900">
                            <div className="w-full h-full">
                                <GetImagePreview
                                    name="coverImage"
                                    control={control}
                                    className="w-full h-28 object-cover border-none border-slate-900"
                                    cameraIcon
                                />
                                <div className="text-sm absolute right-2 bottom-2 hover:text-purple cursor-default">
                                    cover Image
                                </div>
                            </div>
                            <div className="absolute left-2 bottom-2 rounded-full border-2">
                                <GetImagePreview
                                    name="avatar"
                                    control={control}
                                    className="object-cover rounded-full h-20 w-20 outline-none"
                                    cameraIcon={true}
                                    cameraSize={20}
                                    onChange={()=>{clearErrors('avatar')}}
                                />
                            </div>
                            
                        </div>
                        {errors.avatar && (
                            <div className="text-red1">
                                {errors.avatar.message}
                            </div>
                        )}
                        {errors.coverImage && (
                            <div className="text-red1">
                                {errors.coverImage.message}
                            </div>
                        )}
                        <Input
                            label="Username: "
                            type="text"
                            placeholder="Enter username"
                            {...register("username", {
                                required: "username is required",
                            })}
                            className="h-8"
                            onChange={()=>{clearErrors('username')}}
                        />
                        {errors.username && (
                            <span className="text-red1">
                                {errors.username.message}
                            </span>
                        )}
                        <Input
                            label="Email: "
                            type="email"
                            placeholder="Enter email"
                            {...register("email", {
                                required: "email is required",
                            })}
                            className="h-8"
                            onChange={()=>{clearErrors('email')}}
                        />
                        {errors.email && (
                            <span className="text-red1">
                                {errors.email.message}
                            </span>
                        )}
                        <Input
                            label="Fullname: "
                            type="text"
                            placeholder="Enter fullname"
                            {...register("fullName", {
                                required: "fullName is required",
                            })}
                            className="h-8"
                            onChange={()=>{clearErrors('fullName')}}
                        />
                        {errors.fullName && (
                            <span className="text-red1">
                                {errors.fullName.message}
                            </span>
                        )}
                        <Input
                            label="Password: "
                            type="password"
                            placeholder="Enter password"
                            {...register("password", {
                                required: "password is required",
                            })}
                            className="h-8"
                            onChange={()=>{clearErrors('password')}}
                        />
                        {errors.password && (
                            <span className="text-red1">
                                {errors.password.message}
                            </span>
                        )}

                        <Button
                            type="submit"
                            bgColor="bg-purple"
                            className="w-full sm:py-3 py-2 hover:bg-purple text-lg"
                        >
                            Signup
                        </Button>

                        <p className="text-center text-sm">
                            Already have an account?{" "}
                            <Link
                                to={"/login"}
                                className="text-purple cursor-pointer hover:opacity-70"
                            >
                                Login
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </>
    );
}

export default SignUp;
