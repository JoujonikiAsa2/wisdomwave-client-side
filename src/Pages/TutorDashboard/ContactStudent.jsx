import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useRef } from "react";
import { IoClose } from "react-icons/io5";

const ContactStudent = ({ studentEmail, openForm , setOpenForm}) => {
    const form = useRef();
    const { user } = useAuth()
    const axiosPublic = useAxiosPublic();

    const sendEmail = async (e) => {
        e.preventDefault();
        const formField = e.target;

        const name = user?.displayName
        const phone = formField.user_phone.value;
        const email = studentEmail
        const message = formField.message.value;
        const userEmail = user?.email
        const responseStatus = 'pending'

        const newMessage = { name, phone, email, message, userEmail, responseStatus };

        await axiosPublic.post("/api/messages", newMessage)
            .then(res => {
                console.log(res.data)
                if (res.data.status === 'success') {
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
        <div className="w-full flex justify-center items-center">
            <div className='absolute  top-0 right-0 lg:top-[4.3rem] md:top-[4.3rem] lg:-right-[1rem] md:-right-[1rem]  justify-center items-center'>
                <button className={`${openForm === true ? "btn btn-sm te capitalize text-white bg-slate-500" : 'hidden'}`} onClick={() => setOpenForm(false)}>{openForm ? <IoClose></IoClose> : ""}</button>
            </div>
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
                <div className='w-full mt-4'>
                    <input type="submit" value="Send Request" className='w-full border input-bordered rounded focus:outline-none p-2 text-white bg-gradient-to-r from-[#29ADB2] to-[#0766AD] hover:bg-gradient-to-t hover:from-[#0766AD] hover:to-[#29ADB2]' />
                </div>
            </form>
        </div>
    );
};

export default ContactStudent;