// Mateo Franciulli M1B 310956


function cargarAlCombo() {
}

// Funcion para agregar categoria desde el formulario
function subirCategoria() {
    if (document.getElementById("idFormCategoria").reportValidity()) {
        let nombre = document.getElementById("idNombreCategoria").value;
        let detalle = document.getElementById("idDetallesCategoria").value;

        // Si el nombre de la categoria está repetido, se le informa al usuario y no se va a carga la categoria
        let repetido = sistema.nombreRepetido(nombre);
        if (repetido) {
            alert("La Categoría ya existe");
        } else {
            // Cargo la categoria, la añado a la lista y reinicio el formulario
            let nuevaCategoria = new Categoria(nombre, detalle);
            sistema.agregarCategoria(nuevaCategoria);
            cargarAlCombo();  

            agregarCategoriaASelect(nombre);
            document.getElementById("idBotonBajaCategoria").disabled = false
           // verificarExperienciasAsociadas(nombre);
            
            document.getElementById("idNombreCategoria").value = "";
            document.getElementById("idDetallesCategoria").value = "";
        }
    }
}

// Función para agregar una nueva opción a los selects relacionados con categorías
function agregarCategoriaASelect(nombreCategoria) {
    // Obtener los elementos select
    var comboCategoriasIzquierda = document.getElementById("idComboCategoriasIzquierda");
    var idCategoriaExperiencia = document.getElementById("idCategoriaExperiencia");
    var idComboCategoriasAbajo = document.getElementById("idComboCategoriasAbajo");

    // Crear opciones y agregarlas a los selects
    var option = document.createElement("option");
    option.text = nombreCategoria;

    comboCategoriasIzquierda.add(option.cloneNode(true));
    idCategoriaExperiencia.add(option.cloneNode(true));
    idComboCategoriasAbajo.add(option.cloneNode(true));
}

document.addEventListener("DOMContentLoaded", function() {
    // Asociar la función al botón Agregar luego de haber cargado el dom (me estaba dando problemas no se porque)
    document.getElementById("idBotonAgregarCategoria").addEventListener("click", subirCategoria);
    //Asocio para cuando se cambia el orden de precio 
    document.getElementById("idOrdenPrecio").addEventListener("change", ordenarExperienciasPorPrecio);
    
  // Asociar evento de cambio al select de cantidad de personas
  var selectCantidadPersonas = document.getElementById("idCantidadPersonasCategoria");
  selectCantidadPersonas.addEventListener("change", filtrarExperienciasPorCantidadPersonas);

});


  
// Función para habilitar el botón y agregar experiencia
function habilitarYAgregarExperiencia() {
    // Habilitar el botón
    document.getElementById("idBotonAltaExperiencia").removeAttribute("disabled");
    
    
}

function agregarExperienciaACombo(titulo) {
  var idComboBajaExperiencia = document.getElementById("idComboBajaExperiencia");
  var option = document.createElement("option");
  option.text = titulo;
  option.value = titulo; // Añadir el valor al elemento option
  idComboBajaExperiencia.add(option);
}



function agregarExperienciaATablaYCombo() {
    // Obtener valores 
    var tituloExperiencia = document.getElementById("idTituloExperiencia").value;
    var titulo = tituloExperiencia + "."
    var descripcion = document.getElementById("idDescripcionExperiencia").value;
    var precio = document.getElementById("idPrecioExperiencia").value;
    var cantidad = document.getElementById("idCantidadPersonasExperiencia").value;
    var categoria = document.getElementById("idCategoriaExperiencia").value; 

   
    var nuevaExperiencia = new Experiencia(titulo, descripcion, precio, cantidad, categoria,0);
   
    sistema.agregarExperiencia(nuevaExperiencia) //agraga la experiencia 

    // Añadir a la tabla
    agregarExperienciaATabla(nuevaExperiencia, categoria); // Pasar la categoría como argumento

    // Añadir a combo
    agregarExperienciaACombo(titulo);
  
    
    // Limpiar campos y volver a deshabilitar el boton
    limpiarCampos();
    document.getElementById("idBotonAltaExperiencia").setAttribute("disabled", "disabled");
}
    var expSeleccionada = "";
