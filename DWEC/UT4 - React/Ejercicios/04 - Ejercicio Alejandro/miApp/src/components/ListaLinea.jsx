import { useNavigate, Link } from "react-router-dom";
function ListaLinea({ modulo }) {
  const { id = 0, nombre = "", horas = 0 } = modulo;
  const navegar = useNavigate();
  const handleClick = () => {
    navegar(`/detalles/${id}`);
  };
  const handleClickNoParametro = () => {
    navegar(`/detallesstate/`, { state: { id: id } });
  };
  return (
    <p>
      <strong>{nombre}</strong> - Horas: {horas}
      <br />
      <button onClick={handleClick}>Navegar con id</button>
      <Link to={`/detalles/${id}`}>Link con Id</Link>
      <br />
      <button onClick={handleClickNoParametro}>Navegar con State</button>
      <Link to={"/detallesstate"} state={{ id: id }}>
        Link con State
      </Link>
    </p>
  );
}
export default ListaLinea;
