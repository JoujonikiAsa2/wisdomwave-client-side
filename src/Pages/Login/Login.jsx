import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { FaArrowCircleLeft, FaFacebook } from "react-icons/fa";
import Lottie from 'lottie-react';
import loginAnimation from './login.json'

const Login = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => console.log(data)

    return (
        <div className='flex justify-center items-center md:min-h-screen lg:min-h-screen min-h-[900px] max-w-[96rem] mx-auto'>
            <div className='flex lg:flex-row md:flex-row flex-col justify-center items-center w-[60rem] h-[500px] md:shadow-xl lg:shadow-xl lg:hover:shadow-2xl md:hover:shadow-2xl'>
                <div className='flex-1 flex justify-end'>
                <div className='flex p-8'>
                        <Link to='/'><FaArrowCircleLeft className='text-2xl'></FaArrowCircleLeft></Link>
                    </div>
                    <Lottie animationData={loginAnimation} className="max-w-[500px] h-[500px]"></Lottie>
                </div>
                <div className='flex justify-center items-center'>
                    <div className='divider divider-neutral divider-vertical md:divider-horizontal lg:divider-horizontal h-0 md:h-96 lg:h-96'></div>
                </div>
                <div className='flex-1 flex flex-col justify-start'>
                    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
                        <div>
                            <input
                                type='text'
                                name="email"
                                placeholder="Email"
                                {...register("email", { required: true })}
                                className='input input-bordered border-black w-[80vw] md:w-96 lg:w-96'
                            />
                            {errors.email && <span>This field is required</span>}
                        </div>

                        <div>
                            <input
                                type='password'
                                name="password"
                                placeholder='Password'
                                {...register("password", { required: true })}
                                className='input input-bordered border-black w-[80vw] md:w-96 lg:w-96' />
                            {errors.password && <span>This field is required</span>}
                        </div>
                        <div>
                            <input
                                type="submit"
                                className='btn bg-blue-500 hover:btn-outline input input-bordered border-black w-[80vw] md:w-96 lg:w-96 capitalize' />
                        </div>
                        <div className="">
                            <div className="divider divider-neutral py-2 w-[80vw] md:w-96 lg:w-96">OR</div>
                        </div>
                        <div className='flex justify-start gap-4'>
                            <FcGoogle className=' text-3xl md:text-3xl lg:text-4xl font-bold'></FcGoogle >
                            <FaFacebook className='text-blue-700 text-3xl md:text-3xl lg:text-4xl font-bold'></FaFacebook>
                        </div>
                        <div>
                            <p className='text-base'>New at WisdomWave? <Link to="/studentSignUp"><span className=' text-red-400 underline'>Create an acount</span></Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
};

export default Login;