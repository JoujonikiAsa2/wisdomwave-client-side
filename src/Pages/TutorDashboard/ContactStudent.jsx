import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import { PiSpinnerGapBold } from "react-icons/pi";

const ContactStudent = ({ email }) => {
    const form = useRef();
    const { user } = useAuth()
    const axiosPublic = useAxiosPublic();
    const [isLoading, setIsLoading] = useState(false);

    const sendEmail = async (e) => {
        e.preventDefault();
        const formField = e.target;
        setIsLoading(true)
        const name = user?.displayName
        const phone = formField.user_phone.value;
        const studentEmail = email
        const message = formField.message.value;
        const userEmail = user?.email
        const responseStatus = 'pending'

        const newMessage = { name, phone, studentEmail, message, userEmail, responseStatus };

        await axiosPublic.post("/api/student/messages", newMessage)
            .then(res => {
                console.log(res.data)
                if (res.data.status === 'success') {
                    toast.success(res.data.data)
                    setIsLoading(false)
                    setTimeout(() => {
                    }, 2000)
                    formField.reset()
                }
            })
            .catch(err => {
                console.log(err)
            })

        console.log(newMessage)
    };

    return (
        <div className="w-full flex justify-center items-center">
            <form
                ref={form}
                onSubmit={sendEmail}
                className="w-full flex flex-col items-center justify-center"
            >
                <div className="my-5 w-full">
                    <input
                        type="text"
                        name="user_phone"
                        placeholder="Your Phone Number"
                        className="block w-full p-3 rounded-md  border border-gray-600 text-sm text-[#757575] hover:border-special focus:border-special outline-none"
                        required
                    />
                </div>
                <div className="w-full">
                    <textarea
                        placeholder="Your Message"
                        name="message"
                        className="block w-full  h-[120px] md:h-[120px] lg:h-[150px] rounded-md text-sm text-[#757575] border border-gray-600 p-3 hover:border-special focus:border-special outline-none"
                        required
                    ></textarea>
                </div>
                <div className="mt-3 w-full">
                    {isLoading == true ? (
                        <button
                            className='btn btn-sm bg-gradient-to-r from-[#0766AD] to-[#29ADB2]  hover:bg-gradient-to-t hover:from-[#0766AD] hover:to-[#29ADB2]  border-2 border-none text-white w-full focus:outline-none capitalize'><PiSpinnerGapBold className='animate-spin text-2xl' ></PiSpinnerGapBold  ></button>
                    ) : (
                        <div className=''>
                            <input
                                type="submit"
                                value="Send Request"
                                className='btn btn-sm bg-gradient-to-r from-[#0766AD] to-[#29ADB2]  hover:bg-gradient-to-t hover:from-[#0766AD] hover:to-[#29ADB2]  border-2 border-none text-white w-full focus:outline-none capitalize' />
                        </div>
                    )}
                </div>
            </form>
        </div>
    );
};

export default ContactStudent;