import { CommonModule } from '@angular/common';
import { Component, Type} from '@angular/core';
import { InformesComponent } from './subcomponentes/informes/informes.component';
import { MisionesComponent } from './subcomponentes/misiones/misiones.component';
import { HistoriaComponent } from './subcomponentes/historia/historia.component';
import { PersonajesComponent } from './subcomponentes/personajes/personajes.component';
import { MundoComponent } from './subcomponentes/mundo/mundo.component';
import { ImagenGiftAntorchasComponent } from './gift-antorchas/gift-antorchas.component';
import { PajaritoComponent } from './pajarito/pajarito.component';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-columnas',
  standalone: true,
  imports: [CommonModule, 
    InformesComponent, 
    MisionesComponent, 
    HistoriaComponent, 
    PersonajesComponent,
    MundoComponent,
    ImagenGiftAntorchasComponent,
    PajaritoComponent,
  ],
  templateUrl: './columnas.component.html',
  styleUrl: './columnas.component.css',
})
export class ColumnasComponent {

  isDivVisible: boolean = false;
  get divVisible(): boolean {return this.isDivVisible;} // esto es para acceder a isDivVIsible desde otro componente
  claseBackgroundIzq: string = 'clase-background-izq';
  contadorBotones = 0;
  elementosOcultos: string[] = [];   //este array se usa en el html
  botIzqActivo = true
  botDerActivo = true
  botBajoActivo = true
 

  menuPrincipal = true
  ventanaIzq = false
  mapaMundo = false

  currentComponent: any; // se usa para saber cual componente mostrar en la ventana izq

  actualizarBotonesActivos() {
    if (this.menuPrincipal) {
      this.botIzqActivo = true;
      this.botDerActivo = true;
      this.botBajoActivo = true;
    } else if (this.ventanaIzq) {
      this.botIzqActivo = false;
      this.botDerActivo = false;
      this.botBajoActivo = false;
    } else if (this.mapaMundo) {
      this.botIzqActivo = false;
      this.botDerActivo = true;
      this.botBajoActivo = false;
    }}

  //                                      ***********DESDE ACA************
  private idBotonLeft!: HTMLElement;
  private idBotonRight!: HTMLElement;
  private idBotonBottom!: HTMLElement;

  ngAfterViewInit(): void {
    this.idBotonLeft = document.getElementById('button-left')!;
    this.idBotonRight = document.getElementById('button-right')!;
    this.idBotonBottom = document.getElementById('button-bottom')!;

    // Verificación adicional en caso de que los elementos no existan
    if (!this.idBotonLeft || !this.idBotonRight || !this.idBotonBottom) {
      throw new Error('Uno o más elementos no se encontraron en el DOM.');
    }
  }
  //                               ***********HASTA ACA,   ES SOLO PARA Q NO ME TIRE ERROR NULL CON EL PUTO ID************

  clickInformes(){
    //funcion para pasar entre ventanas sin invisivilisar el div
    if (this.contadorBotones === 1 ) {
      this.isDivVisible = false;
    }
    else {this.isDivVisible = true}
    this.contadorBotones = 1
    // fin funcion ...
    this.claseBackgroundIzq = 'clase-informes';
    if (this.isDivVisible === true){
      document.body.style.backgroundImage = "url('/images/columna-izquierda/background-informes.png')";
      document.body.style.backgroundSize = "calc(100% - 40vh) 100%";
      this.menuPrincipal = false
      this.ventanaIzq = true
      this.mapaMundo = false
    } else {
      this.backtoMenu()
    }
    this.currentComponent = InformesComponent
  }

  clickMisiones (){
    //---funcion para pasar entre ventanas sin invisivilisar el div
    if (this.contadorBotones === 2) {
      this.isDivVisible = false;
    }else {this.isDivVisible = true}
    this.contadorBotones = 2
    // fin funcion pasar entre ventanas---
    this.claseBackgroundIzq = 'clase-misiones';
    if (this.isDivVisible === true){
      document.body.style.backgroundImage = "url('/images/columna-izquierda/background-misiones.jpg')";
      document.body.style.backgroundSize = "calc(100% - 40vh) 100%";
      this.menuPrincipal = false
      this.ventanaIzq = true
      this.mapaMundo = false
    } else {
      this.backtoMenu()
    }
    this.currentComponent = MisionesComponent
  }

