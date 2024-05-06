import React, { useEffect } from 'react';
import { axiosPublic } from '../../../hooks/useAxiosPublic';
import { useState } from 'react';
// import shootingBall from '../../../assets/videos/Shooting Ball_201-15-13928.mp4'
// import { Player } from 'video-react';
// import 'video-react/dist/video-react.css'; // import css
import ReactPlayer from 'react-player/lazy'
import { useParams } from 'react-router-dom';
import Loader from '../../../SharedComponents/Loader/Loader';
// import ReactPlayer from 'react-player';
// import { Dropbox } from 'dropbox';


const CourseDashboard = () => {
    const YOUR_API_KEY = import.meta.env.VITE_YOUR_API_KEY
    console.log(YOUR_API_KEY)
    const { playlistId } = useParams()

    // Primary state for duration
    const [state, setState] = useState({
        duration: 0
    });
    const [channelVideos, setChannelVideos] = useState([])
    const [youTubeVideoId, setYouTubeVideoId] = useState(null)



    // Vimeo api : https://v1.nocodeapi.com/asa111/vimeo/pILXcxTyYRsQHvDx/videos?user_id=user217017665

    useEffect(() => {
        axiosPublic.get(`https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=15&playlistId=${playlistId}&key=${YOUR_API_KEY}`)
            .then((res) => {
                setChannelVideos(res.data.items)
                // console.log(res.data)
            })
            .catch(e => {
                console.log(e.message)
            })
    }, [])


    //function to update direction by click at the course title
    const handleDuration = duration => {
        console.log('onDuration', duration);
        setState({ ...state, duration });
    };

    console.log(channelVideos)

    // play the video content on click at the title 
    const playVideo = (videoId) => {
        setYouTubeVideoId(videoId)
    }

    if(channelVideos.length == 0){
        return <Loader></Loader>
    }

    return (
        <div className='lg:pt-28 md:pt-28 pt-20 flex flex-col-reverse lg:flex-row md:flex-row justify-center lg:gap-10 md:gap-10 gap-10'>
            <div className=''>
                <div className='bg-gray-400 rounded-t-md p-1'>
                    <h2 className='text-xl pb-2'>Content</h2>
                </div>

                {/* show all contents of the play list */}
                <div className='h-[500px] overflow-y-scroll mb-10 px-4 bg-gray-100 rounded-b-md lg:w-[22.2rem] md:w-[22.2rem overflow-x-hidden'>
                    {
                        channelVideos.map((item, index) => (index + 1) % 7 !== 0
                            ?
                            
                            <div className='text-sm lg:w-80 md:w-80 w-full p-4 items-center cursor-pointer border my-2 rounded-xl bg-white' onClick={() => playVideo(item.snippet.resourceId.videoId)}>
                                <p>{index + 1}.&nbsp;&nbsp;{item.snippet.title}</p>
                            </div>
                            :
                            <div className='text-sm lg:w-80 md:w-80 w-full p-4 items-center cursor-pointer border my-2 rounded-xl bg-white flex justify-between'>
                                <p>{index + 1}. Join Live Class</p>
                                <button className='btn btn-sm capitalize bg-gradient-to-r from-[#29ADB2] to-[#0766AD] hover:bg-gradient-to-t hover:from-[#0766AD] hover:to-[#29ADB2] text-white'>Click here</button>
                            </div>)
                    }
                </div>
            </div>

            <div className='lg:w-[50vw] md:w-[50vw] h-[400px] w-full lg:p-0 md:p-0 p-2 bg-gray-100'>
                {
                    youTubeVideoId === null ? <iframe width="560" height="315" src="https://www.youtube.com/embed/" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" style={{ width: "100%", height: "100%" }} allowfullscreen></iframe> : 
                    // used package to play video
                    <ReactPlayer url={`https://www.youtube.com/watch?v=${youTubeVideoId}`}
                        config={{
                            youtube: {
                                playerVars: { showinfo: 0 }
                            }
                        }}
                        controls
                        onDuration={handleDuration}
                        width={"100%"}
                        style={{ width: "100", height: "100%", padding: "10px", border: "1px solid #808080" }}
                    />
                }
                <h2 className='py-2'>Total Duration: <Duration seconds={state.duration}></Duration></h2>
            </div>
        </div>
    );
};

export default CourseDashboard;


// coverted the total secont into hours:minutes:seconds
const Duration = ({ seconds }) => {
    const format = (seconds) => {
        const date = new Date(seconds * 1000);
        const hh = date.getUTCHours();
        const mm = date.getUTCMinutes();
        const ss = pad(date.getUTCSeconds());
        // The pad function ensures that minutes are always represented by at least two digits (e.g., '01' instead of '1').


        if (hh) {
            return `${hh}:${pad(mm)}:${ss}`;
        }
        return `${mm}:${ss}`;
    };

    const pad = (string) => {
        return ('0' + string).slice(-2);
    };

    return (
        <time dateTime={`P${Math.round(seconds)}S`}>
            {format(seconds)}
        </time>
    );
};