document.addEventListener("DOMContentLoaded", function () {
  let arrayDatos = {
    salarioBasico: [
      parseFloat(localStorage.getItem("salario_basico")),
      "fila-sb",
    ],
    horaFestivaDiurna: [
      parseFloat(localStorage.getItem("hora_festiva_diurna")),
      "fila-hf",
    ],
    horaFestivaCompensada: [
      parseFloat(localStorage.getItem("hora_festiva_compensada")),
      "fila-hd",
    ],
    vacacionesDisfrutadas: [
      parseFloat(localStorage.getItem("vacaciones_disfrutadas")),
      "fila-vac",
    ],
    auxilio_alimento: [
      parseFloat(localStorage.getItem("auxilio_alimento")),
      "fila-aa",
    ],
    auxilioTransporte: [
      parseFloat(localStorage.getItem("auxilio_transporte")),
      "fila-at",
    ],
    aporte_pension: [
      parseFloat(localStorage.getItem("aporte_pension")),
      "fila-ap",
    ],
    aporte_salud: [parseFloat(localStorage.getItem("aporte_salud")), "fila-as"],
    aporte_salud: [parseFloat(localStorage.getItem("aporte_salud")), "fila-as"],
    anticipo_aporte_pension: [
      parseFloat(localStorage.getItem("anticipo_aporte_pension")),
      "fila-aap",
    ],
    anticipo_aporte_salud: [
      parseFloat(localStorage.getItem("anticipo_aporte_salud")),
      "fila-aas",
    ],
    total: [parseFloat(localStorage.getItem("total"))],
  };

  //Llenado de tabla de valores ingresados
  let arrayTiempoIngresado = {
    hl: [localStorage.getItem("horas-laboradas"), "hl-dato"],
    hf: [localStorage.getItem("horas-festivas"), "hf-dato"],
    hd: [localStorage.getItem("horas-domingo"), "hd-dato"],
    dv: [localStorage.getItem("dias-vacaciones"), "dv-dato"],
    da: [localStorage.getItem("dias-ausente"), "da-dato"],
  };
  //llenado tabla de tiempo ingresado
  Object.values(arrayTiempoIngresado).forEach((dato) => {
    document.getElementById(dato[1]).innerHTML = dato[0];
  });
  Object.entries(arrayDatos).forEach(([clave, dato]) => {
    if (clave != "total") {
      if (dato[0] == 0) {
        document.getElementById(dato[1]).classList.add("hide");
      }
    }
  });

  function coloresDinamicosLista() {
    const filasVisibles = document.querySelectorAll("tbody tr:not(.hide)");
    filasVisibles.forEach((filas, index) => {
      filas.style.backgroundColor = index % 2 === 0 ? "#424242" : "transparent";
    });
  }
  coloresDinamicosLista();

  //Formatear valores
  let arrayFormateado = {};
  Object.entries(arrayDatos).forEach(([clave, dato]) => {
    dato[0] = dato[0].toLocaleString("es-ES", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    arrayFormateado[clave] = dato[0];
  });
  //llenado de valores de la tabla
  let arrayValoresID = {
    salarioBasicoID: ["salario-basico-valor", arrayFormateado.salarioBasico],
    auxilioTransporteID: [
      "auxilio-transporte-valor",
      arrayFormateado.auxilioTransporte,
    ],
    auxilio_alimentoID: [
      "aux-alimento-valor",
      arrayFormateado.auxilio_alimento,
    ],
    horasFestivasId: ["hf-valor", arrayFormateado.horaFestivaDiurna],
    horasDomingoID: ["hd-valor", arrayFormateado.horaFestivaCompensada],
    aportePensionID: ["aporte-pension", arrayFormateado.aporte_pension],
    aporteSaludID: ["aporte-salud", arrayFormateado.aporte_salud],
    vacacionesID: ["vacaciones-valor", arrayFormateado.vacacionesDisfrutadas],
    anticipo_aporte_pensionID: [
      "anticipo-aporte-pension",
      arrayFormateado.anticipo_aporte_pension,
    ],
    anticipo_aporte_saludID: [
      "anticipo-aporte-salud",
      arrayFormateado.anticipo_aporte_salud,
    ],
    totalID: ["total", arrayFormateado.total],
  };
  Object.values(arrayValoresID).forEach((dato) => {
    document.getElementById(dato[0]).innerHTML = "$" + dato[1];
  });
});

function inicializarHistorial() {
  if (!localStorage.getItem("historialTotales")) {
    localStorage.setItem("historialTotales", JSON.stringify([])); // Crear un historial vacío
    console.log("Historial creado en localStorage.");
  }
  const totalGuardar = document.getElementById("total").innerHTML;
  console.log("Registro guardado en el historial." + totalGuardar);
  guardarRegistro(totalGuardar);
}
function guardarRegistro(total) {
  let historial = JSON.parse(localStorage.getItem("historialTotales")) || [];
  const id = Date.now();
  //Obtener la fecha actual
  const fechaActual = new Date().toLocaleString("es-ES", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const registro = {
    id: id,
    total: total,
    fecha: fechaActual,
  };

  historial.push(registro); // Agregar nuevo total

  console.log("Historial actualizado: " + historial);
  localStorage.setItem("historialTotales", JSON.stringify(historial));
  let mensaje = document.getElementById("confirmacion-registro");

  mensaje.style.left = Event.pageX + "px"; // Usa el evento correctamente
  mensaje.style.top = Event.pageY - 10 + "px"; // Ajusta la posición

  mensaje.style.display = "block"; // Hacer visible el mensaje
  mensaje.classList.add("mostrar");

  // Esperar 5 segundos antes de iniciar la animación de ocultar
  setTimeout(() => {
    mensaje.classList.add("ocultar");

    // Después de la animación, ocultar completamente
    setTimeout(() => {
      mensaje.classList.remove("mostrar", "ocultar");
      mensaje.style.display = "none";
    }, 500);
  }, 2000);
}
function limpiarHistorial() {
  if (localStorage.getItem("historialTotales")) {
    localStorage.removeItem("historialTotales"); // Eliminar el historial del localStorage
    console.log("Historial eliminado.");
  } else {
    console.log("No hay historial para eliminar.");
  }
}
function mostrarHistorial() {
  let historial = JSON.parse(localStorage.getItem("historialTotales")) || [];

  historial.forEach((registro) => {
    console.log("fecha: " + registro.fecha);
    console.log("total: " + registro.total);
  });
}
