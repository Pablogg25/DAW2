import { useContext } from "react";
import { SeguridadContext } from "../context/SeguridadProvider";

function HomePage() {
  const { datos } = useContext(SeguridadContext);
  console.log("DATOS:", datos);

  return <p>Home Page</p>;
}

export default HomePage;
