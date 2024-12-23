import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificacionesService } from '../../../../../public/services/notificaciones.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-informes',
  templateUrl: './informes.component.html',
  styleUrls: ['./informes.component.css'],
  imports: [CommonModule, FormsModule, ],
  standalone: true
})
export class InformesComponent{
  currentPage: number = 1;
  totalPages: number = 2;
  respuestaSeleccionadaTrueFalse = false
  indiceProyectos: number = 0
  


  constructor (public notificacionesService: NotificacionesService) {} 
   // Inyecta el servicio


  goToPage(page: number): void {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
    }
    this.clickPaginadorNoticias(1)
  }

  clickPaginadorNoticias(indicePagina: number){
    this.notificacionesService.actualizarColorPrimario(indicePagina) //se actualiza la el id colorPrimario seleccionado en la base de datos del servicio
    this.notificacionesService.actualizarColorSecundarioActivo()
    this.notificacionesService.actualizarDialogoActivo()
    this.notificacionesService.obtenerSeleccionRespuestas()
    this.notificacionesService.actualizarFinDialogos()
    this.notificacionesService.actualizarValorN()

    this.notificacionesService.actualizarArrayColoresPSinVer(indicePagina)
  }


  clickContinuar(selector: string){
        // logica para el historial en el servicio de notificaciones
    this.notificacionesService.actualizarDialogoActivo()
    this.notificacionesService.determinarVariables()
    this.notificacionesService.obtenerSeleccionRespuestas()
    this.notificacionesService.actualizarFinDialogos()
    
    // logica para el selector de respuestas

    this.respuestaSeleccionadaTrueFalse = false
  
    // También puedes restablecer la lógica de selección en tu componente
    this.respuestaSeleccionadaTrueFalse = false;
    this.notificacionesService.textoLargoSeleccionado = '';
  }

  
//------------------------------------------------



switchRespuestaSeleccionada(event: string): void {
  this.notificacionesService.obtenerSeleccionRespuestas()
  console.log("se llamo a switchRespuesstSeleccionada, respuestas disponibles: | " + this.notificacionesService.respuestasVisibles + " |")
  this.respuestaSeleccionadaTrueFalse = true

  const selectedTextoCorto = event;

  // Recorre el array para encontrar el objeto con el textoCorto seleccionado

  this.notificacionesService.respuestasVisibles = [];
    let respuestasArray;
    
    // Selección del diálogo en función de `N`
    const N = this.notificacionesService.N;
  
    // Selecciona el array correcto según el valor de N
    if (N === 1) {
      respuestasArray = this.notificacionesService.respuestasN1;
    } else if (N === 2) {
      respuestasArray = this.notificacionesService.respuestasN2;
    } else if (N === 3) {
      respuestasArray = this.notificacionesService.respuestasN3;
    } else {
      console.log("N no coincide para las respuestas")
    }

    // Revisa si respuestasArray está definido y procesa
    respuestasArray?.forEach(elementA => {
      if (elementA.colorPrimario === this.notificacionesService.colorActivoPrimario) {
        elementA.arrayRespuestas.forEach(elementB => {
          if (elementB.textoCorto === selectedTextoCorto){
            this.notificacionesService.colorActivoSecundario = elementB.colorSecundario
            this.notificacionesService.textoLargoSeleccionado = elementB.textoLargo
          }
        });
      }
    });
  
    console.log("se llamo a switchRespuestaSeleccionada// colorActivoSecundario: " + this.notificacionesService.colorActivoSecundario)
    console.log("texto Largo Seleccionado: " + this.notificacionesService.textoLargoSeleccionado)
}


/************************ */
  proyectos = [
    {
    titulo: `El Oso de Cobre`,
    descripcion: `-Escuela de metalurgia-`,
    informe: `Maestros: 3
    Aprendices: 3`,},
    {
    titulo: 'Mausoleo del antiguo Erar Saram',
    descripcion: '-Monumento-',
    informe: `Una estatua grande (2 enanos de alto), de una enana con la mitad del cuerpo de ciervo, y la otra mitad con cuerpo de enana. La estatua esta mirando hacia donde sale el sol (la entrada de la cueva). 
    La estatua esta sobre la entrada al mausoleo. 
    
    A los lados de la puerta hay engravados de que relatan las pruebas que supero el Nuevo Erar Saràm para recibir el titulo. 
    Dentro del pasillo están esculpidas en la pared las historias cotidianas sobre la vida del viejo Erar Saràm. 
    
    Al final se encuentra el sarcófago hecho en piedra con el nombre grabado "Erar Saràm". La habitación es cuadrada con las paredes pulidas.`,
    },

  ]
  recursos = [
    `
    Alimentos: ?

    Madera: De sobra

    Pedernal: Abundante

    Cobre: Escaso`
  ]

  actualizarindiceProyectos(i: number){
    this.indiceProyectos = i
  }

}