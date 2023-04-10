
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserProvider } from './UserContext';
import {Navbar,LoginPage,HomePage,RegisterPage,GroceryPage} from "./components";

const App = () => (
    <UserProvider>
        <BrowserRouter>

            <Navbar />
            <Routes>
                <Route path="/" exact element={<HomePage/>} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/items/grocery/" element={<GroceryPage />} />
                <Route path="/items/grocery/:category" element={<GroceryPage />} />
            </Routes>

        </BrowserRouter>
    </UserProvider>
);

export default App;
