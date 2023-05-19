

document.addEventListener('DOMContentLoaded', () => {
    const calcularBtn = document.getElementById('calcular');

    calcularBtn.addEventListener('click', calcularCosto);
});

function actualizarCostoEnvio() {
  const costoEnvioInput = document.getElementById("costoEnvio");
  costoEnvio = parseFloat(costoEnvioInput.value);
}

function calcularCosto() {
    const kilometrosInput = document.getElementById('kilometros');
    const resultadoDiv = document.getElementById('resultado');
    const kilometros = parseFloat(kilometrosInput.value);

    let resultadoTexto = "";

    if (isNaN(kilometros) || kilometros < 0) {
        alert('Por favor, ingrese un valor válido para los kilómetros');
        return;
    } 

    if (kilometros >= 0 && kilometros < 0.3) {
        resultadoTexto = "Cobrar al cliente: $50 (Muy cerca de la tienda)";
    } else if (kilometros >= 0.3 && kilometros <= 1.6) {
        resultadoTexto = "Cobrar al cliente: $100 (Es como si fueras a la sirena de la jose contreras)";
    } else if (kilometros > 1.6 && kilometros <= 3.0) {
        resultadoTexto = "Cobrar al cliente: $150 (Es como ir a gazcue o centro de los herues)";
    } else if (kilometros > 3.0 && kilometros <= 5.0) {
        resultadoTexto = "Cobrar al cliente: $200 (Es como ir a agora, zona colonia, san carlos)";
    } else if (kilometros > 5.0 && kilometros <= 8.0) {
        resultadoTexto = "Cobrar al cliente: $250 (Es como si fueras a la parada maria montes, eduardo brito)";
    } else if (kilometros > 8.0 && kilometros <= 12.9) {
        resultadoTexto = "Cobrar al cliente: $300 (Es como si fueras a megacentro o mama tingo)";
    } else if (kilometros > 12.9 && kilometros <= 15.0) {
        resultadoTexto = "Cobrar al cliente: $350 (Villa carmen en las charles)";
    } else if (kilometros > 15.0 && kilometros <= 17) {
        resultadoTexto = "Cobrar al cliente: $400 (Es como si fuers a hainamisa )";
    } else if (kilometros > 17.0 && kilometros <= 18.7) {
        resultadoTexto = "Cobrar al cliente: $450 (Es como si fueras a san luis )";
    } else if (kilometros > 18.7 && kilometros <= 20) {
        resultadoTexto = "Cobrar al cliente: $500 (Es como si fueras el hipodromo )";
    } else if (kilometros > 20.0 && kilometros <= 25) {
        resultadoTexto = "Cobrar al cliente: $550 (Es como si fueras mas para a ya del hipodromo )";
        } else if (kilometros > 25.0 && kilometros <= 30) {
        resultadoTexto = "Cobrar al cliente: $600 (Entre hipodromo y Ole de la caleta o Parque San cristobal )";
    } else if (kilometros > 30 && kilometros <= 35) {
        resultadoTexto = "Cobrar al cliente: $700 (Destacamento boca chica )";
    } else if (kilometros > 35.1) {
        resultadoTexto = "Para esta cantidad de km, Consultar con el mensajero";
    }

    resultadoDiv.textContent = resultadoTexto;
    actualizarCarrito();
}

const carrito = [];
const total = document.getElementById("total");
const agregarProductoBtn = document.getElementById("agregarProducto");
const carritoDiv = document.getElementById("carrito");

let costoEnvio = 0;







