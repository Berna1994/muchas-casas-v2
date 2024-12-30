import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ColumnasComponent } from './columnas/columnas.component';
import { CommonModule } from '@angular/common';
import {ContadorService} from '../../public/services/contador-dias.service';
import { NotificacionesService } from '../../public/services/notificaciones.service';
import { Componentefirebase } from './firebase-component/component-firebase'; 
import { ConfiguracionDatos } from './firebase-component/carga-de-datos';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ColumnasComponent, CommonModule, Componentefirebase,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  
})
export class AppComponent implements OnInit {
  
  title = 'muchasCasas2';
  //boton prologo
  verBotonPrologo: boolean = true;
  verPrologo: boolean = false;
  //divs de pasar turnos
  verDivTurnos: boolean = false;
  verDivTurnos2: boolean = false;
  //botones de pasar turnos
  mostrarBotonesInteraccion: boolean = true;
  @ViewChild('myDiv', { static: true }) myDiv!: ElementRef;
  nuevoArray: string[] = [];
  verBotonesIntTurnos: boolean = false;
  //selector del dialogo de turno
  varContadorDeClicks: number = 0;
  // lista neta de arrays
  listaNetadeArrays: string[] = []; 
  // indice del dialogo elegido en pasar turno
  ArrayindexDialogo: number[] = [];
  // botones aceptar y rechazar pasar turno
  si: string = "si-inalterado";
  no: string = "no-inalterado";
  // textos de respuestas interacciones de paso de turno
  mostrarTextoTemporal: boolean = false;
  textoTemporal: string = "String empty";
  //cosa para acceder a una variable del comp hijo
  @ViewChild(ColumnasComponent, { static: true }) columnasComponent!: ColumnasComponent;




  console(){
    console.log("noticiasDisponibles-interatuable: " )
  }

  //arrays respuestas turnos
  arrayRespuestasAcostarce = [
    /* 0 */
    {"si": "El reconfortante aroma del estofado caliente te atrapa por un instante. La comida esta buena y luego Gingik te sirve una infusion de hiervas. Le agradeces por el buen gesto y te responde con una sonrisa.",
    "no": "Le agradeces por el ofrecimiento pero aun te sientes muy lleno por la cena. Ella asiente y se marcha."
    },
    /* 1 */
    {"si": "Se sienta junto a ti y charlan sobre diversos temas. El pasado de sus familias, su niñes, comida, algunas bromas y finalmente se sienten demaciado cansados y cada uno va a dormir a su cama, sin embargo sientes como si ella estubiera junto a ti toda la noche.",
    "no": "Te excusas con ella y de te arropas con las pieles para dormir. Gingik se marcha sin comentar nada."
    },
    /* 2 */
    {"si": "Le dejas tomar las pieles y duermes destapado hasta la maniana siguiente.",
    "no": "Retienes las pieles y le contestas ''no hay problema, mañana me bañare antes de que nadie me huela.''"
    },
     ]
  //--------------------------------
  arrayRespuestasDespertarce = [
              /* 0 */
              {"si": "Finjes seguir durmiendo por una hora mas. Cuando Gingik finalmente despierta se exalta y te suelta bruscamente mientras sigues de espaldas a ella. Se levanta silenciosamente y cuando volteas a verla le muestras una sonrisa. Ella te devuelve la sonrisa avergonzadamente mientras se dirige a la cocina.",
              "no": "Intentas levantarte sin despertarla pero mientras pasas por encima de ella tu mano resvala de la pared donde te apoyabas y le caes encima. Gingik se despierta asustada y le explicas el malentendido. Parece creerte pero luego se marcha sin preparar el desayuno como de costumbre."
              },
              /* 1 */
              {"si": "Se sientan juntos y tratas de ayudarla con el cabello. No estas acostumbrado a usar un cepillo y al principio eres brusco. Tus errores te ponen nervioso haciendo que lo hagas incluso peor hasta que Gingik te quita el cepillo y te pide que trenzes el cabello que ella ya cepillo por su cuenta.",
              "no": "Te disculpas con ella pero estas demaciado cansado y sigues durmiendo hasta mas tarde. Cuando despiertas hay desayuno listo sobre la mesa."
              },
              /* 2 */
              {"si": "Tratas de seguir durmiendo hasta el final pero el ruido te lo impide. Finalmente te levantas con un poco de mal humor.",
              "no": "Le pides que deje de limpiar por ahora, tu te haras cargo de eso mas tarde. Finalmente te levantas bien descansado y de buen humor."
              },
              /* 3 */ 
              {"si": "Gingik interrumpe tu festin y te pregunta molesta ¿porque te lo comiste? \nLe respondes que no habia otra opcion.",
              "no": "Gingik interrumpe tu festin y te pregunta molesta ¿porque te lo comiste? \nLe respondes que no habia otra opcion.",
              },
          
     ];
  //----------------------------------

