import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MisionesService } from '../../../../../public/services/misiones.service';
import { ContadorService } from '../../../../../public/services/contador-dias.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-misiones',
  templateUrl: './misiones.component.html',
  styleUrls: ['./misiones.component.css'],
  imports: [CommonModule, FormsModule],
  standalone: true
})

export class MisionesComponent {
  [x: string]: any;
  currentPage: number = 0
  currentPage2: number = 0
  inputVisible: boolean = false
  inputTitulo: string = ""
  inputDescripcion: string = ""
  verificadorLugarSeleccionado = false
  lugarDeViaje = 0
  tiempoDeViaje: string[] = ['0', '8-10', '4-5', '5-7', '2', 'algunos']; 
  

  inputShowUp() {
    this.inputVisible = true;
  }

  constructor(public misionesService: MisionesService, public contadorService: ContadorService) {}/*  2 constructores, para los 2 servicos*/


  get totalPages(): number {
    return this.misionesService.totalPages;
  }

  get tituloMision(): string[] {
    return this.misionesService.tituloMision;
  }

  get mision(): string[] {
    return this.misionesService.mision;
  }

  get tiempo(): string[] {
    return this.misionesService.tiempo;
  }


  checkIndex(index: number) {
    return  Math.abs (this.currentPage - index) < 2;
  }


  agregarTextoTitulo() {
    this.misionesService.agregarTitulo(this.inputTitulo.trim());  // Inserta el número en el array del servicio
    console.log ("texto titulo:_" + this.inputTitulo.trim())
    this.inputTitulo = '';  // Limpia el input después de agregarlo al array
  }

  agregarDescripcion() {
    this.misionesService.agregarDescripcion(this.inputDescripcion.trim());  // Inserta el número en el array del servicio
    console.log ("texto Descripciom:_" + this.inputDescripcion.trim())
    this.inputDescripcion = '';  // Limpia el input después de agregarlo al array
  }

  agregarContador() {
    this.misionesService.agregarContador(0);
  }

  elegirlugarDeViaje(valor: number): void {
    this.lugarDeViaje = valor; 
    this.misionesService.agregarTiempo(this.tiempoDeViaje[this.lugarDeViaje]);  // inserta el tiempo de viaje del array seleccionado
    this.verificadorLugarSeleccionado = true
  }

  onButtonClick(event: Event): void {
    const boton = event.target as HTMLElement;

    // Elimina la clase 'color' de todos los botones
    const botones = document.querySelectorAll('.botones-viaje button');
    botones.forEach(btn => btn.classList.remove('color'));

    // Agrega la clase 'color' al botón clicado
    boton.classList.add('color');
  }

  addMission(): void {
    this.misionesService.addMission();
  }

  crearMision() {
    this.agregarTextoTitulo();
    this.agregarDescripcion();
    this.agregarContador();
    this.addMission();
    this.verificadorLugarSeleccionado = false
    this.inputVisible = false;
  }

  

  
}
  

