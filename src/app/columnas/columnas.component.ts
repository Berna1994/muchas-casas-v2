import { Component, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { InformesComponent } from './subcomponentes/informes/informes.component';
import { MisionesComponent } from './subcomponentes/misiones/misiones.component';
import { HistoriaComponent } from './subcomponentes/historia/historia.component';
import { PersonajesComponent } from './subcomponentes/personajes/personajes.component';
import { MundoComponent } from './subcomponentes/mundo/mundo.component';
import { PalacioComponent } from './subcomponentes/palacio/palacio.component';
import { ImagenGiftAntorchasComponent } from './gift-antorchas/gift-antorchas.component';
import { PajaritoComponent } from './pajarito/pajarito.component';
import { CapitalComponent } from './subcomponentes/capital/capital.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-columnas',
  standalone: true,
  imports: [CommonModule, 
    InformesComponent, 
    MisionesComponent, 
    HistoriaComponent, 
    PersonajesComponent,
    MundoComponent,
    PalacioComponent,
    ImagenGiftAntorchasComponent,
    PajaritoComponent,
  ],
  templateUrl: './columnas.component.html',
  styleUrls: ['./columnas.component.css'],
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

  mapaPalacio = false
  mapaPalacioCocina1 = false
  mapaPalacioCocina2 = false
  mapaPalacioDormitorio = false

  mapaCapital = false

  get mapaActivo(): boolean {
    return this.mapaMundo || this.mapaPalacio || this.mapaPalacioCocina1 || this.mapaPalacioCocina2 || this.mapaPalacioDormitorio || this.  mapaCapital
  }


  currentComponent: any; // se usa para saber cual componente mostrar en la ventana izq

  actualizarBotonesActivos() {
    console.log(' cocina1: ' + this.mapaPalacioCocina1 + 
      ' mapa palacio' + this.mapaPalacio + 
      ' cocina 2 ' + this.mapaPalacioCocina2 +
      ' dormitorios ' + this.mapaPalacioDormitorio + 
      ' menu principal ' + this.menuPrincipal +
      ' capital ' + this.mapaCapital
    )
    if (this.menuPrincipal) {
      this.botIzqActivo = true;
      this.botDerActivo = true;
      this.botBajoActivo = true;
      return
    } else if (this.ventanaIzq) {
      this.botIzqActivo = false;
      this.botDerActivo = false;
      this.botBajoActivo = false;
      return
    } else if (this.mapaMundo) {
      this.botIzqActivo = false;
      this.botDerActivo = true;
      this.botBajoActivo = false;
      return
    } else if(this.mapaPalacio) {
      this.botIzqActivo = true;
      this.botDerActivo = true;
      this.botBajoActivo = true;
      return
    } else if (this.mapaPalacioCocina1){
      this.botIzqActivo = true;
      this.botDerActivo = true;
      this.botBajoActivo = false;
      return
    } else if (this.mapaPalacioCocina2){
      this.botIzqActivo = false;
      this.botDerActivo = true;
      this.botBajoActivo = false;
      return
    }else if (this.mapaPalacioDormitorio){
      this.botIzqActivo = true;
      this.botDerActivo = false;
      this.botBajoActivo = false;
      return
    } else if(this.mapaCapital) {
      this.botIzqActivo = true;
      this.botDerActivo = false;
      this.botBajoActivo = false;
      return
    }
    
  }

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
      this.mapaPalacio = false
      this.mapaCapital = false
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
      this.mapaPalacio = false
      this.mapaCapital = false
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
      this.mapaPalacio = false
      this.mapaCapital = false
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
      this.mapaPalacio = false
      this.mapaCapital = false
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
      this.mapaPalacio = false
      this.mapaCapital = false
    } else {
      this.backtoMenu()
    }
    this.currentComponent = MundoComponent;  // esto se usa para q el css de la ventana izq sea el de mundo
    console.log ("se ejecuto con exito mapa mundo")
  }
  
  clickpalacio(): void {
    //funcion para pasar entre ventanas sin invisivilisar el div
    if (this.contadorBotones === 6 ) {
      /* no poner nada aca */
    }else {this.isDivVisible = true}
    this.contadorBotones = 6
    // fin funcion ...
    /* this.claseBackgroundIzq = 'clase-mundo'; */ //esta clase no se usa por que tiene un fondo interactivo, no de los con transparencia
    if (this.isDivVisible === true){
      document.body.style.backgroundImage = "url('/images/columna-izquierda/palacio/sala-comun.jpg')";
      document.body.style.backgroundSize = "calc(100% - 40vh) 100%"; 
      this.menuPrincipal = false
      this.ventanaIzq = false
      this.mapaMundo = false
      this.mapaPalacio = true
      this.mapaCapital = false
    } else {
      this.backtoMenu()
    }
    this.currentComponent = PalacioComponent;  // esto se usa para q el css de la ventana izq sea el de mundo
    console.log ("se ejecuto con exito mapa palacio")
  }

  clickpalacio_cocina1(): void {

    if (this.isDivVisible === true){
      document.body.style.backgroundImage = "url('/images/columna-izquierda/palacio/cocina1.jpg')";
      document.body.style.backgroundSize = "calc(100% - 40vh) 100%"; 

      this.mapaPalacio = false
      this.mapaPalacioCocina1 = true
      this.mapaPalacioCocina2 = false
      this.mapaPalacioDormitorio = false

    } else {
      this.backtoMenu()
    }
    console.log ("se ejecuto con exito cocina1")
  }

  clickpalacio_cocina2(): void {

    if (this.isDivVisible === true){
      document.body.style.backgroundImage = "url('/images/columna-izquierda/palacio/cocina2.jpg')";
      document.body.style.backgroundSize = "calc(100% - 40vh) 100%"; 

      this.mapaPalacio = false
      this.mapaPalacioCocina1 = false
      this.mapaPalacioCocina2 = true
      this.mapaPalacioDormitorio = false

    } else {
      this.backtoMenu()
    }
    console.log ("se ejecuto con exito back to menu")
  }

  clickpalacio_dormitorio(): void {

    if (this.isDivVisible === true){
      document.body.style.backgroundImage = "url('/images/columna-izquierda/palacio/dormitorio.jpg')";
      document.body.style.backgroundSize = "calc(100% - 40vh) 100%"; 

      this.mapaPalacio = false
      this.mapaPalacioCocina1 = false
      this.mapaPalacioCocina2 = false
      this.mapaPalacioDormitorio = true

    } else {
      this.backtoMenu()
    }
    console.log ("se ejecuto con exito dormitorio")
  }
  
  
  clickcapital(): void {
        //funcion para pasar entre ventanas sin invisivilisar el div
        if (this.contadorBotones === 7 ) {
          /* no poner nada aca */
        }else {this.isDivVisible = true}
        this.contadorBotones = 7
        // fin funcion ...
        /* this.claseBackgroundIzq = 'clase-mundo'; */ //esta clase no se usa por que tiene un fondo interactivo, no de los con transparencia
        if (this.isDivVisible === true){
          document.body.style.backgroundImage = "url('/images/columna-izquierda/capital/estrellas.png')";
          document.body.style.backgroundSize = "calc(100% - 40vh) 91%"; 
          this.menuPrincipal = false
          this.ventanaIzq = false
          this.mapaMundo = false
          this.mapaPalacio = false
          this.mapaCapital = true
        } else {
          this.backtoMenu()
        }
        this.currentComponent = CapitalComponent;  // esto se usa para q el css de la ventana izq sea el de mundo
        console.log ("se ejecuto con exito mapa capital")
  }

  backtoMenu() {
    document.body.style.backgroundImage = "url('/images/background-body.jpg')";
        document.body.style.backgroundSize = " 100% 100%"; 
        this.menuPrincipal = true
        this.ventanaIzq = false
        this.mapaMundo = false

        this.mapaPalacio = false
        this.mapaPalacioCocina1 = false
        this.mapaPalacioCocina2 = false
        this.mapaPalacioDormitorio = false

        this.mapaCapital = false
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
      console.log ("se llamo a clickcapital()")
      this.clickcapital();
    }
    if (idBoton.id === "button-bottom") {
      console.log ("se llamo a clickpalacio()")
      this.clickpalacio();
    }
    return           /* **** importante poner el return sino se activa el boton con 
                      la nueva pantalla como si hubiera clikeado devuelta **** */
  }
  if (this.ventanaIzq === true){   
    console.log ("se desactivaroon los botones entre columnas") 
    return                                                          // OTRO MENU ACTIVO
  }
  if (this.mapaMundo === true){                                 // MUNDO ACTIVO

      if (idBoton.id === "button-right") {
        this.backtoMenu()
      }
      return
  }
  if (this.mapaPalacio === true){                                 // PALACIO ACTIVO

    if (idBoton.id === "button-bottom") {
      this.backtoMenu()
      return
    }
    if (idBoton.id === "button-left") {
      this.clickpalacio_cocina1()
      console.log ("se llamo a clickpalacio_cocina1()")
      return
    }
    if (idBoton.id === "button-right") {
      this.clickpalacio_dormitorio()
      console.log ("se llamo a clickpalacio_dormitorio()")
      return
    }
    }
    //------------------
  if (this.mapaPalacioCocina1 === true){                              //COCINA1

    if (idBoton.id === "button-left") {
      this.clickpalacio_cocina2()
      console.log ("se llamo a clickpalacio_cocina2()")
      return
    }
    if (idBoton.id === "button-right") {
      this.clickpalacio()
      console.log ("se llamo a clickpalacio()")
      return
    }
    }
    //------------------                                                //COCINA2
  if (this.mapaPalacioCocina2 === true){                                 

    if (idBoton.id === "button-right") {
      this.clickpalacio_cocina1()
      console.log ("se llamo a clickpalacio_cocina1()")
      return
    }
    }
    //------------------  
  if (this.mapaPalacioDormitorio === true){                                 // DORMITORIO

    if (idBoton.id === "button-left") {
      this.clickpalacio()
      console.log ("se llamo a clickpalacio()")
      return
    }
    }

    //------------------                               // CAPITAL ACTIVO
  if (this.mapaCapital === true) {                                 
    if (idBoton.id === "button-left") {
      this.backtoMenu()
      console.log ("se llamo a mapa capital()")
    }
    return
  }
  
}







//------------FIN DE LA CLASE---------
}
