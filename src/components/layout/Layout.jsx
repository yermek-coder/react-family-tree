import { Outlet } from "react-router";
import Header from "@/components/layout/Header.jsx"

export function meta() {
    return [
        { title: "New React Router App" },
        { name: "description", content: "Welcome to React Router!" },
    ];
}

export default function Home() {
    return (<div className="container">
        <Header />
        <Outlet />
    </div>);
}