  clickBotonPrologo() {
    this.verBotonPrologo = false;
    this.verPrologo = true;
  }

  clickPrologo() {
    this.verPrologo = false
  }

  booleanDivTurnos() {
    this.verDivTurnos = !this.verDivTurnos;
    this.varContadorDeClicks = 0;
    
    this.columnasComponent.isDivVisible = false;
    document.body.style.backgroundImage = "url('/images/background-body.jpg')";
    document.body.style.backgroundSize = " 100% 100%"; 
  }

  booleanDivTurnos2() {
    this.verDivTurnos2 = !this.verDivTurnos2;
  }
  contadorDeClicks(){
    this.textoTemporal = "string vacio"
    this.mostrarTextoTemporal = false;
    this.varContadorDeClicks += 1;  
    
    if (this.varContadorDeClicks >= this.nuevoArray.length) {
      this.booleanDivTurnos2();
    }
    if (this.listaNetadeArrays[this.varContadorDeClicks] === "interaccionAcostarce" ){
      this.interaccionAcostarce();     
    }
    if (this.listaNetadeArrays[this.varContadorDeClicks] === "interaccionDespertarce" ){
      this.interaccionDespertarce();  
    }
         
  }
    

  //----------------CODIGO ELEGIR DIALOGOS-------------------------------------


