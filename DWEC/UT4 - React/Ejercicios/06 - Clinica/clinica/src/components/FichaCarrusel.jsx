function FichaCarrusel({ paciente }) {
  const { nombre, dni, email, seguroMedico } = paciente;

  return (
    <div className="fichaCarrusel">
      <h3>{nombre}</h3>
      <p>DNI: {dni}</p>
      <p>Email: {email}</p>
      <p>Seguro: {seguroMedico || "Sin seguro"}</p>
    </div>
  );
}

export default FichaCarrusel;