agregarProductoBtn.addEventListener("click", () => {
	const cantidadInput = document.getElementById("cantidad");
  const productoInput = document.getElementById("producto");
  const precioInput = document.getElementById("precio");
    const costoEnvioInput = document.getElementById("costoEnvio");
	
 const cantidad = parseInt(cantidadInput.value);
  if (isNaN(cantidad) || cantidad <= 0) {
    alert('Por favor, ingrese una cantidad válida.');
    cantidadInput.focus();
    return;
  }	
  
  if (!productoInput.value) {
    alert('Por favor, ingrese el nombre del producto.');
    productoInput.focus();
    return;
  }

  const precio = parseFloat(precioInput.value);
  if (isNaN(precio) || precio <= 0) {
    alert('Por favor, ingrese un precio válido.');
    precioInput.focus();
    return;
  }


  const costoEnvio = parseFloat(costoEnvioInput.value);
  if (isNaN(costoEnvio) || costoEnvio < 0) {
    alert('Por favor, ingrese un costo de envío válido.');
    costoEnvioInput.focus();
    return;
  }

  // Verificar si el producto ya está en el carrito
  const productoExistente = carrito.find((item) => item.producto === productoInput.value);

  if (productoExistente) {
    // Actualizar la cantidad del producto existente
    productoExistente.cantidad += cantidad;
  } else {
    // Agregar el nuevo producto al carrito
    carrito.push({ producto: productoInput.value, precio, cantidad });
  }

  actualizarCostoEnvio(); // Agregar esta línea
  actualizarCarrito();
});




function actualizarCarrito() {
    carritoDiv.innerHTML = "";
    let sumaTotal = 0;

    if (carrito.length === 0) {
        const carritoVacioDiv = document.createElement("div");
        carritoVacioDiv.innerHTML = '<i style="color: #FF6666;">Carrito está vacío</i>';
        carritoDiv.appendChild(carritoVacioDiv);
        total.style.display = "none"; // Oculta el elemento "Total: $0"
        return;
    }

    total.style.display = "block"; // Muestra el elemento "Total: $0"

    carrito.forEach((item, index) => {
        const itemDiv = document.createElement("div");
        const inputCantidad = document.createElement("input");
        inputCantidad.type = "number";
        inputCantidad.value = item.cantidad;
        inputCantidad.min = 0;
        inputCantidad.onchange = function() {
            actualizarCantidad(index, inputCantidad.value);
        };

        itemDiv.innerHTML = `<input type="number" value="${item.cantidad}"> x ${item.producto} - $${item.precio} <button onclick="eliminarProducto(${index})">Eliminar</button>`;
        itemDiv.prepend(inputCantidad);
        carritoDiv.appendChild(itemDiv);
        sumaTotal += item.precio * item.cantidad;
    });

    const divCostoEnvio = document.createElement("div");
    divCostoEnvio.innerHTML = `Costo de envío: $${costoEnvio}`;
    carritoDiv.appendChild(divCostoEnvio);

    sumaTotal += costoEnvio;
    total.innerHTML = `Total: $${sumaTotal}`;
}

function actualizarCantidad(index, cantidad) {
    if (cantidad == 0) {
        eliminarProducto(index);
    } else {
        carrito[index].cantidad = parseInt(cantidad);
    }
    actualizarCarrito();
}


function actualizarCarrito() {
    carritoDiv.innerHTML = "";
    let sumaTotal = 0;

    if (carrito.length === 0) {
        const carritoVacioDiv = document.createElement("div");
        carritoVacioDiv.innerHTML = '<i style="color: #FF6666;">Carrito está vacío</i>';
        carritoDiv.appendChild(carritoVacioDiv);
        total.style.display = "none"; // Oculta el elemento "Total: $0"
        return;
    }

    total.style.display = "block"; // Muestra el elemento "Total: $0"

    carrito.forEach((item, index) => {
        const itemDiv = document.createElement("div");
        const inputCantidad = document.createElement("input");
        inputCantidad.type = "number";
        inputCantidad.value = item.cantidad;
        inputCantidad.min = "1";
        inputCantidad.addEventListener('change', function() {
            actualizarCantidad(index, this.value);
        });

        itemDiv.innerHTML = ` x ${item.producto} - $${item.precio} <button onclick="eliminarProducto(${index})">Eliminar</button>`;
        itemDiv.prepend(inputCantidad);
        carritoDiv.appendChild(itemDiv);
        sumaTotal += item.precio * item.cantidad;
    });

    const divCostoEnvio = document.createElement("div");
    divCostoEnvio.innerHTML = `Costo de envío: $${costoEnvio}`;
    carritoDiv.appendChild(divCostoEnvio);

    sumaTotal += costoEnvio;
    total.innerHTML = `Total: $${sumaTotal}`;
}

