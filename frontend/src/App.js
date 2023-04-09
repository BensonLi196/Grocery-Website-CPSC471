
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//
import {Navbar,LoginPage,HomePage,RegisterPage} from "./components";

const App = () => (
    <BrowserRouter>

        <Navbar />
        <Routes>
        <Route path="/" exact element={<HomePage/>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        </Routes>

    </BrowserRouter>
);

export default App;
