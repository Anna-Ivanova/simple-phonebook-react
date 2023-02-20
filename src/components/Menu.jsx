import { NavLink } from "react-router-dom";
import('./Menu.scss');

export default function Menu() {

    return (
        <ul className="menu-list">
            <li>
                <NavLink to="/">Contacts</NavLink>
            </li>
            <li>
                <NavLink to="/form">Form</NavLink>
            </li>

        </ul>




    )
}