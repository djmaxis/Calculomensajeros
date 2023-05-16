document.addEventListener('DOMContentLoaded', () => {
    const calcularBtn = document.getElementById('calcular');
    const kilometrosInput = document.getElementById('kilometros');
    const resultadoDiv = document.getElementById('resultado');

    calcularBtn.addEventListener('click', () => {
        const kilometros = parseFloat(kilometrosInput.value);

        if (isNaN(kilometros) || kilometros < 0) {
            alert('Por favor, ingrese un valor válido para los kilómetros');
        } else {
            const costoEnvio = calcularCosto(kilometros);
            resultadoDiv.textContent = `Costo de envío: $${costoEnvio.toFixed(2)}`;
        }
    });
});

function calcularCosto(kilometros) {
    // Aquí va la lógica para calcular el costo en función de los kilómetros
    const tarifaPorKilometro = 1.5; // Establece una tarifa por kilómetro
    return kilometros * tarifaPorKilometro;
}


function calcularCosto() {
    const kilometros = parseFloat(document.getElementById("kilometros").value);
    let resultadoTexto = "";

    if (kilometros <= 0.2) {
        resultadoTexto = "Cobrar al cliente: $50 (Muy cerca de la tienda)";
    } else if (kilometros > 0.3 && kilometros <= 1.6) {
        resultadoTexto = "Cobrar al cliente: $100 (Es como si fueras a la sirena de la jose contreras)";
    } else if (kilometros > 1.7 && kilometros <= 3.0) {
        resultadoTexto = "Cobrar al cliente: $150 (Es como ir a gazcue o centro de los herues)";
    } else if (kilometros > 3.1 && kilometros <= 5.0) {
        resultadoTexto = "Cobrar al cliente: $200 (Es como ir a agora, zona colonia, san carlos)";
    } else if (kilometros > 5.1 && kilometros <= 8.0) {
        resultadoTexto = "Cobrar al cliente: $250 (Es como si fueras a la parada maria montes, eduardo brito)";
    } else if (kilometros > 8.1 && kilometros <= 13.0) {
        resultadoTexto = "Cobrar al cliente: $300 (Es como si fueras a megacentro o mama tingo)";
    } else if (kilometros > 13.1 && kilometros <= 15.0) {
        resultadoTexto = "Cobrar al cliente: $350 (Villa carmen en las charles)";
    } else if (kilometros > 15.1 && kilometros <= 17) {
        resultadoTexto = "Cobrar al cliente: $400 (Es como si fuers a hainamisa )";
    } else if (kilometros > 17.1 && kilometros <= 18.7) {
        resultadoTexto = "Cobrar al cliente: $450 (Es como si fueras a san luis )";
    } else if (kilometros > 18.8 && kilometros <= 20) {
        resultadoTexto = "Cobrar al cliente: $500 (Es como si fueras el hipodromo )";
    } else if (kilometros > 20.1 && kilometros <= 25) {
        resultadoTexto = "Cobrar al cliente: $550 (Es como si fueras mas para a ya del hipodromo )";
    } else if (kilometros > 25.1 && kilometros <= 30) {
        resultadoTexto = "Cobrar al cliente: $600 (Entre hipodromo y Ole de la caleta o Parque San cristobal )";
    } else if (kilometros > 30 && kilometros <= 35) {
        resultadoTexto = "Cobrar al cliente: $700 (Destacamento boca chica )";
	}
		else if (kilometros > 35.1) {
		resultadoTexto = "Para esta cantidad de km, Consultar con el mensajero";
		}

    document.getElementById("resultado").innerHTML = resultadoTexto;
}

document.getElementById("calcular").addEventListener("click", () => {
    calcularCosto();
  });
  

const carrito = [];
const total = document.getElementById("total");
const agregarProductoBtn = document.getElementById("agregarProducto");
const carritoDiv = document.getElementById("carrito");


let costoEnvio = 0;

function actualizarCarrito() {
    carritoDiv.innerHTML = "";
    let sumaTotal = 0;

    carrito.forEach((item, index) => {
        const itemDiv = document.createElement("div");
        itemDiv.innerHTML = `${item.cantidad} x ${item.producto} - $${item.precio} <button onclick="eliminarProducto(${index})">Eliminar</button>`;
        carritoDiv.appendChild(itemDiv);
        sumaTotal += item.precio * item.cantidad;
    });

    const divCostoEnvio = document.createElement("div");
    divCostoEnvio.innerHTML = `Costo de envío: $${costoEnvio}`;
    carritoDiv.appendChild(divCostoEnvio);

    sumaTotal += costoEnvio;
    total.innerHTML = `Total: $${sumaTotal}`;
}

// Asegúrate de actualizar el carrito cada vez que cambie el costo de envío
document.getElementById("calcular").addEventListener("click", () => {
    calcularCosto();
    actualizarCarrito();
});

function calcularCosto() {
    // ... (el resto del código en la función calcularCosto se mantiene igual)

    // Al final de la función calcularCosto, actualiza la variable costoEnvio:
    const costo = parseFloat(document.getElementById("resultado").textContent.replace("Costo de envío: $", ""));
    costoEnvio = isNaN(costo) ? 0 : costo;
}

// Asegúrate de actualizar el carrito cada vez que cambie el costo de envío
document.getElementById("calcular").addEventListener("click", () => {
    calcularCosto();
    actualizarCarrito();
});


function eliminarProducto(index) {
  carrito.splice(index, 1);
  actualizarCarrito();
}

/*API WHATSAPP*/

document.getElementById("formulario").addEventListener("submit", (event) => {
  
    const telefonoMensajero = document.getElementById("telefonoMensajero").value;
    const mensaje = encodeURIComponent(crearMensaje());
  
    window.open(`https://wa.me/${telefonoMensajero}?text=${mensaje}`, "_blank");
  });
  
  function crearMensaje() {
    const nombreCliente = document.getElementById("nombreCliente").value;
    const telefono = document.getElementById("telefono").value;
  
    let mensaje = `El pedido es para *${nombreCliente}*, (https://wa.me/${telefono}?text=Hola%20soy%20el%20mensajero%20de%20imaxis%20de%20la%20tienda%20de%20telefono%2C%20enviame%20tu%20ubicacion%20en%20tiempo%20actual \n\n`;
  
   carrito.forEach((item, index) => {
    const resultado = item.cantidad * item.precio;
    mensaje += `*${item.cantidad}* x ${item.producto} de $${item.precio} = $${resultado}\n`;
});

  
    mensaje += total.textContent;
  
    return mensaje;
  }
  
  agregarProductoBtn.addEventListener("click", () => {
    const producto = document.getElementById("producto").value;
    const precio = parseFloat(document.getElementById("precio").value);
    const cantidad = parseInt(document.getElementById("cantidad").value);
  
    carrito.push({ producto, precio, cantidad });
    actualizarCarrito();
  });
  
  function actualizarCarrito() {
    carritoDiv.innerHTML = "";
    let sumaTotal = 0;
  
    carrito.forEach((item, index) => {
      const itemDiv = document.createElement("div");
      itemDiv.innerHTML = `${item.cantidad} x ${item.producto} - $${item.precio} <button onclick="eliminarProducto(${index})">Eliminar</button>`;
      carritoDiv.appendChild(itemDiv);
      sumaTotal += item.precio * item.cantidad;
    });
  
    total.innerHTML = `Total: $${sumaTotal}`;
  }
  

