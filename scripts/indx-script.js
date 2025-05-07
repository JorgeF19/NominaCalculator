document.addEventListener("DOMContentLoaded", function () {
  let registros = JSON.parse(localStorage.getItem("historialTotales")) || [];
  let tabla = document.getElementById("tabla-registros");

  registros.forEach((registro) => {
    let pruebaxd = "xd";
    let fila = document.createElement("tr");

    let celdaFecha = document.createElement("td");
    let contenedor = document.createElement("div");
    contenedor.classList.add("contenedor-texto-icono");

    let textoFecha = document.createElement("span");
    textoFecha.textContent = registro.fecha;

    let trashIcon = document.createElement("img");
    trashIcon.src = "src/trash-icon.png";
    trashIcon.setAttribute("id", "btn-eliminar-registro");
    trashIcon.style.height = "20px";
    trashIcon.style.width = "20px";
    trashIcon.setAttribute("onclick", `eliminarUnRegistro(${registro.id})`);

    contenedor.appendChild(trashIcon);
    contenedor.appendChild(textoFecha);

    celdaFecha.appendChild(contenedor);

    fila.appendChild(celdaFecha);

    let celdaTotal = document.createElement("td");
    celdaTotal.innerHTML = registro.total;
    fila.appendChild(celdaTotal);

    tabla.appendChild(fila);
  });
});

