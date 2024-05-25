import axios from "axios";
import { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";

const CreateAssignments = () => {
    const { user } = useAuth()
    const [startDate, setStartDate] = useState()
    const navigate = useNavigate()

    const handleCreateASsignment = (e) => {
        e.preventDefault()
        const form = e.target
        const title = form.title.value
        const description = form.description.value
        const marks = form.marks.value
        const question = form.question.value
        const dueDate = startDate
        const instuctorEmail = user?.email 

        const assignmnent = { title, description, marks, question, dueDate, creatorEmail }
        console.log(assignmnent)

        axios.post(`/api/assignments`, assignmnent)
            .then(res => {
                console.log(res.data)
                if (res.data.insertedId
                    != null) {
                    Swal.fire({
                        title: "Good job!",
                        text: "Your assginment added successfully",
                        icon: "success"
                    });
                    navigate('/assignments')
                }
            })
            .catch(error => {
                console.log(error)
                toast.success(error)
            })

    }
    return (
        <div className="w-full py-8 flex  flex-col justify-center items-center pt-32" >
            <form onSubmit={handleCreateASsignment} className="lg:w-[40vw] md:w-[50vw] w-[80vw]">
                <div className="w-full flex flex-col justify-center items-center">
                    <div className="w-full flex flex-col justify-center">
                        <label className="flex flex-col gap-3">
                            <span>Title</span>
                            <input type="text" name="title"  className="input input-bordered  max-w-full" required />
                        </label>
                    </div>
                    <div className="w-full flex flex-col justify-center">
                        <label className="flex flex-col gap-3 pb-3">
                            <span>Description</span>
                            <input type="text" name="description" className="input input-bordered max-w-full" required />
                        </label>
                    </div>
                    <div className="w-full flex flex-col justify-center">
                        <label className="flex flex-col gap-3 pb-3">
                            <span>Total arks</span>
                            <input type="text" name="marks" className="input input-bordered max-w-full" required />
                        </label>
                    </div>
                    <div className="w-full flex flex-col justify-center">
                        <label className="flex flex-col gap-3 pb-3">
                            <span>Question URL</span>
                            <input type="text" name="question" className="input input-bordered max-w-full" required />
                        </label>
                    </div>
                    <div className="w-full flex flex-col justify-center">
                        <label className="flex flex-col gap-3 pb-3">
                            <span>Due Date</span>
                            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} dateFormat="MM/dd/yyyy" className="input input-bordered max-w-full" required />
                        </label>
                    </div>
                </div>
                <div className="flex justify-center items-center">
                    <input type="submit"  value="Create Assignment" className="text-center input input-bordered max-w-full bg-[#55C360] font-bold text-white " />
                </div>
            </form>
        </div>
    );
};

export default CreateAssignments;