
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserProvider } from './UserContext';
import {Navbar,LoginPage,HomePage,RegisterPage,GroceryPage,ManagementPage,OrdersPage, CreateOrder, ShoppingListPage, ItemManagementPage, HouseholdPage, PharmacyPage, SearchResults} from "./components";

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
                <Route path="/management" element={<ManagementPage />} />
                <Route path="/management/orders" element={<OrdersPage />} />
                <Route path="/management/orders/create" element={<CreateOrder />} />
                <Route path="/shopping_list" element={<ShoppingListPage />} />
                <Route path="/management/items" element={<ItemManagementPage />} />
                <Route path="/items/search/:search" element={<SearchResults />} />
                <Route path="/items/search/:search/:category" element={<SearchResults />} />
                <Route path="/items/household/" element={<HouseholdPage />} />
                <Route path="/items/household/:category" element={<HouseholdPage />} />
                <Route path="/items/pharmacy/" element={<PharmacyPage />} />
            </Routes>

        </BrowserRouter>
    </UserProvider>
);

export default App;