function exportarCSV() {
  const registros = JSON.parse(localStorage.getItem("historialTotales")) || [];
  let csvContent =
    "data:text/csv;charset=utf-8,Fecha,Total\n" +
    registros
      .map((registro) => `${registro.fecha},${registro.total}`)
      .join("\n");
  const enlace = document.createElement("a");
  enlace.href = encodeURI(csvContent);
  enlace.download = "historialTotales.csv";
  document.body.appendChild(enlace);
  enlace.click();
  document.body.removeChild(enlace);
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

function limpiarRegistros() {
  const mensaje = document.getElementById("borrarRegistro");
  mensaje.classList.add("show");
  console.log(
    "Limpiar registros" + document.getElementsByClassName("borrarRegistro")
  );
}
function eliminarRegistros() {
  const mensaje = document.getElementById("borrarRegistro");
  mensaje.classList.remove("show");
  mensaje.classList.add("hide");
  setTimeout(() => {
    location.reload();
    localStorage.removeItem("historialTotales");
  }, 500);

  console.log("Historial borrado.");
}

function eliminarUnRegistro(id) {
  let historial = JSON.parse(localStorage.getItem("historialTotales")) || [];

  historial = historial.filter((registro) => registro.id != id);
  localStorage.setItem("historialTotales", JSON.stringify(historial));

  location.reload();
}
function cancelarEliminar() {
  document.getElementById("borrarRegistro").classList.remove("show");
  document.getElementById("borrarRegistro").classList.add("hide");

  console.log("Cancelando borrado de historial.");
}

let texto = document.getElementById("firma");

texto.addEventListener("mouseenter", function () {
  texto.style.opacity = "0"; // Hace desaparecer el texto
  setTimeout(() => {
    texto.innerHTML = "Creado por Jorge Ferrer";
    texto.style.opacity = "1"; // Hace que reaparezca con transición
  }, 500);
});

texto.addEventListener("mouseleave", function () {
  texto.style.opacity = "0";
  setTimeout(() => {
    texto.innerHTML = "JF";
    texto.style.opacity = "1";
  }, 500);
});

function calcularPQ() {
  document.getElementById("pantalla-carga").style.display = "flex";
  const horas_laboradas = document.getElementById("hl-value").value;
  const horas_festivas = document.getElementById("hf-value").value;
  const horas_domingo = document.getElementById("hd-value").value;
  const dias_vacaciones = document.getElementById("dv-value").value;
  const porcentaje_variable = document.getElementById("pv-value").value;
  const dias_ausente = document.getElementById("da-value").value;

  localStorage.setItem("horas-laboradas", horas_laboradas);
  localStorage.setItem("horas-festivas", horas_festivas);
  localStorage.setItem("horas-domingo", horas_domingo);
  localStorage.setItem("dias-vacaciones", dias_vacaciones);
  localStorage.setItem("dias-ausente", dias_ausente);
  const valor_hora = 9565.1214;
  const valor_dia_vacaciones = 7.66;
  const valor_hora_domingo = 7173.84;
  const valor_hora_festiva = 16738.96;

  let salario_basico = horas_laboradas * valor_hora;
  let hora_festiva_diurna = horas_festivas * valor_hora_festiva;
  let hora_festiva_compensada = horas_domingo * valor_hora_domingo;
  let vacaciones_disfrutadas =
    dias_vacaciones * valor_dia_vacaciones * valor_hora;
  let variable = (porcentaje_variable / 100) * 150000;
  let auxilio_transporte = horas_laboradas * 888.7;
  let aporte_pension =
    salario_basico * 0.04 +
    hora_festiva_diurna * 0.04 +
    hora_festiva_compensada * 0.04;
  let aporte_salud =
    salario_basico * 0.04 +
    hora_festiva_diurna * 0.04 +
    hora_festiva_compensada * 0.04;
  let anticipo_aporte_pension = vacaciones_disfrutadas * 0.04;
  let anticipo_aporte_salud = vacaciones_disfrutadas * 0.04;
  const total =
    salario_basico +
    hora_festiva_compensada +
    hora_festiva_diurna +
    vacaciones_disfrutadas +
    variable +
    auxilio_transporte -
    (aporte_pension + aporte_salud);
  localStorage.setItem("salario_basico", salario_basico);
  localStorage.setItem("hora_festiva_diurna", hora_festiva_diurna);
  localStorage.setItem("hora_festiva_compensada", hora_festiva_compensada);
  localStorage.setItem("vacaciones_disfrutadas", vacaciones_disfrutadas);
  localStorage.setItem("variable", variable);
  localStorage.setItem("auxilio_transporte", auxilio_transporte);
  localStorage.setItem("aporte_salud", aporte_salud);
  localStorage.setItem("aporte_pension", aporte_pension);
  localStorage.setItem("anticipo_aporte_pension", anticipo_aporte_pension);
  localStorage.setItem("anticipo_aporte_salud", anticipo_aporte_salud);
  localStorage.setItem("total", total);
  setTimeout(() => {
    window.location.href = "periodos/primeraQ.html";
  }, 500);
}

function calcularSQ() {
  const horas_laboradas = document.getElementById("hl-value").value;
  const horas_festivas = document.getElementById("hf-value").value;
  const horas_domingo = document.getElementById("hd-value").value;
  const dias_vacaciones = document.getElementById("dv-value").value;

  const dias_ausente = document.getElementById("da-value").value;
  localStorage.setItem("horas-laboradas", horas_laboradas);
  localStorage.setItem("horas-festivas", horas_festivas);
  localStorage.setItem("horas-domingo", horas_domingo);
  localStorage.setItem("dias-vacaciones", dias_vacaciones);
  localStorage.setItem("dias-ausente", dias_ausente);
  const valor_hora = 9565.1214;
  const valor_dia_vacaciones = 7.66;
  const valor_hora_domingo = 7173.84;
  const valor_hora_festiva = 16738.96;
  const valor_dia_aux = 9600;
  let auxilio_alimento = (30 - dias_ausente) * valor_dia_aux;
  let salario_basico = horas_laboradas * valor_hora;
  let hora_festiva_diurna = horas_festivas * valor_hora_festiva;
  let hora_festiva_compensada = horas_domingo * valor_hora_domingo;
  let vacaciones_disfrutadas =
    dias_vacaciones * valor_dia_vacaciones * valor_hora;

  let auxilio_transporte = horas_laboradas * 888.7;
  let aporte_pension =
    salario_basico * 0.04 +
    hora_festiva_diurna * 0.04 +
    hora_festiva_compensada * 0.04;
  let aporte_salud =
    salario_basico * 0.04 +
    hora_festiva_diurna * 0.04 +
    hora_festiva_compensada * 0.04;
  let anticipo_aporte_pension = vacaciones_disfrutadas * 0.04;
  let anticipo_aporte_salud = vacaciones_disfrutadas * 0.04;
  const total =
    salario_basico +
    auxilio_alimento +
    hora_festiva_compensada +
    hora_festiva_diurna +
    vacaciones_disfrutadas +
    auxilio_transporte -
    (aporte_pension +
      aporte_salud +
      anticipo_aporte_pension +
      anticipo_aporte_salud);
  localStorage.setItem("auxilio_alimento", auxilio_alimento);
  localStorage.setItem("salario_basico", salario_basico);
  localStorage.setItem("hora_festiva_diurna", hora_festiva_diurna);
  localStorage.setItem("hora_festiva_compensada", hora_festiva_compensada);
  localStorage.setItem("vacaciones_disfrutadas", vacaciones_disfrutadas);
  localStorage.setItem("auxilio_transporte", auxilio_transporte);
  localStorage.setItem("aporte_salud", aporte_salud);
  localStorage.setItem("aporte_pension", aporte_pension);
  localStorage.setItem("anticipo_aporte_pension", anticipo_aporte_pension);
  localStorage.setItem("anticipo_aporte_salud", anticipo_aporte_salud);
  localStorage.setItem("total", total);
  document.getElementById("pantalla-carga").style.display = "flex";
  setTimeout(() => {
    window.location.href = "periodos/segundaQ.html";
  }, 500);
}
