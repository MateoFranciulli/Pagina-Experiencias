// Mateo Franciulli M1B 310956
class Categoria {
  constructor(nombre, detalle){
    this.nombre = nombre;
    this.detalle = detalle ;
    this.experiencias = [];

  }

    agregarCategoria(nombre, detalle) {
        this.categorias.push({nombre ,detalle });

      }
  }
  

class Experiencia{
  
    constructor(titulo, descripcion, precio, cantidad, categoria, contador){
        this.titulo = titulo ;
        this.descripcion = descripcion ;
        this.precio = precio ;
        this.cantidad = cantidad;
        this.categoria = categoria;
        this.contador = contador; 
      }


} 

class Compra{
    constructor(nombrecompra, mail, fecha,hora, expSeleccionada ) {
      this.nombrecompra = nombrecompra ;
      this.mail = mail ;
      this.fecha = fecha ;
      this.hora = hora ;
      this.expSeleccionada = expSeleccionada;
      
    }


}

class Sistema{
    constructor(){
        this.listaCategoria = [];
        this.listaExperiencia = [];
        this.listaCompra = [];
    }
    agregarCategoria(categoria) {
      this.listaCategoria.push(categoria);
  }
    nombreRepetido(nombre) {
      return this.listaCategoria.some(categoria => categoria.nombre === nombre);
  }
  agregarExperiencia(experiencia) {
    this.listaExperiencia.push(experiencia); 
      //cargarAlCombo();
      //habilitarBotonBajaExperiencia();
    
}
habilitarBotonBajaExperiencia() {
  var botonBajaExperiencia = document.getElementById("idBotonBajaExperiencia");
  botonBajaExperiencia.removeAttribute("disabled");
}
  agregarCompra(compra){
    this.listaCompra.push(compra);

  }

  habilitarYAgregarExperiencia() {
    document.getElementById("idBotonAltaExperiencia").removeAttribute("disabled");
  }

  eliminarCategoria(categoriaEliminar) {
    // Filtrar la lista de categorias para excluir la categoría que se va a eliminar
    this.listaCategoria = this.listaCategoria.filter(categoria => categoria !== categoriaEliminar);
  }
  eliminarExperiencia(experiencia) {
    // Encontrar el índice de la experiencia en la lista
    var index = this.listaExperiencia.indexOf(experiencia);

    // Eliminar la experiencia si se encuentra en la lista
    if (index !== -1) {
      this.listaExperiencia.splice(index, 1);
    }
  }

}





  

  





const sistema = new Sistema();