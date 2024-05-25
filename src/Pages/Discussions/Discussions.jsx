import Loader from "../../SharedComponents/Loader/Loader";
import slider from '../LandingPage/Components/discussion.json'
import useDiscussions from "../../hooks/useDiscussions";
import DiscussionCard from "./DiscussionCard";
import Banner from "../LandingPage/Components/Banner";

const Discussions = () => {
    const { discussions, isLoading, isError } = useDiscussions()

    if (isLoading) {
        return <Loader></Loader>;
    }

    if (isError) {
        return <div className="text-center min-h-[80vh] flex justify-center items-center">Error loading discussions</div>;
    }

    console.log("discussions", discussions);

    return (
        <div className=" pb-10 space-y-10 min-h-screen">
            <Banner slider={slider} sliderText="Share your problems" subText="It is a great place to share your problems with others"></Banner>
            {/* All discussions */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center items-center justify-items-center gap-4 mx-[5vw] h-[screen]">
                {discussions.map((discussion) => (
                    // <h2>{discussion._id}</h2>
                    <div key={discussion._id}>
                        <DiscussionCard discussion={discussion}></DiscussionCard>
                    </div>
                ))}

            </div>
        </div>
    );
};

export default Discussions;