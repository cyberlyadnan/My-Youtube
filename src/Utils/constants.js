import {My_API_KEY} from "../myapi"
export const YOUTUBE_VIDEO_API = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=IN&key=${My_API_KEY}`;
export const YOUTUBE_CHANNEL_API = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&key=${My_API_KEY}&id=`;
export const YOUTUBE_SEARCH_API = "http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q="
export const YOUTUBE_VIDEO_SUGGESTION_API = `https://youtube.googleapis.com/youtube/v3/playlists?part=snippet%2CcontentDetails&channelId=UC_x5XG1OV2P6uZZ5FSM9Ttw&maxResults=25&key=${My_API_KEY}`
export const YOTUBE_VIDEO_CATEGORY_API = `https://youtube.googleapis.com/youtube/v3/videoCategories?part=snippet&regionCode=US&key=${My_API_KEY}`
export const YOUTUBE_SEARCH_RESULTS_VIDEO_API = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&key=${My_API_KEY}&q=`
// export const YOUTUBE_SEARCH_RESULTS_VIDEO_API =`https://youtube.googleapis.com/youtube/v3/search?part=snippet&location=21.5922529%2C-158.1147114&locationRadius=10mi&type=video&key=${My_API_KEY}&q=`
export const YOUTUBE_SINGLE_VIDEO_DETAILS_API = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&key=${My_API_KEY}&id=`
export const YOUTUBE_LIVE_CHAT_API = `https://youtube.googleapis.com/youtube/v3/liveChat/messages?part=snippet%2CauthorDetails&key=${My_API_KEY}&liveChatId=`
export const YOUTUBE_GET_LIVECHAT_ID = `https://www.googleapis.com/youtube/v3/videos?part=liveStreamingDetails&id=a2PEz-5shhQ&key=${My_API_KEY}&id=`