export const baraja = [
  // OROS
  { id: 1, palo: "oros", numero: 1, valor: 1 },
  { id: 2, palo: "oros", numero: 2, valor: 2 },
  { id: 3, palo: "oros", numero: 3, valor: 3 },
  { id: 4, palo: "oros", numero: 4, valor: 4 },
  { id: 5, palo: "oros", numero: 5, valor: 5 },
  { id: 6, palo: "oros", numero: 6, valor: 6 },
  { id: 7, palo: "oros", numero: 7, valor: 7 },
  { id: 8, palo: "oros", numero: "sota", valor: 0.5 },
  { id: 9, palo: "oros", numero: "caballo", valor: 0.5 },
  { id: 10, palo: "oros", numero: "rey", valor: 0.5 },

  // COPAS
  { id: 11, palo: "copas", numero: 1, valor: 1 },
  { id: 12, palo: "copas", numero: 2, valor: 2 },
  { id: 13, palo: "copas", numero: 3, valor: 3 },
  { id: 14, palo: "copas", numero: 4, valor: 4 },
  { id: 15, palo: "copas", numero: 5, valor: 5 },
  { id: 16, palo: "copas", numero: 6, valor: 6 },
  { id: 17, palo: "copas", numero: 7, valor: 7 },
  { id: 18, palo: "copas", numero: "sota", valor: 0.5 },
  { id: 19, palo: "copas", numero: "caballo", valor: 0.5 },
  { id: 20, palo: "copas", numero: "rey", valor: 0.5 },

  // ESPADAS
  { id: 21, palo: "espadas", numero: 1, valor: 1 },
  { id: 22, palo: "espadas", numero: 2, valor: 2 },
  { id: 23, palo: "espadas", numero: 3, valor: 3 },
  { id: 24, palo: "espadas", numero: 4, valor: 4 },
  { id: 25, palo: "espadas", numero: 5, valor: 5 },
  { id: 26, palo: "espadas", numero: 6, valor: 6 },
  { id: 27, palo: "espadas", numero: 7, valor: 7 },
  { id: 28, palo: "espadas", numero: "sota", valor: 0.5 },
  { id: 29, palo: "espadas", numero: "caballo", valor: 0.5 },
  { id: 30, palo: "espadas", numero: "rey", valor: 0.5 },

  // BASTOS
  { id: 31, palo: "bastos", numero: 1, valor: 1 },
  { id: 32, palo: "bastos", numero: 2, valor: 2 },
  { id: 33, palo: "bastos", numero: 3, valor: 3 },
  { id: 34, palo: "bastos", numero: 4, valor: 4 },
  { id: 35, palo: "bastos", numero: 5, valor: 5 },
  { id: 36, palo: "bastos", numero: 6, valor: 6 },
  { id: 37, palo: "bastos", numero: 7, valor: 7 },
  { id: 38, palo: "bastos", numero: "sota", valor: 0.5 },
  { id: 39, palo: "bastos", numero: "caballo", valor: 0.5 },
  { id: 40, palo: "bastos", numero: "rey", valor: 0.5 },
];

export function barajarCartas() {
  let array = [];
  for (let i = 1; i <= 40; i++) {
    array.push(i);
  }
  return array.sort(() => Math.random() - 0.5);
}

export function recuperarCarta(id) {
  let carta = baraja.find((c) => c.id === id);
  return carta;
}

export function sumarCartas(ids) {
  let suma = 0;
  ids.forEach((id) => {
    let carta = recuperarCarta(id);
    suma += carta.valor;
  });
  return suma;
}