  dialogosPasarTurno() {
    console.log ("---\nTE VAS A DORMIR\n---")
    
    this.verBotonesIntTurnos = false;
    this.nuevoArray = [];
    this.ArrayindexDialogo = []
    
    // ESTO DE LAS INTERFACES ES PARA QUE EL PROGRAMA IDIOTA SEPA RECONOCER LOS ELEMENTOS COMO ARRAYS
    interface ArraysAcostarce {
      interaccionAcostarce: string[];
      mensajesAcostarce: string[];
   }

   interface ArraysSuenios {
       Sueños_A: string[];
       Sueños_B: string[];
   }

   interface ArraysDespertar { 
       interaccionDespertarce: string[];
       mensajesDespertarce: string[];
   }// ESTO DE LAS INTERFACES ES PARA QUE EL PROGRAMA IDIOTA SEPA RECONOCER LOS ELEMENTOS COMO ARRAYS

   // Definir los objetos con las interfaces especificadas (poner los arrays de arrays)----------------------
    let arraysAcostarce: ArraysAcostarce = {
      interaccionAcostarce: [
          "Gingik se acerca para ofrecerte una comida caliente antes de dormir.",//0
          "Escuchas pasos acercándose y al levantar la mirada ves a Gingik sonriendo y te pregunta si te apetece hablar un poco antes de dormir.",//1
          "Gingik te despierta abruptamente destapándote. ''Esas pieles están sucias y huelen mal, tengo que lavarlas ahora o nadie soportará tu olor por la mañana''."//2
      ],
      mensajesAcostarce: [
          "Te sientes muy comodo entre las viejas pieles y te preguntas de que animal seran. Duermes pensando si se trata de una criatura adorable y suavecita o una bestia temible.",
          "Sientes algo pinchando tu pie entre las pieles. Encuentras una pequeña garra que se ha desprendido de lo que era la piel de la mano de la criatura, no encuentras ninguna otra garra.",
          "Los insectos te molestan con el ruido dentro y fuera del hogar. Tapas tu cabeza con pieles y consigues caer en el sueño.",
          "No te sientes cansado esta noche y buscas a Gingik para charlar, pero la encuentras durmiendo. Finalmente te fuerzas a dormir y lo consigues tras un largo rato.",
          "Estas tan cansado que te tiras en la cama sin siquiera taparte y te duermes en el acto.",
      ]
    };

    let arraysSuenios: ArraysSuenios = {
      Sueños_A: [
          "Tienes un recuerdo olvidado de tus padres cuando eras muy joven.  Sientes el calor de la hogera y el aroma de una comida cuyo sabor no recuerdas, pero al momento de provarla el recuerdo salta a la mañana siguiente y pronto se desvanece.",
          "Te encuentras solo y perdido en el bosque, tratando de buscar a tus amigos de la infancia antes de que la lluvia haga desbordar el rio que cruzaste con ellos. No los encuentras pero si a un gran conejo blanco, cuando tratas de acercarte cada ves que lo miras estas mas lejos de la criatura.",
          "Cierras los ojos pero al rato te pica la barbilla, cuando te rascas te salen polillas. Te arden los ojos y solo ves piojos, luego te dan cosquillas en las rodillas, y si te pones de lado sientes olor a pescado.",
          "Recuerdas estar sentado junto a un artesano esculpiendo rocas juntos. El hombre te es familiar pero no recuerdas el por que. Sientes que hiso algo malo pero es una persona honesta. Al día siguiente te enteraste de que cayo por un acantilado pero no recuerdas si murio o no.",
          "Sientes olor a queso. Estas en un banquete y todos los invitados son bisins. Te sirven leche y quesos. Hay queso asado en pinchos, queso derretido en cuencos, quesos muy blandos y quesos crocantes.",
      ],
      Sueños_B: [
          "La noche es particularmente fria pero descansas muy confortablemente sintiendote bien abrigado.",
          "El viento azota toda la noche colandose dentro del hogar y haciendo ruido. No tienes abrigo suficiente y duermes sintiendo frio.",
          "En medio de la noche sientes algo pequeño caminando por tu piel y despiertas abruptamente sacudiendo el cuerpo. No logras encontrar lo que sea que esta alli y te preguntas si fue una ilusion o no. Pasas el resto de la noche incomodamente en estado de alerta.",
          "El canto agudo de un ave poco comun se oye justo encima del techo. A muchos les pareceria irritante pero a ti te relaja sintiendo una suerte de nostalgia.",
      ]
    };

    let arraysDespertar: ArraysDespertar = {
      interaccionDespertarce: [
          "Al despertar te das cuenta que Gingik te abraza mientras duerme a detras de ti.",
          "Sientes una palmada sobre tu hombro. Al abrir los ojos Gingik te pide que le ayudes a cepillar y trenzar su pelo.",
          "Despiertas con un ruido molesto, te das cuenta de que Gingik esta ordenando y limpiando cerca tuyo.",
          "Te levantas al sentir un dulce aroma a comida caliente, hay un postre de dulces del bosque enfriandose sobre la mesada de piedra.",
      ],
      mensajesDespertarce: [
          "Te levantas fresco y lleno de energia.",
          "Despiertas con la espalda dolorida y un brazo acalambrado.",
          "Al despertar tratas de recordar un sueño pero se desvanece al instante.",
          "Cuando finalmente te levantas sientes la garganta seca, te duele un poco la cabeza y tienes la voz ronca por la mañana.",
      ]
    };
    
    
  // Función para elegir aleatoriamente una propiedad de cada conjunto (osea un solo array dentro de cada array)---------------------
      let listaBrutadeArraysElegidos = []; // ==> 3 arrays con textos

        // Obtener todas las propiedades de cada objeto y elegir una aleatoriamente
        let propiedadesAcostarce = Object.keys(arraysAcostarce);
        let propiedadesSuenios = Object.keys(arraysSuenios);
        let propiedadesDespertar = Object.keys(arraysDespertar);
        // Elegir aleatoriamente una propiedad de cada conjunto
        let propiedadAcostarce = propiedadesAcostarce[Math.floor(Math.random() * propiedadesAcostarce.length)];
        let propiedadSuenios = propiedadesSuenios[Math.floor(Math.random() * propiedadesSuenios.length)];
        let propiedadDespertar = propiedadesDespertar[Math.floor(Math.random() * propiedadesDespertar.length)];
        // Guardar las propiedades elegidas en el array
        listaBrutadeArraysElegidos.push(propiedadAcostarce);
        listaBrutadeArraysElegidos.push(propiedadSuenios);
        listaBrutadeArraysElegidos.push(propiedadDespertar);


        /* const eliminarElementosAleatorios = (listaBrutadeArraysElegidos: string[]): string[] => { */
          // Calcular cuántos elementos eliminar aleatoriamente (entre 0 y 2)
          const eliminarCantidad = Math.floor(Math.random() * 3); // Puede ser 0, 1 o 2
      
          // Crear una copia del array para no modificar el original
          let copiaDeLaListaBruta = listaBrutadeArraysElegidos.slice();
      
          // Eliminar aleatoriamente eliminarCantidad elementos del array
          for (let i = 0; i < eliminarCantidad; i++) {
              if (copiaDeLaListaBruta.length > 0) {
                  const index = Math.floor(Math.random() * copiaDeLaListaBruta.length);
                  copiaDeLaListaBruta.splice(index, 1);
              }
          }
      
          // Ahora listaNetadeArrays contiene los nombres de las arrays restantes después de la eliminación aleatoria
          this.listaNetadeArrays = copiaDeLaListaBruta;
          console.log("LISTA NETA DE ARRAYS:\n" + this.listaNetadeArrays);
      
          // Recorrer cada array dentro de listaNetadeArrays y obtener un elemento aleatorio de cada uno
          for (let nombreArray of this.listaNetadeArrays) {
              let arrayAleatorio: string | any[] = [];
      
              // Según el nombre del array, seleccionamos aleatoriamente un elemento del conjunto correspondiente
              switch (nombreArray) {
                  case 'interaccionAcostarce':
                      arrayAleatorio = arraysAcostarce.interaccionAcostarce;
                      break;
                  case 'mensajesAcostarce':
                      arrayAleatorio = arraysAcostarce.mensajesAcostarce;
                      break;
                  case 'Sueños_A':
                      arrayAleatorio = arraysSuenios.Sueños_A;
                      break;
                  case 'Sueños_B':
                      arrayAleatorio = arraysSuenios.Sueños_B;
                      break;
                  case 'interaccionDespertarce':
                      arrayAleatorio = arraysDespertar.interaccionDespertarce;
                      break;
                  case 'mensajesDespertarce':
                      arrayAleatorio = arraysDespertar.mensajesDespertarce;
                      break;
                  default:
                      break;
              }
      
              // Verificar que el array tenga elementos antes de acceder al primer elemento
              if (arrayAleatorio.length > 0) {
                  // Obtener un índice aleatorio dentro del rango de elementos del array
                  const indexDialogo = Math.floor(Math.random() * arrayAleatorio.length);
                  // Agregar el elemento aleatorio al nuevoArray
                  this.nuevoArray.push(arrayAleatorio[indexDialogo]);
                  this.ArrayindexDialogo.push(indexDialogo);
              }

          }
          // --- llamar a las funciones si salen como primera opcion, antes de hacer algun click llamando a la funcion contador de clicks
          if (this.listaNetadeArrays[this.varContadorDeClicks] === "interaccionAcostarce") {
            this.interaccionAcostarce();     
          } else if (this.listaNetadeArrays[this.varContadorDeClicks] === "interaccionDespertarce") {
            this.interaccionDespertarce();   
          }
          
          return copiaDeLaListaBruta; 
      }

        
      interaccionAcostarce(){
        console.log ("se llamo a interaccion acostarce")
        this.verBotonesIntTurnos = true;
        let opcionesAcostarce = [ 
         /* 0 */
         {"si": "Tomar la comida", "no": "Rechazarla"},
         /* 1 */
         {"si": "Hablar con ella", "no": "Dormir"},
         /* 2 */
         {"si": "Dormir destapado", "no": "Quedarte con las pieles"},   
        ]
 
        this.si = opcionesAcostarce[this.ArrayindexDialogo[0]]["si"]; //el 0 es para elegir el primero (array acostarce)
        this.no = opcionesAcostarce[this.ArrayindexDialogo[0]]["no"];

      };

