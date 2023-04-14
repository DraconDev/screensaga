import MovieList from "../components/MovieList";
import MainLayout from "../layout/MainLayout";
import Swiper from "../components/Swiper";

function App() {
	return (
		<MainLayout>
			<Swiper />
			<MovieList />
		</MainLayout>
	);
}

export default App;