//Codigo para pintar las celdas de experiencia de naranja al hacer click, y al desclickear que vuelvan a la normalidad
document.addEventListener("DOMContentLoaded", function () {
    var idTabla = document.getElementById("idTabla");

    idTabla.addEventListener("click", function (event) {
        var selectedCell = event.target;

        

        if (selectedCell.tagName === "TD") {
          // Quitar color naranja a las celdas 
          var previousSelectedCell = document.querySelector(".selected-cell");
          if (previousSelectedCell) {
            previousSelectedCell.classList.remove("selected-cell");
          }
          // Agregar color naranja a la celda actual
          selectedCell.classList.add("selected-cell");

          console.log(event.target.innerText.split(".")[0])
          //Añado la experiencia seleccionada por abajo de comprar, fijandome en los elementos guardados dentro del evento
          idCualExperiencia.innerHTML ="Experiencia: "+ event.target.innerText.split(".")[0]

          expSeleccionada = event.target.innerText.split(".")[0]

          activarBotonComprar();

          
        }
    });
});


/*
function agregarExperienciaATabla(experiencia, categoria) {
  let tabla = document.querySelector("#idTabla");
  var imgcantidad = "";
  tabla.innerHTML = "";
  let texto = "";
  for (let i in sistema.listaExperiencia) {
    var imgcantidad = "";
          let listaActual = sistema.listaExperiencia[i];
          texto += `<tr>
      <td>${listaActual.titulo} </td> 
      <td>${listaActual.descripcion} </td>
      <td>${listaActual.precio}</td>
      <td>${listaActual.precio}</td>
      <td>${imgcantidad}</td>

      </tr>`

 // codigo para ver segun la cantidad de personas que imagen utilizar 
 if (listaActual.cantidad === "uno") {
  imgcantidad = '<img src="img/uno.png" alt="Imagen uno">';
} else if (listaActual.cantidad === "dos") {
  imgcantidad = '<img src="img/dos.png" alt="Imagen dos">';
} else {
  imgcantidad = '<img src="img/muchos.png" alt="Imagen muchos">';
}

  }
  tabla.innerHTML = texto;
  ExperienciaMasCara(sistema.listaExperiencia)
}


*/




// Función para añadir experiencia a la tabla
function agregarExperienciaATabla(experiencia, categoria) {
  activarBoton();

  var idTabla = document.getElementById("idTabla");
  var row = idTabla.insertRow();

  var cell1 = row.insertCell(0);

  var imgcantidad = "";

  // Código para seleccionar la imagen según la cantidad de personas
  if (experiencia.cantidad === "uno") {
    imgcantidad = '<img src="img/uno.png" alt="Imagen uno">';
  } else if (experiencia.cantidad === "dos") {
    imgcantidad = '<img src="img/dos.png" alt="Imagen dos">';
  } else {
    imgcantidad = '<img src="img/muchos.png" alt="Imagen muchos">';
  }

  cell1.innerHTML =
    experiencia.titulo +
    " " +
    experiencia.descripcion +
    " $" +
    experiencia.precio +
    " " +
    imgcantidad;

  ExperienciaMasCara(sistema.listaExperiencia);
}

