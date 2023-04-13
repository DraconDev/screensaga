import axios from "axios";

export async function fetchWiki(query: string) {
	const apiUrl = "https://en.wikipedia.org/api/rest_v1/page/summary/";
	// const apiUrl =
	// 	"https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=";
	const response = await axios.get(apiUrl + "movie");
	const data = response.data;
	// const pageId = Object.keys(response.data.query.pages)[0];
	// const extract = response.data.query.pages[pageId].extract;



	// return extract;
}