function actualizarCantidad(index, cantidad) {
    if (cantidad <= 0) {
        eliminarProducto(index);
    } else {
        carrito[index].cantidad = parseInt(cantidad);
    }
    actualizarCarrito();
}



window.onload = function() {
    actualizarCarrito();
};

function actualizarCarrito() {
    carritoDiv.innerHTML = "";
    let sumaTotal = 0;

    if (carrito.length === 0) {
        const carritoVacioDiv = document.createElement("div");
        carritoVacioDiv.innerHTML = '<i style="color: #FF6666;">Carrito está vacío</i>';
        carritoDiv.appendChild(carritoVacioDiv);
        total.style.display = "none"; // Oculta el elemento "Total: $0"
        return;
    }

    total.style.display = "block"; // Muestra el elemento "Total: $0"

    carrito.forEach((item, index) => {
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("carrito-item");
        itemDiv.style.display = "flex";
        itemDiv.style.alignItems = "center";
        itemDiv.style.marginBottom = "10px";

        // Input Cantidad
        const cantidadInput = document.createElement("input");
        cantidadInput.type = "number";
        cantidadInput.value = item.cantidad;
        cantidadInput.min = 1;
        cantidadInput.step = 1;
        cantidadInput.style.width = "40px";
        cantidadInput.addEventListener("change", (event) => {
            const nuevaCantidad = parseInt(event.target.value);
            if (!isNaN(nuevaCantidad) && nuevaCantidad > 0) {
                item.cantidad = nuevaCantidad;
                actualizarCarrito();
            }
        });
        itemDiv.appendChild(cantidadInput);

        // Descripción del producto y precio
        const descripcionDiv = document.createElement("div");
        descripcionDiv.textContent = `x ${item.producto} $${numberWithCommas(item.precio * item.cantidad.toFixed(0))}`;
        descripcionDiv.style.flexGrow = "1";
        descripcionDiv.style.margin = "0 10px";
        itemDiv.appendChild(descripcionDiv);

        // Botón Eliminar
        const eliminarBtn = document.createElement("button");
        eliminarBtn.textContent = "x";
        eliminarBtn.style.width = "30px";
        eliminarBtn.style.height = "30px";
        eliminarBtn.style.border = "none";
        eliminarBtn.style.borderRadius = "50%";
        eliminarBtn.style.backgroundColor = "#FF6666";
        eliminarBtn.style.color = "#FFFFFF";
        eliminarBtn.style.fontSize = "14px";
        eliminarBtn.style.fontWeight = "bold";
        eliminarBtn.style.cursor = "pointer";
        eliminarBtn.addEventListener("click", () => {
            eliminarProducto(index);
        });
        itemDiv.appendChild(eliminarBtn);

        carritoDiv.appendChild(itemDiv);

        sumaTotal += item.precio * item.cantidad;
    });

    const divCostoEnvio = document.createElement("div");
    divCostoEnvio.textContent = `Costo de envío: $${numberWithCommas(costoEnvio.toFixed(0))}`;
    carritoDiv.appendChild(divCostoEnvio);

    sumaTotal += costoEnvio;
    total.textContent = `Total: $${numberWithCommas(sumaTotal.toFixed(0))}`;
}







document.addEventListener('DOMContentLoaded', function() {
  const inputs = [
    'kilometros',
    'nombreCliente',
    'telefono',
    'cantidad',
    'producto',
    'precio',
    'ubicacionEnvio',
    'costoEnvio',
    'telefonoMensajero'
  ];

  inputs.forEach(function(inputId) {
    const inputElement = document.getElementById(inputId);

    inputElement.addEventListener('blur', function() {
      this.value = this.value.trim();
    });
  });
});
/*quitar espacio en nombre cliente*/
  