/*
// Función para añadir experiencia a la tabla
function agregarExperienciaATabla(experiencia, categoria) {
  activarBoton();  
  var idTabla = document.getElementById("idTabla");
    var row = idTabla.insertRow();

    var cell1 = row.insertCell(0);
    
    var imgcantidad = "";
 // codigo para ver segun la cantidad de personas que imagen utilizar 
    if (experiencia.cantidad === "uno") {
        imgcantidad = '<img src="img/uno.png" alt="Imagen uno">';
    } else if (experiencia.cantidad === "dos") {
        imgcantidad = '<img src="img/dos.png" alt="Imagen dos">';
    } else {
        imgcantidad = '<img src="img/muchos.png" alt="Imagen muchos">';
    }
  cell1.innerHTML = ""
    for(let i in sistema.listaExperiencia){ 
    cell1.innerHTML = sistema.listaExperiencia[i].titulo + " " + sistema.listaExperiencia[i].descripcion + " $" + sistema.listaExperiencia[i].precio + " " + imgcantidad  //experiencia.cantidad;

  }
  ExperienciaMasCara(sistema.listaExperiencia)
} */

// Función para limpiar campos
function limpiarCampos() {
    document.getElementById("idTituloExperiencia").value = "";
    document.getElementById("idDescripcionExperiencia").value = "";
    document.getElementById("idPrecioExperiencia").value = "";
    document.getElementById("idCantidadPersonasExperiencia").value = "";
    document.getElementById("idCategoriaExperiencia").value = "";
}

document.addEventListener("DOMContentLoaded", function () {
    // Asociar funciones a eventos
    document.getElementById("idTituloExperiencia").addEventListener("input", habilitarYAgregarExperiencia);
    document.getElementById("idDescripcionExperiencia").addEventListener("input", habilitarYAgregarExperiencia);
    document.getElementById("idPrecioExperiencia").addEventListener("input", habilitarYAgregarExperiencia);
    document.getElementById("idCantidadPersonasExperiencia").addEventListener("input", habilitarYAgregarExperiencia);
    document.getElementById("idCategoriaExperiencia").addEventListener("input", habilitarYAgregarExperiencia);
    document.getElementById("idBotonAltaExperiencia").addEventListener("click", agregarExperienciaATablaYCombo);
});

//Funcion que verifica cual es la experiencia mas cara y la agraga a infromes
function ExperienciaMasCara(listaExperiencia) {
//Si no hay experiencias devuelve sin datos
  if (listaExperiencia.length == 0) {
    return "Sin datos";
  }
  let experienciaMasCara = listaExperiencia[0];
  //for para recorrer la lista de experiencias e ir comparando Que experiencia tiene el valor "precio" mas elevado
  for (let i = 1; i < listaExperiencia.length; i++) {
    if (listaExperiencia[i].precio > experienciaMasCara.precio) {
      experienciaMasCara = listaExperiencia[i];
    }
  }

  let idExperienciaMasCara = document.getElementById("idExperienciaMasCara");
//Añade el precio de la experiencia mas cara al Informe con un signo "$" 
  if (idExperienciaMasCara) {
    
    idExperienciaMasCara.innerHTML = "$ " + experienciaMasCara.precio;

  }

}


