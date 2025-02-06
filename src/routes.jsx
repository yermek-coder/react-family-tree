import { Routes, Route } from "react-router";
import Layout from "@/components/layout/Layout.jsx";
import Home from "@/pages/Home.jsx";
import Info from "@/pages/Info.jsx";
import Create from "@/pages/Create.jsx";
import Search from "@/pages/Search.jsx";
import Connection from "@/pages/Connection.jsx";
import ConnectionResult from "@/pages/connection/Result.jsx";

export const AppRoutes = () => (
    <Routes>
        <Route element={<Layout />}>
            <Route index element={<Home />}></Route>
            <Route path="/info" element={<Info />}></Route>
            <Route path="/create" element={<Create />}></Route>
            <Route path="/search" element={<Search />}></Route>
            <Route path="connection">
                <Route index element={<Connection />} />
                <Route path="result" element={<ConnectionResult />} />
            </Route>
        </Route>
    </Routes>
);