//Variables

const marca = document.querySelector("#marca");
const year = document.querySelector("#year");
const minimo = document.querySelector("#minimo");
const maximo = document.querySelector("#maximo");
const puertas = document.querySelector("#puertas");
const transmision = document.querySelector("#transmision");
const color = document.querySelector("#color");
const max = new Date().getFullYear();
const min = max - 10;

//////////Contenedor para los resultados/////////////////
const resultado = document.querySelector("#resultado");
//Generar objeto con la busqueda | Para tener todo agrupado en una sola variable
const datosBusqueda = {
  marca: "",
  year: "",
  minimo: "",
  maximo: "",
  puertas: "",
  transmision: "",
  color: "",
};

////////////////////////////////////////////////////////

//Eventos para los select de busqueda

marca.addEventListener("change", (e) => {
  datosBusqueda.marca = e.target.value;
  filtrarAuto();
});

year.addEventListener("change", (e) => {
  datosBusqueda.year = e.target.value;
  filtrarAuto();
});

minimo.addEventListener("change", (e) => {
  datosBusqueda.minimo = e.target.value;
  filtrarAuto();
});

maximo.addEventListener("change", (e) => {
  datosBusqueda.maximo = e.target.value;
  filtrarAuto();
});

puertas.addEventListener("change", (e) => {
  datosBusqueda.puertas = e.target.value;
  filtrarAuto();
});

transmision.addEventListener("change", (e) => {
  datosBusqueda.transmision = e.target.value;
  filtrarAuto();
});

color.addEventListener("change", (e) => {
  datosBusqueda.color = e.target.value;
  filtrarAuto();
});

//Eventos

document.addEventListener("DOMContentLoaded", () => {
  mostrarAutos(autos); //Muestra los autos al cargar

  llenarSelect(); //Llena las opciones de 'Año'
});

//Funciones

//Funcion para mostrar la 'Base de datos' (objetos del array auto) completa
function mostrarAutos(autos) {
  limpiarHTML(); // Elimina el HTML previo
  autos.forEach((auto) => {
    const autoHTML = document.createElement("P");
    //Aplicamos destructuring (desestructuracion).
    const { marca, modelo, year, puertas, transmision, precio, color } = auto;

    autoHTML.textContent = `

    ${marca} ${modelo} - ${year} - ${puertas} Puertas - Transmision: ${transmision} - 
    Precio: ${precio} - Color: ${color}
    
    `;

    //Insertar el HTML dentro del div 'resultado'.
    resultado.appendChild(autoHTML);
  });
}

//Limpiar HTML
function limpiarHTML() {
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }
}

//Funcion para llenar las opciones del select year
function llenarSelect() {
  for (i = max; i >= min; i--) {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = i;
    year.appendChild(option); //Esto agrega cada opcion a la variable Year que es el select
  }
}

//Funcion que filtra en base a la busqueda
function filtrarAuto() {
  const resultado = autos
    .filter(filtrarMarca)
    .filter(filtrarYear)
    .filter(filtrarMinimo)
    .filter(filtrarMaximo)
    .filter(filtrarPuertas)
    .filter(filtrarTransmision)
    .filter(filtrarColor);

  if (resultado.length) {
    mostrarAutos(resultado);
  } else {
    noResultado();
  }
}
function noResultado() {
  limpiarHTML();
  const noResultado = document.createElement("div");
  noResultado.classList.add("alerta", "error");
  noResultado.textContent = "No hay resultados para mostrar";
  resultado.appendChild(noResultado);
}
function filtrarMarca(auto) {
  const { marca } = datosBusqueda;
  if (marca) {
    return auto.marca === marca;
  }
  return auto;
}
function filtrarYear(auto) {
  const { year } = datosBusqueda;
  if (year) {
    return auto.year === parseInt(year);
  }
  return auto;
}
function filtrarMinimo(auto) {
  const { minimo } = datosBusqueda;
  if (minimo) {
    return auto.precio >= minimo;
  }
  return auto;
}
function filtrarMaximo(auto) {
  const { maximo } = datosBusqueda;
  if (maximo) {
    return auto.precio <= maximo;
  }
  return auto;
}
function filtrarPuertas(auto) {
  const { puertas } = datosBusqueda;
  if (puertas) {
    return auto.puertas === parseInt(puertas);
  }
  return auto;
}
function filtrarTransmision(auto) {
  const { transmision } = datosBusqueda;
  if (transmision) {
    return auto.transmision === transmision;
  }
  return auto;
}
function filtrarColor(auto) {
  const { color } = datosBusqueda;
  if (color) {
    return auto.color === color;
  }
  return auto;
}
