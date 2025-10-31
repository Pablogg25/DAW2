function calcularCambio(cantidad) {
  let billetes = [200, 100, 50, 10, 5, 2, 1];
  let resultado = [];

  for (let i = 0; i < billetes.length; i++) {
    let valor = billetes[i];
    let num = Math.floor(cantidad / valor);

    if (num > 0) {
      resultado.push(valor + "€ x " + num);
      cantidad -= valor * num;
    }
  }

  return resultado;
}

function cobrar() {
  let producto = Number(document.getElementById("producto").value);
  let entregado = Number(document.getElementById("entregado").value);

  if (entregado < producto) {
    document.getElementById("total").textContent = "Falta dinero";
    document.getElementById("cambio").textContent = "";
    return;
  }

  let devolver = entregado - producto;
  let resultadoCambio = calcularCambio(devolver);

  document.getElementById("total").textContent =
    "Total a devolver: " + devolver + "€";

  let texto = "";
  for (let i = 0; i < resultadoCambio.length; i++) {
    texto += resultadoCambio[i] + "<br>";
  }
  document.getElementById("cambio").innerHTML = texto;
}