// Función para eliminar la categoría seleccionada
function eliminarCategoria() {

      var nombreCategoria = document.getElementById("idComboCategoriasAbajo").value;
      let categoriaSeleccionada = sistema.listaCategoria.find(categoria => categoria.nombre === nombreCategoria);
      // Si se seleccionó una categoría
      if (nombreCategoria) {
          //Busco si hay alguna categoria en listaExperiencia, la cual este asociada a la categoria que quiero borrar
          for (let i in sistema.listaExperiencia ) {
          if(sistema.listaExperiencia[i].categoria == nombreCategoria){
          alert ("No se puede eliminar la categoría porque hay experiencias asociadas");
          }
        }
        // Eliminar la categoría y actualizar los selects
        sistema.eliminarCategoria(categoriaSeleccionada);
        cargarAlCombo();
      }
    }
   
  document.addEventListener("DOMContentLoaded", function() {
    // Asociar la función al botón para eliminar categoría
    var botonBajaCategoria = document.getElementById("idBotonBajaCategoria");
   
    // Verificar si el botón existe antes de agregar el evento, eliminar la categoria al darle al boton
    if (botonBajaCategoria) {
      botonBajaCategoria.addEventListener("click", eliminarCategoria);
    }
  });
  
  // Funcion para cargar las categorias en los selects despues de eliminarlos
  function cargarAlCombo() {
    // Obtener los elementos select
    var comboCategoriasIzquierda = document.getElementById("idComboCategoriasIzquierda");
    var idCategoriaExperiencia = document.getElementById("idCategoriaExperiencia");
    var idComboCategoriasAbajo = document.getElementById("idComboCategoriasAbajo");
  
    // Limpiar los selects
    comboCategoriasIzquierda.innerHTML = "";
    idCategoriaExperiencia.innerHTML = "";
    idComboCategoriasAbajo.innerHTML = "";
  
    // Agregar la opción "Todas"
    var optionTodas = document.createElement("option");
    optionTodas.text = "Todas";
    comboCategoriasIzquierda.add(optionTodas);

    // Agregar las categoriaas al select
    sistema.listaCategoria.forEach(function (categoria){
      agregarCategoriaASelect(categoria.nombre);

      // Agregar las experiencias al select de baja de experiencia añadi aca
  sistema.listaExperiencia.forEach(function (experiencia) {
    agregarExperienciaASelectBaja(experiencia.titulo);
  });
    });
  }
  
  // Función para agregar una nueva opción a los selects relacionados con categorías
  function agregarCategoriaASelect(nombreCategoria) {
    // Obtener los elementos select
    var comboCategoriasIzquierda = document.getElementById("idComboCategoriasIzquierda");
    var idCategoriaExperiencia = document.getElementById("idCategoriaExperiencia");
    var idComboCategoriasAbajo = document.getElementById("idComboCategoriasAbajo");
  
    // Crear opciones y agregarlas a los selects
    var option = document.createElement("option");
    option.text = nombreCategoria;
    option.value = nombreCategoria
    comboCategoriasIzquierda.add(option.cloneNode(true));
    idCategoriaExperiencia.add(option.cloneNode(true));
    idComboCategoriasAbajo.add(option.cloneNode(true));
  }

  function activarBotonComprar() {
    let botonComprar = document.getElementById("idBotonComprar");

    if (botonComprar) {
        botonComprar.removeAttribute("disabled");
    }
}

function obtenerFechaActual(){
  let tiempoTranscurrido = Date.now();
  let hoy = new Date(tiempoTranscurrido);
  let fecha = "Fecha: " + hoy.toLocaleDateString();
  return fecha
}

function obtenerHoraActual(){
  let date = new Date();
  let hora = date.getHours()
  let mins = date.getMinutes()

  let horaYmins = "Hora: " + hora +":" + mins
  return horaYmins
}
function obtenerExpSeleccionada(){
 return expSeleccionada 
}
document.addEventListener("DOMContentLoaded", function() {
  // Asociar la funcion al boton luego de cargar el dom
  var botonComprar = document.getElementById("idBotonComprar");
  if (botonComprar) {
      botonComprar.addEventListener("click", function() {
          // Obtener la información necesaria
          var nombreComprador = document.getElementById("idNombreComprador").value;
          var mail = document.getElementById("idMail").value;
          var fecha = obtenerFechaActual(); 
          var hora = obtenerHoraActual(); 
          var expSeleccionada = obtenerExpSeleccionada() 

          // Crear una instancia de Compra y agregarla a la lista de compras en el sistema
          var nuevaCompra = new Compra(nombreComprador, mail, fecha, hora, expSeleccionada);
          sistema.agregarCompra(nuevaCompra);

          let expSeleccionadaPunto = expSeleccionada + "."
          let experienciarep = sistema.listaExperiencia.find(experienciarep => experienciarep.titulo  === expSeleccionadaPunto);
          console.log(experienciarep);
          
          experienciarep.contador++

          console.log(experienciarep.contador)

          console.log(sistema.listaCompra)// para verificar

          mostrarExperienciasMasCompradas();
      });
  }
});


