import MovieList from "../components/MovieList";
import MainLayout from "../layout/MainLayout";
import Swiper from "../components/Swiper";
import { Box } from "@mui/material";

function App() {
    return (

            <MainLayout>
                <Swiper />
                <MovieList />
            </MainLayout>
    
    );
}

export default App;
