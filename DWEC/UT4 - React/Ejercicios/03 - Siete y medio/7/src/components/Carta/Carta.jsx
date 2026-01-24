function Carta({ numero, palo }) {
  return (
    <>
      <div className="carta">
        <p>{numero}</p>
        <p>{palo}</p>
      </div>
    </>
  );
}
export default Carta;