      interaccionDespertarce(){
        console.log ("se llamo a interaccion despertarce")
        this.verBotonesIntTurnos = true;
        let opcionesDespertarce = [ 
          /* 0 */
          {"si": "Seguir acostado", "no": "Levantarce"},
          /* 1 */
          {"si": "Ayudarla", "no": "Seguir durmiendo"},
          /* 2 */
          {"si": "Ignorarla", "no": "Pedirle que haga menos ruido"}, 
          /* 3 */ 
          {"si": "Devorarlo salvajemente", "no": "Devorarlo salvajemente"}, 
         ]
         this.si = opcionesDespertarce[this.ArrayindexDialogo[this.ArrayindexDialogo.length - 1]]["si"]; // el lenght - 1 es para eleguir el ultimo (array despetarce)
         this.no = opcionesDespertarce[this.ArrayindexDialogo[this.ArrayindexDialogo.length - 1]]["no"];

      };

      respuestasTurnosSI(){
        
        if (this.listaNetadeArrays[this.varContadorDeClicks] === "interaccionAcostarce" ){
          this.textoTemporal = this.arrayRespuestasAcostarce[this.ArrayindexDialogo[0]]["si"];
        }
        if (this.listaNetadeArrays[this.varContadorDeClicks] === "interaccionDespertarce" ){
          this.textoTemporal = this.arrayRespuestasDespertarce[this.ArrayindexDialogo[this.ArrayindexDialogo.length - 1]]["si"];
        }
        this.mostrarTextoTemporal = true;
        this.verBotonesIntTurnos = false;
      };

