import axios from "axios";

export async function getVideoTrailer(
	// query: string,
	searchQuery: string
): Promise<string | undefined> {
	const response = await axios.get(
		"https://www.googleapis.com/youtube/v3/search",
		{
			params: {
				q: `${searchQuery} official trailer`,
				part: "snippet",
				type: "video",
				videoDefinition: "high",
				key: import.meta.env.VITE_YOUTUBE_API_KEY,
			},
		}
	);
	const videoAddress = await response.data.items[0].id.videoId;
	const url = "https://www.youtube.com/embed/" + videoAddress;
	console.log(response, url, "test2");
	return url;
}
