import { NavLink } from "react-router";

export default function Header() {
    return (<div className="container">
        <header className="d-flex justify-content-center py-3">
            <ul className="nav nav-pills">
                <li className="nav-item"><NavLink to="/" className="nav-link" aria-current="page">HOME</NavLink></li>
                <li className="nav-item"><NavLink to="/info" className="nav-link">INFO</NavLink></li>
                <li className="nav-item"><NavLink to="/create" className="nav-link">ADD PERSON</NavLink></li>
                <li className="nav-item"><NavLink to="/search" className="nav-link">SEARCH FAMILY MEMBER </NavLink></li>
                <li className="nav-item"><NavLink to="/connection" className="nav-link">FIND A FAMILY CONNECTION</NavLink></li>
            </ul>
        </header>
    </div>)
}