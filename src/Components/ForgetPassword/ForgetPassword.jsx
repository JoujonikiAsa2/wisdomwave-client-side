// import { sendPasswordResetEmail } from 'firebase/auth';
// import { auth } from 'google-auth-library';
import { sendPasswordResetEmail } from 'firebase/auth';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { FaArrowCircleLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import auth from '../../firebase/firebase.config';

const ForgetPassword = () => {
    const {
        register,
        formState: { errors },
        handleSubmit,
        reset
    } = useForm()

    const onSubmit = async (data) => {
        console.log(data.email)
        await sendPasswordResetEmail(auth, data.email)
            .then((res) => {
                toast.success("Sending an email o reset password")
                console.log(res)
            })
            .catch((error) => {
                const errorMessage = error.message;
                toast.error(errorMessage)
            })
    }

    return (
        <>
            <Toaster
                position="top-center"
                reverseOrder={false}

            />
            <div className='flex justify-center items-center h-[80vh] max-w-[96rem] mx-auto'>
                <div className='flex flex-col gap-3 justify-center items-center w-[60rem] h-[300px] md:shadow-xl lg:shadow-xl lg:hover:shadow-2xl md:hover:shadow-2x'>
                    <div className='p-4'>
                        <h2 className='text-lg'>Forget your password? Give email to reset password.</h2>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='flex gap-2'>
                            <div>

                                {/* Email */}
                                <input
                                    type='email'
                                    name="email"
                                    placeholder="Email"
                                    {...register("email", { required: true })}
                                    className='input input-bordered border-[#0766AD] focus:outline-none w-full'
                                />
                                <div>
                                    {errors.email && <span className='text-xs text-red-500'>This field is required</span>}
                                </div>
                            </div>
                            {/* Submit button */}
                            <div>
                                <input
                                    type="submit"
                                    className='btn bg-gradient-to-r from-[#0766AD] to-[#29ADB2]  hover:bg-gradient-to-t hover:from-[#0766AD] hover:to-[#29ADB2]  border-2 border-none text-white w-full focus:outline-none capitalize' />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default ForgetPassword;