function ordenarExperienciasPorPrecio() {
  let idOrdenPrecio = document.getElementById("idOrdenPrecio");
  let orden = parseInt(idOrdenPrecio.value);

  sistema.listaExperiencia.sort(function(a, b) {
      // Orden creciente
      if (orden === 1) {
          return a.precio - b.precio;
      }
      // Orden decreciente
      else if (orden === 2) {
          return b.precio - a.precio;
      }
  });

  // Limpiar la tabla
  let idTabla = document.getElementById("idTabla");
  idTabla.innerHTML = "";

  // Volver a agregar las experiencias ordenadas a la tabla
  sistema.listaExperiencia.forEach(function(experiencia) {
      agregarExperienciaATabla(experiencia, experiencia.categoria);
  });
}


function mostrarExperienciasMasCompradas() {
  let ulExperienciasMasCompradas = document.getElementById("idExperienciasMasCompradas");
  let sinDatos = ulExperienciasMasCompradas.querySelector("li");
  
  if (sinDatos) {
    sinDatos.remove();
  }

  // Obtener todas las experiencias
  let todasLasExperiencias = sistema.listaExperiencia;

  // Verifico si hay experiencias
  if (todasLasExperiencias.length > 0) {
    // Encontrar el contador más alto
    let contadorMasAlto = todasLasExperiencias.reduce(function(maxContador, experiencia) {
      return experiencia.contador > maxContador ? experiencia.contador : maxContador;
    }, todasLasExperiencias[0].contador);

    // Filtrar las experiencias con el contador más alto
    let experienciasMasCompradas = todasLasExperiencias.filter(function(experiencia) {
      return experiencia.contador === contadorMasAlto;
    });

    // Mostrar las experiencias más compradas
    ulExperienciasMasCompradas.innerHTML = ''; // Limpiar la lista antes de volver a agregar elementos
    experienciasMasCompradas.forEach(function(experiencia) {
      let nuevaLi = document.createElement("li");
      nuevaLi.textContent = experiencia.titulo;// + ', Contador: ' + experiencia.contador;
      ulExperienciasMasCompradas.appendChild(nuevaLi);
    });
  }
}



function limpiarTabla() {
  var idTabla = document.getElementById("idTabla");
  
  // Eliminar todas las filas de la tabla
  while (idTabla.rows.length > 0) {
    idTabla.deleteRow(0);
  }
}


// Funcion para filtrar experiencias segun la cantidad de personas seleccionada
function filtrarExperienciasPorCantidadPersonas() {
  // Obtener el valor seleccionado del select
  var cantidadSeleccionada = document.getElementById("idCantidadPersonasCategoria").value;

  // Limpiar la tabla antes de aplicar el filtro
  limpiarTabla();

  // Mostrar solo las experiencias que coinciden con la cantidad seleccionada
  for (var i = 0; i < sistema.listaExperiencia.length; i++) {
    var experiencia = sistema.listaExperiencia[i];
    if (cantidadSeleccionada === "todos" || experiencia.cantidad === cantidadSeleccionada) {
      agregarExperienciaATabla(experiencia);
    }
  }
 
}

function filtrarPorCategoria(nombreCategoria) {
  // Limpiar la tabla
  var idTabla = document.getElementById("idTabla");
  idTabla.innerHTML = "";

  // Filtrar las experiencias por la categoría seleccionada
  if (nombreCategoria === "Todas") {
      // Si se selecciona "Todas", mostrar todas las experiencias
      sistema.listaExperiencia.forEach(function (experiencia) {
          agregarExperienciaATabla(experiencia, experiencia.categoria);
      });
  } else {
      // Filtrar por la categoría seleccionada
      var experienciasFiltradas = sistema.listaExperiencia.filter(function (experiencia) {
          return experiencia.categoria === nombreCategoria;
      });

      // Volver a agregar las experiencias filtradas a la tabla
      experienciasFiltradas.forEach(function (experiencia) {
          agregarExperienciaATabla(experiencia, nombreCategoria);
      });
  }
}


