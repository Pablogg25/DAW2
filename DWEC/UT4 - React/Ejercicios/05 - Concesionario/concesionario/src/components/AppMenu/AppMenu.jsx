import { Link } from "react-router-dom";
import "./AppMenu.css";
function AppMenu() {
  return (
    <>
      <nav className="navegacion">
        <ul>
          <li>
            <Link to="/">Inicio</Link>
          </li>
          <li>
            <Link to="/mantenimiento">Mantenimiento</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          {/* Aqui hago pruebas API por ahora */}
          <li>
            <Link to="/error">ErrorPage Pruebas</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
export default AppMenu;
