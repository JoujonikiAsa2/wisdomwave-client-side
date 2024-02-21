import Loader from "../../SharedComponents/Loader/Loader";
import { FcNext, FcPrevious } from "react-icons/fc";
import BannerSlider from "../LandingPage/Components/BannerSlider";
import slider2 from '../LandingPage/Components/discussion.json'
import useDiscussions from "../../hooks/useDiscussions";
import DiscussionCard from "./DiscussionCard";

const Discussions = () => {
    const bg = "bg-[#C5E898]"
    const textColor = "text-[#0766AD]"
    const {discussions, isLoading, isError} = useDiscussions()

    if (isLoading) {
        return <Loader></Loader>;
    }

    if (isError) {
        return <div className="text-center min-h-[80vh] flex justify-center items-center">Error loading discussions</div>;
    }

    console.log("discussions", discussions);

    return (
        <div className=" pb-10 space-y-10 bg-[#F3F3F3] min-h-screen">
            <BannerSlider slider={slider2} bg={bg} textColor={textColor} sliderText="Share your problems with others and get Help"></BannerSlider>
            {/* All discussions */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center items-center justify-items-center gap-4 mx-[5vw]">
                {discussions.map((discussion) => (
                    // <h2>{discussion._id}</h2>
                    <DiscussionCard discussion={discussion}></DiscussionCard>
                ))}

            </div>
        </div>
    );
};

export default Discussions;