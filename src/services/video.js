import axios from "@/config/axios";

async function watchVideo(video_id) {
    try {
        await axios.patch(`/videos/watch/${video_id}`);
    } 
    catch (error) {
        console.log(error)
    }
}

export {
    watchVideo
}