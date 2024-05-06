import { FiPhoneCall, FiMail } from "react-icons/fi";
import { IoLocationOutline } from "react-icons/io5";
// import ContactCard from "./ContactCard";
import { useContext, useRef } from "react";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";
// import Container from "../Container/Container";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";

const ContactForm = ({ tutorEmail }) => {
    const form = useRef();
    const { user } = useAuth()
    const axiosPublic = useAxiosPublic();

    const sendEmail = async (e) => {
        e.preventDefault();
        const formField = e.target;

        const name = user?.name
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
                    //   remove the form data when successfully added to the database
                    formField.reset()
                }
            })
            .then(err => {
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
                <div className='w-full mt-4'>
                    <input type="submit" value="Send Request" className='w-full border input-bordered rounded focus:outline-none p-2 text-white bg-gradient-to-r from-[#29ADB2] to-[#0766AD] hover:bg-gradient-to-t hover:from-[#0766AD] hover:to-[#29ADB2]' />
                </div>
            </form>
        </div>
    );
};

export default ContactForm;