function crearMensaje() {
    const nombreCliente = document.getElementById("nombreCliente").value;
    const telefono = document.getElementById("telefono").value;
    const ubicacionEnvio = document.getElementById("ubicacionEnvio").value;
    const telefonoMensajero = document.getElementById("telefonoMensajero").value;
    const nombreMensajero = document.getElementById("nombreMensajero").value;
    const fecha = document.getElementById("fecha").value;
    const numerofactura = document.getElementById("numerofactura").value;

    let mensaje = '';

    let total = 0;
    carrito.forEach((item, index) => {
        const resultado = item.cantidad * item.precio;
        total += resultado;
        mensaje += `${item.cantidad} x ${item.producto} - $${numberWithCommas(item.precio)} = $${numberWithCommas(resultado)}\n`;
    });

    mensaje += `*--------------------------------* \n*Costo de envío:* $${numberWithCommas(costoEnvio)}\n`;
    total += costoEnvio;
    mensaje += `*Total:* $${numberWithCommas(total)}\n`;
    mensaje += `*Fecha:* ${fecha}\n`;
    mensaje += `*Número de Factura:* ${numerofactura}\n`;

    let mensajeWhatsApp = `Hola *${nombreCliente}*. Mi nombre es *${nombreMensajero}*, soy mensajero de la tienda *iMaxis EIRL*\n\nTengo que entregarte este pedido:\n\n${mensaje}\nSi todo está correcto, envíame tu ubicación en tiempo actual para hacerle la entrega:\n\n`;
    let mensajeFinal = `El pedido es para: *${nombreCliente}*\n\n*Pedido:*\n${mensaje}\nEste pedido va para: *${ubicacionEnvio}*\n\nHaz clic en el enlace para contactar al cliente y pedirle la ubicación: `;
    mensajeFinal += `(https://wa.me/1${telefono}?text=${encodeURIComponent(mensajeWhatsApp)})`;

    return mensajeFinal;
}



/*mostrar los números formateados en los campos de entrada y elementos del carrito, puedes utilizar la función numberWithCommas() al actualizar los */
document.getElementById("resultado").innerHTML = `Costo de envío: $${numberWithCommas(costoEnvio)}`;
document.getElementById("total").innerHTML = `Total: $${numberWithCommas(total)}`;





/*Funcion para formatos de comas en precios*/

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/*refrescar pagina con boton pedido nuevo*/

document.addEventListener('DOMContentLoaded', function() {
    var botonNuevoPedido = document.getElementById('nuevoPedido');

    if (botonNuevoPedido) {
        botonNuevoPedido.addEventListener('click', function() {
            location.reload();
        });
    } else {
        console.error('El botón de nuevo pedido no se encontró en la página.');
    }
});



/*refrescar pagina con boton pedido nuevo*/

/*Guardar pedido en txt*/
document.getElementById("formulario").addEventListener("submit", (event) => {
    event.preventDefault(); // Para evitar el recargado de la página

    // Comprobar si el carrito está vacío
    if (carrito.length === 0) {
        alert('Tienes que agregar información al carrito');
        return;
    }

    const telefonoMensajero = document.getElementById("telefonoMensajero").value;
    const mensaje = encodeURIComponent(crearMensaje());

    // Confirmación para guardar los datos del pedido
    const confirmacion = confirm("Deseas guardar los datos del pedido");
    if (confirmacion) {
        const texto = new Blob([crearMensaje()], {type: 'text/plain;charset=utf-8'});
        const numerofactura = document.getElementById("numerofactura").value;
        const fecha = document.getElementById("fecha").value;
        saveAs(texto, `Factura_${numerofactura}_${fecha}.txt`);
    }

    window.open(`https://wa.me/${telefonoMensajero}?text=${mensaje}`, "_blank");
});
