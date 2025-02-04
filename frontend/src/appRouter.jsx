import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/NavBar";

export const AppRouter = () => {
    return (
        <Router>
            <>
            <Navbar />

                <Routes>


                    {/* 404 - Not Found (fallback) */}
                    <Route path="*/" element={<h1>404 - Not Found</h1>} />
                </Routes>
            </>
        </Router>
    );
};