document.addEventListener("DOMContentLoaded", function () {
  // Asociar la función al cambio en el select de categorías(la asocio aca porque me daba algun error arriba)
  var comboCategoriasIzquierda = document.getElementById("idComboCategoriasIzquierda");
  comboCategoriasIzquierda.addEventListener("change", function () {
      var nombreCategoriaSeleccionada = comboCategoriasIzquierda.value;
      filtrarPorCategoria(nombreCategoriaSeleccionada);
  });

});



//function limpiarExpBorrada(){
//document.getElementById("idComboBajaExperiencia").value = "";
//}

function EliminarExperiencia() {
  // Obtener la experiencia seleccionada en el combo
  var experienciaABorrar = document.getElementById("idComboBajaExperiencia").value;

  console.log(experienciaABorrar)

 experienciaABorrarsinPunto = experienciaABorrar.split(".")[0]
  // Verificar si hay compras asociadas a la experiencia seleccionada
  var compraAsociada = sistema.listaCompra.find(function (compra) {
    return compra.expSeleccionada ===  experienciaABorrarsinPunto;
  });

  if (compraAsociada) {
    alert("No se puede eliminar la experiencia porque hay una compra asociada");
  } else {
    // Encontrar la experiencia en la lista
    var experienciaSeleccionada = sistema.listaExperiencia.find(function (experiencia) {
      return experiencia.titulo === experienciaABorrar;
    });

    if (experienciaSeleccionada) {
      // Eliminar la experiencia
      sistema.eliminarExperiencia(experienciaSeleccionada);
      // Eliminar la opción del select asociado
      eliminarExperienciaDeSelect(experienciaABorrar);
      // Actualizar la tabla
      actualizarTabla();
    }
  }



  console.log(sistema.listaExperiencia);
}


document.addEventListener("DOMContentLoaded", function () {
  // Asociar la función al botón para eliminar experiencia
  var botonBajaExperiencia = document.getElementById("idBotonBajaExperiencia");

  // Verificar si el botón existe antes de agregar el evento
  if (botonBajaExperiencia) {
    botonBajaExperiencia.addEventListener("click", EliminarExperiencia);
  }
})

function activarBoton() {
  var boton = document.getElementById("idBotonBajaExperiencia");
  if (boton) {
      boton.disabled = false;
  }
}

// Activa el botón
document.addEventListener('DOMContentLoaded', function() {

      activarBoton();
  
});

function eliminarExperienciaDeSelect(tituloExperiencia) {
  // Obtener el elemento select
  var idComboBajaExperiencia = document.getElementById("idComboBajaExperiencia");

  // Recorrer las opciones del select y eliminar la que coincide con el título de la experiencia
  for (var i = 0; i < idComboBajaExperiencia.options.length; i++) {
    if (idComboBajaExperiencia.options[i].text === tituloExperiencia) {
      idComboBajaExperiencia.remove(i);
      break; // Una vez que se encuentra y elimina la opción, se puede salir del bucle
    }
  }
}


function actualizarTabla() {
  // Limpiar la tabla
  limpiarTabla();

  // Volver a agregar las experiencias ordenadas a la tabla
  sistema.listaExperiencia.forEach(function(experiencia) {
      agregarExperienciaATabla(experiencia, experiencia.categoria);
  });
}

/*
function detallesCompras(){
  let categoriaDetalles = document.getElementById("idComboCategoriasIzquierda");    
  for(let i in sistema.listaCompra){
    for(let j in sistema.listaExperiencia){
     if(sistema.listaCompra[i].expSeleccionada == .){
      
      }
    }

  }
}
*/
  