      respuestasTurnosNO(){
        
        if (this.listaNetadeArrays[this.varContadorDeClicks] === "interaccionAcostarce" ){
          this.textoTemporal = this.arrayRespuestasAcostarce[this.ArrayindexDialogo[0]]["no"];
        }
        if (this.listaNetadeArrays[this.varContadorDeClicks] === "interaccionDespertarce" ){
          this.textoTemporal = this.arrayRespuestasDespertarce[this.ArrayindexDialogo[this.ArrayindexDialogo.length - 1]]["no"];
        }
        this.mostrarTextoTemporal = true;
        this.verBotonesIntTurnos = false;
      };

  //----------------FIN DIALOGOS-------------------------------------


  // ------------------------ notificaciones -----------------------------------------------
  constructor (
    private contadorService: ContadorService, 
    public notificacionesService: NotificacionesService,
    public configuracionDatos: ConfiguracionDatos, // Servicio inyectado
  ) {}

  incrementarContador(): void {
    this.contadorService.incrementar(); // cambia el valor del día actual +1
    this.notificacionesService.actualizarNotificaciones(); // se actualizan las notificaciones al pasar de día
  }

  ngOnInit(): void { //se actualizan las notificaciones al iniciar el programa
    this.notificacionesService.actualizarNotificaciones()

    this.notificacionesService.generarArraysDeHistoriales() // Generar los arrays dinámicos de historiales

    // Esto asegura que el servicio notificaciones sea utilizado
    this.notificacionesService.fakengOninit()

  }

}