  clickHistoria (){
    //funcion para pasar entre ventanas sin invisivilisar el div
    if (this.contadorBotones === 3) {
      this.isDivVisible = false;
    }else {this.isDivVisible = true}
    this.contadorBotones = 3
    // fin funcion ...
    this.claseBackgroundIzq = 'clase-historia';
    if (this.isDivVisible === true){
      document.body.style.backgroundImage = "url('/images/columna-izquierda/background-historia.jpg')";
      document.body.style.backgroundSize = "calc(100% - 40vh) 100%";
      this.menuPrincipal = false
      this.ventanaIzq = true
      this.mapaMundo = false
    } else {
      this.backtoMenu()  
    }
    this.currentComponent = HistoriaComponent
  }

  clickPersonajes(){
    
    //funcion para pasar entre ventanas sin invisivilisar el div
    if (this.contadorBotones === 4) {
      this.isDivVisible = false;
    }else {this.isDivVisible = true}
    this.contadorBotones = 4
    // fin funcion ...
    this.claseBackgroundIzq = 'clase-personajes';
    if (this.isDivVisible === true){
      document.body.style.backgroundImage = "url('/images/columna-izquierda/background-personajes.png')";
      document.body.style.backgroundSize = "calc(100% - 40vh) 100%";
      this.menuPrincipal = false
      this.ventanaIzq = true
      this.mapaMundo = false
    } else {
      this.backtoMenu()
    }
    this.currentComponent = PersonajesComponent
  }

  ocultarElemento(elemento: string) {              // funcion para ocultar las ventanas izquierdas
    if (!this.elementosOcultos.includes(elemento)) {
      this.elementosOcultos.push(elemento);
    }
  }

  clickmundo(): void {
    //funcion para pasar entre ventanas sin invisivilisar el div
    if (this.contadorBotones === 5) {
      /* no poner nada aca */
    }else {this.isDivVisible = true}
    this.contadorBotones = 5
    // fin funcion ...
    /* this.claseBackgroundIzq = 'clase-mundo'; */ //esta clase no se usa por que tiene un fondo interactivo, no de los con transparencia
    if (this.isDivVisible === true){
      document.body.style.backgroundImage = "url('/images/columna-izquierda/pared-mundo.png')";
      document.body.style.backgroundSize = "calc(100% - 40vh) 100%"; 
      this.menuPrincipal = false
      this.ventanaIzq = false
      this.mapaMundo = true
    } else {
      this.backtoMenu()
    }
    this.currentComponent = MundoComponent;  // esto se usa para q el css de la ventana izq sea el de mundo
  
    console.log ("se ejecuto con exito")
  }
  
  clickpalacio(): void {
   
  }
  
  clickcapital(): void {
    
  }

  backtoMenu() {
    document.body.style.backgroundImage = "url('/images/background-body.jpg')";
        document.body.style.backgroundSize = " 90% 108%"; 
        this.menuPrincipal = true
        this.ventanaIzq = false
        this.mapaMundo = false
        this.isDivVisible = false
        this.contadorBotones = 0
  }

//---------------------fin columna izquierda


//*---------------------------funciones para los botones transparentes entre columnas

botEntreColumnas(event: MouseEvent){
  const idBoton = event.target as HTMLButtonElement;  //asi  obtengo el id del boton
  
  if (this.menuPrincipal === true) {           //PANTALLA PRINCIPAL
    if (idBoton.id === "button-left") {
      console.log ("se llamo a clickmundo()")
      this.clickmundo()
    }
    if (idBoton.id === "button-right") {
      console.log ("se llamo a clickpalacio()")
      this.clickpalacio();
    }
    if (idBoton.id === "button-right") {
      console.log ("se llamo a clickcapital()")
      this.clickcapital();
    }
  }

  if (this.ventanaIzq === true){   
    console.log ("se desactivaroon los botones entre columnas")              // OTRO MENU ACTIVO
  }

  if (this.mapaMundo === true){                                 // MUNDO ACTIVO

      if (idBoton.id === "button-right") {
        this.backtoMenu()
      }

  }
 

}







//------------FIN DE LA CLASE---------
}
