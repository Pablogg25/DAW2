import { Link } from "react-router-dom";

function BarraDeNavegacion() {
  return (
    <>
      <nav className="navegacion">
        <ul>
          <li>
            <Link to="/">Inicio</Link>
          </li>
          <li>
            <Link to="/pacientes">Pacientes</Link>
          </li>
          <li>
            <Link to="/expedientes">Expedientes</Link>
          </li>
          <li>
            <Link to="/usuarios">Usuarios</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
export default BarraDeNavegacion;
