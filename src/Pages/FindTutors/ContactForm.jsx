import {  useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";
// import Container from "../Container/Container";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";
import { PiSpinnerGapBold } from "react-icons/pi";

const ContactForm = ({ tutorEmail }) => {
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
        const email = tutorEmail
        const message = formField.message.value;
        const userEmail = user?.email
        const type = formField.type.value;
        const responseStatus = 'pending'

        const newMessage = { name, phone, email, message, userEmail, type, responseStatus };

        await axiosPublic.post("/api/messages", newMessage)
            .then(res => {
                console.log(res.data)
                if(res.data.status === 'success'){
                    toast.success(res.data.data)
                    setIsLoading(false)
                    formField.reset()
                }
            })
            .catch(err => {
                console.log(err)
            })

        console.log(newMessage)
    };

    return (
        <div>
            <form
                ref={form}
                onSubmit={sendEmail}
            >
                <div className="flex flex-col lg:flex-row md:flex-row justify-start items-start gap-4">
                    Tuition Type:
                    <div>
                        <input type="radio" name="type" value="online" required/>
                    <label for="vehicle1"> Online</label>
                    </div>
                    <div>
                        <input type="radio" name="type" value="offline" required/>
                        <label for="vehicle2"> Offline</label>
                    </div>
                </div>
                <div className="my-5">
                    <input
                        type="text"
                        name="user_phone"
                        placeholder="Your Phone Number"
                        className="block w-full p-3 rounded-md  border border-gray-600 text-sm text-[#757575] hover:border-special focus:border-special outline-none"
                        required
                    />
                </div>
                <div>
                    <textarea
                        placeholder="Your Message"
                        name="message"
                        className="block w-full h-[150px] lg:h-[200px] rounded-md text-sm text-[#757575] border border-gray-600 p-3 hover:border-special focus:border-special outline-none"
                        required
                    ></textarea>
                </div>
                <div className="mt-3">
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

export default ContactForm;