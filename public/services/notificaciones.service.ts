import { Injectable, Injector } from '@angular/core';
import { ContadorService } from './contador-dias.service';
import { Firestore, doc, getDoc, setDoc } from '@angular/fire/firestore';
import { ConfiguracionDatos } from '../../src/app/firebase-component/carga-de-datos';
import { AuthService } from "./auth.service";
@Injectable({
  providedIn: 'root',
})
export class NotificacionesService {
  notificacionesVisibles: any[] = [];
  respuestasVisibles: string[] = [];
  noticiasDisponibles: any[] = []; // es una copia de notificacionesVisibles que se usa para no alterar el array original
  arrayHistorialesDeCadaNoticia: any[] = [];
  N: number = 1; // No poner 0
  ID = '';
  colorActivoPrimario: string = 'aun no definido';
  colorActivoSecundario: string = 'aun no definido';
  conversacion: string = 'aun no definido';
  currentPageNoticia: number = 0; // Para seleccionar noticias con los botones
  dialogoActivo: string = 'aun no definido';
  textoLargoSeleccionado = 'aun no definido';
  finDialogosValueN: number = 0;
  finDialogosBoolean: boolean = false; // Esto se usa para desaparecer los diálogos de respuestas si no hay más disponibles
  interrumpirDialogo: boolean = false; // Esto se usa para desaparecer los diálogos de respuestas si se llega a uno -EMPTY-
  noticiaSinVer: boolean = true;
  noticiasSinResponder: boolean = false;

  arrayColoresPSinVer: any[] = [];
  CopiaElementosOcultos: any[] = [];
  arrayDialogosSinTerminar: any[] = [];

  dialogoIrADormir: string = 'Te preparas para descansar luego de un largo día';

  /* Cosas firestore */
  private userId: string | null = null;
  public variableActualizarDialogosSiONo = false;

  constructor(
    private contadorService: ContadorService,
    private configuracionDatos: ConfiguracionDatos,
    private firestore: Firestore,
    private injector: Injector, // Inyección diferida para evitar dependencia circular
    authService: AuthService
  ) {
    authService.userId$.subscribe((userId) => {
      this.userId = userId;
    });
  }

  private obtenerConfiguracionDatos(): ConfiguracionDatos {
    return this.injector.get(ConfiguracionDatos);
  }


  getValor(): boolean {
    const configuracionDatos = this.obtenerConfiguracionDatos();
    return configuracionDatos.todasNoticiasVistas; 
  }
  
  setValor(valorBooleano: boolean): void {
    const configuracionDatos = this.obtenerConfiguracionDatos();
    configuracionDatos.todasNoticiasVistas = valorBooleano;
  }

  
  actualizarNoticiasVistas(valor: boolean): void {
    const configuracionDatos = this.obtenerConfiguracionDatos();
    configuracionDatos.todasNoticiasVistas = valor;
  }
  


  guardarTodasNoticiasVistas(): void {
    if (!this.userId) {
      console.log("El usuario no está autenticado.");
      return;
    }

    const userDoc = doc(this.firestore, "usuarios", this.userId);
    const data = { todasNoticiasVistas: this.configuracionDatos.todasNoticiasVistas };

    setDoc(userDoc, data, { merge: true })
      .then(() => console.log("todasNoticiasVistas guardado exitosamente."))
      .catch((error) => console.error("Error al guardar todasNoticiasVistas:", error));
  }

  guardarNotificacionesVisibles(): void {
    if (!this.userId) {
      console.log("El usuario no está autenticado.");
      return;
    }

    const userDoc = doc(this.firestore, "usuarios", this.userId);
    const data = { notificacionesVisibles: this.notificacionesVisibles };

    setDoc(userDoc, data, { merge: true })
      .then(() => console.log("Notificaciones visibles guardadas exitosamente."))
      .catch((error) => console.error("Error al guardar notificaciones visibles:", error));
  }

  recuperarTodasNoticiasVistas(): void {
    if (!this.userId) {
      console.log('El usuario no está autenticado.');
      return;
    }
  
    const userDoc = doc(this.firestore, 'usuarios', this.userId);
  
    getDoc(userDoc)
      .then((docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          const configuracionDatos = this.obtenerConfiguracionDatos();
          configuracionDatos.todasNoticiasVistas = data?.['todasNoticiasVistas'] ?? 0; // Valor por defecto es 0.
          console.log('todasNoticiasVistas recuperado:', configuracionDatos.todasNoticiasVistas);
        } else {
          console.log('No se encontraron datos para el usuario.');
        }
      })
      .catch((error) =>
        console.error('Error al recuperar el todasNoticiasVistas:', error)
      );
  }

  recuperarNotificacionesVisibles(): void {
    if (!this.userId) {
      console.log("El usuario no está autenticado.");
      return;
    }
  
    const userDoc = doc(this.firestore, "usuarios", this.userId);
  
    getDoc(userDoc)
      .then((docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          this.notificacionesVisibles = data?.['notificacionesVisibles'] ?? [];
          console.log("Notificaciones visibles recuperadas:", this.notificacionesVisibles);
        } else {
          console.log("No se encontraron datos para las notificaciones visibles.");
        }
      })
      .catch((error) =>
        console.error("Error al recuperar las notificaciones visibles:", error)
      );
  }
  



  /*  LOS "COLORES" EN LOS ARRAYS SON LA FORMA EN QUE LLAMO A LOS CODIGOS UNICOS DE IDENTIFICACION */


  private noticias = [
    {día: 0, 
      semana: 1, 
      finDialogos: 0, 
      interaccionTerminada: false,
      titulo: `Se marchan los emisarios`, 
      colorPrimario: 'd0-s1-smle',
      texto: `Se retiran los dos hombres de Shàmman Shàmman Zoden (muchas, muchas casas), que se presentaron ante ti como como viajeros de esta tribu. 
      
      Te relaja saber que ya no estaran molestandote pidientote mas favores como si fueran el propio Lam-Tolis encarnado, sin embargote han quedado dudas hacerca de su execiva "curiosidad" haciendote preguntas.`},

    {día: 1, 
      semana: 1, 
      finDialogos: 3,
      interaccionTerminada: false,
      titulo: `Un conocindo vino a verte!`,
      colorPrimario: `d1-s1-ucvav`, 
      texto: `Öntak Luror (brazo cruel), el nuevo líder de la tribu del pantano con quien luchaste un duelo justo, ha venido a verte. 
      Se presenta ante ti con 3 hombres que lo acompañan.`},

    {día: 2, 
      semana: 1, 
      finDialogos: 0, 
      interaccionTerminada: false,
      titulo: `Rumores de la boda`, 
      colorPrimario: 'd2-s1-rdlb', 
      texto: `Has escuchado cotillear a las mujeres ancianas mas de una vez sobre una supuesta boda entre ti y `},
    
    {día: 3, 
      semana: 1, 
      finDialogos: 3,
      interaccionTerminada: false,
      titulo: `Druida desaparecido`,
      colorPrimario: 'd1-s1-dd', 
      texto: `Namàsh Inrus (el personaje del Satu, druida-alcoholico-alquimista de dudosas posiones), se a marchado y no sabes mucho sobre el desde hace dias.`},
    
  ]
//**********respuestasN1*******************respuestasN1***********respuestasN1************ */
  public respuestasN1 = [
    {                           /* -+-+-+-+-+-+-+-+-+-+-+-+-++-+-+- */
      colorPrimario: `d1-s1-ucvav`,
      arrayRespuestas: [
        { colorSecundario: `complacer`, 
          textoCorto: `Vaya, pero si es el fortachón!`,
          textoLargo: `Vaya, pero si es el hombre más fuerte del pantano! Has venido a derribar una montaña? Esta no por favor, que vivo ahí! Ha ha ha.`
        },
        { colorSecundario: `agredir`, 
          textoCorto: `Oh, no tú otra vez.`, 
          textoLargo: `Oh, no me digas que ahora vienes por la revancha? Ya tuve suficiente de duelos.` 
        },
        { colorSecundario: `perspicacia`, 
          textoCorto: `(Silencio) - [Lo observas con perspicacia]`, 
          textoLargo: `[Lo observas en silencio mientras tratas de discernir si se aproxima con buenas o malas intenciones. Se lo ve serio pero se acerca con las manos desarmadas y relajadas. (Porta un gran mazo de madera colgando en la espalda).]`
        },
      ],
    },

    {                            /* -+-+-+-+-+-+-+-+-+-+-+-+-++-+-+- */
      colorPrimario: `d1-s1-dd`,
      arrayRespuestas: [
        { colorSecundario: `neutro`, 
          textoCorto: `Bueno, estará bien.`,
          textoLargo: `"Si necesitaba ayuda me lo hubiera dicho. Solo espero que esto no cause problemas, los chamanes son un poco impredecibles."` 
        },
        { colorSecundario: `mision`, 
          textoCorto: `[Enviar a alguien a averiguar]`,
          textoLargo: `[Puedes abrir la pestaña de misiones y crear una para enviar a alguien a ver en qué está metido Namàsh.]` 
        },
        { colorSecundario: `actuar`, 
          textoCorto: `[Viajar tú mismo a la cima]`,
          textoLargo: `[Dejas tu rutina diaria y te preparas para el arduo viaje hacia la cima... otra vez. Te preguntas si realmente vale la pena subir hasta allí por lo que podría ser solamente otro delirio alucinógeno del chamán, y desearías poder saber la respuesta sentado en una silla sin hacer nada.]` 
        },
      ],
    }
  ];
/************DialogosN2******************DialogosN2*******************DialogosN2********************** */
  
  public dialogosN2 = [
      { colorPrimario: `d1-s1-ucvav`,

        arrayDialogosN2: [
          {colorSecundario: `complacer`,
            dialogo: `
          "Ha Ha, menos mal que lo dices, ya estaba apunto de llevarmela al pantano!"
          [Muestra una fugaz sonriza y se saludan con un apretón de manos muy varonil]
          "He traido unos obsequios para tu gente, quisiera darselos al Erar Sáram, podrias llevarme con él?"`,
          } ,
          {colorSecundario: `agredir`,
            dialogo:`
            "Calma guerrero, que no soy una hiena de las cavernas." [dice con un poco de frustracion en su mirada y tono de voz]
          "He venido para ver al Erar Sáram, traje unas ofrendas si hace falta.
          `
          },
          {colorSecundario: `perspicacia`,
            dialogo: `
            [El gran hombre se detiene muy cerca de ti y te mira fijamente, tus musculos se tensan un poco, se siente justo como en los ultimos momentos antes de tu duelo con él]

          "He, tienes la mirada fría como las aves de los cuentos de terror."
          [Te da un fuerte abrazo varonil y sonrie fugazmente]
          "Creo que tienes buena madera para ser líder. Hablando de eso, he venido a ver a tu Erar Sáaram, le traigo obsequios.
          Puedes llevarme con él?"
          `
          },
        ]
      },

      { colorPrimario: `d1-s1-dd`,
        
        arrayDialogosN2: [
          { colorSecundario: `neutro`, 
            dialogo: `-EMPTY-` 
          },
           { colorSecundario: `mision`, 
            dialogo: `-EMPTY-` 
          },
           { colorSecundario: `actuar`, 
            dialogo: `
            [Tras un arduo viaje que finaliza con la puesta del sol, alcansas la cueva de la hiena gigante. Decides descansar un rato allí y hechas un vistaso antes para comprovar que no hay peligro.]
            
            [Cuando estas seguro de que no hay nada dentro, das marcha atras para traer tu saco con provisiones pero tropiesas con algo... o alguien mejor dicho.]
            
            [Un obeso chaman yase en el suelo acostado con una roca de almohada, la boca abierta babeando]
            ` 
          }
        ]
      }    
  ]
/************respuestasN2******************respuestasN2*******************respuestasN2********************** */
  public respuestasN2 = [
    {
      colorPrimario: `d1-s1-ucvav`,
      arrayRespuestas: [
        { colorSecundario: `normal`, 
          textoCorto: `Öntak, hay algo que deves saber...`, 
          textoLargo: `Si buscas al Gran Sabio hay algo que devo decirte.
          [Lo miras con seriedad dando a entender que algo grave ha ocurrido]...
          [Lo invitas a sentarte en un lugar comodo junto a sus acompañantes y te escuchan con atencion. Le cuentas la historia de lo sucedido al completo].
          `
        },
        { colorSecundario: `perspicacia`, 
          textoCorto: `Que clase de obsequios?`, 
          textoLargo: `"Devo ver primero que le vas a ofrecer al Erar Sáram. Son las reglas."
          `
        },
        { colorSecundario: `complacer`, 
          textoCorto: `Buscas al sabio? lo tienes aqui!`, 
          textoLargo: `"Pues tu busqueda ha terminado, lo tienes aqui delante tuyo ha ha! No iva a dejar que fueras el Erar Sáram mas joven de por aqui eh?" [dices alegremente al hombre que se rasca la cabeza rapada mostrandose un poco confundido]

          [Lo invitas a sentarte en un lugar comodo junto a sus acompañantes y te escuchan con atencion. Le cuentas la version resumida de todo lo sucedido desde su encuentro en el pantano].
          `
        }
      ],
    },
    {
      colorPrimario: `d1-s1-dd`,
      arrayRespuestas: [
        { colorSecundario: 'actuar', 
          textoCorto: `[Jugarle una broma mientras duerme]`, 
          textoLargo: `[Tomas un muercielago muerto que yase en el suelo y te escondes detras de Namàsh, haciendo que el murcielago "camine" sobre su cara.
          El somnoliento enano se rasca la cara y abre los ojos subitamente al darse cuenta de que algo peludo esta sobre él. Su reaccion de panico al revolcarse por el suelo tratando de quitarce la criatura te hace reír a carcajadas.]
          `
        },
        { colorSecundario: 'normal',
          textoCorto: `"Estas bien Namàsh?"`,
          textoLargo: `"Namàsh despierta, te encuentras bien?
          `},
        { colorSecundario: 'agredir',
          textoCorto: `[Patearlo]`,
          textoLargo: `"TUVE QUE VENIR HASTA AQUI SOLO PARA ENCONTRATE DURMIENDO??! [Le reclamas mientras le das un par de golpecitos con el pie para despertarlo]
          ` }
      ],
    }
  ];
/************dialogosN3******************dialogosN3*******************dialogosN3********************** */
  public dialogosN3 = [
    {
      colorPrimario: `d1-s1-ucvav`,
      arrayDialogosN3: [
        { 
          colorSecundario: 'normal',
          dialogo: `[Öntak responde]
          "El final de un Gran Sabio es siempre un momento muy duro en la vida de todos, Etägók. Lamento oir que las flores del pantano no te sirvieran, incluso traje algunas mas por si necesitabas mas."

          [Hace una pausa]

          "Ese jodido anciano si que era astuto he? ha ha nos engaño a todos!" [Dice con clara intencion de cambiar los animos]
          
          "Pero creo que hiso lo correcto, veo en tí a alguien de brazo fuerte y el corazon amable. Como una madre oso que proteje a sus cachorros, creo que tu tambien cuidaras a tu gente. Yo tambien soy nuevo en esto de ser el líder de la tribu, ojala pueda inspirarlos como tu lo haces."

          [Se pone de pie, seguido por sus acompañantes. Uno de ellos te ayuda a levantarte jalandote de la mano]
          "Bueno, creo que estos obsequios te pertenecen... Erar Sáaram.
          Y una cosa mas, quisiera pedirte el favor de hospedarme un tiempo con tu gente. Se que en el pasado nuestras tribus se hicieron mucho daño, pero te prometo que no quiero causar problemas."
          `
        },
        {
          colorSecundario: 'perspicacia',
          dialogo: `[El bárbaro del pantano y su sequito asienten con la mirada. Desembolsan los objetos y te explican que son:
           - Unas flores brillantes del pantano justo como las que fuiste a buscar para curar al Erar Sáaram. Aun estan vivas en su tierra y parecen aver sido traidas con gran precaucion en una cesta hecha especialmente.
           - Un saco lleno de peces ahumados.
           - Un collar con talisman de madera negra con el simbolo del pino (Shammán-Fottor) y figuras de personas y animales tallados en la dura madera y pintado con un extraño tono naranja brillante. Según ellos proteje de malos espiritus y otorga sabiduria. 
           - Un casco de craneo de caimán con una cresta de piel de nutria y dos caparazones de tortuga cubriendo los lados y la parte posterior de la cabeza. Todas las piesas estan unidas con fibra vegetal.
           El craneo de caiman sirve como visera del casco y tiene tallados el simbolo del pino (Shammán-Fottor) en la parte inferior y la montaña del atardecer (Volal-Tolis) en la parte superior, simbolizando la union de ambas deidades.
           El casco muestra ser de una factura de muy buena calidad.]
          `
        },
        {
          colorSecundario: 'complacer',
          dialogo: `[Öntak responde]

          "El final de un Gran Sabio es siempre un momento muy duro en la vida de todos, Etägók. Me alegro de ver que este suseso no haya podido derrumbar tu caracter."

          [Hace una pausa]
           
          "Pero creo que hiso lo correcto, veo en tí a alguien de brazo fuerte y el corazon amable. Como una madre oso que proteje a sus cachorros, creo que tu tambien cuidaras a tu gente. Yo tambien soy nuevo en esto de ser el líder de la tribu, ojala pueda inspirarlos como tu lo haces."

          [Se pone de pie, seguido por sus acompañantes. Uno de ellos te ayuda a levantarte jalandote de la mano]

          "Bueno, creo que estos obsequios te pertenecen... Erar Sáram.
          Y una cosa mas, quisiera pedirte el favor de hospedarme un tiempo con tu gente. Se que en el pasado nuestras tribus se hicieron mucho daño, pero te prometo que no quiero causar problemas."
          `
        }
      ]
    },
    { colorPrimario: `d1-s1-dd`,
      arrayDialogosN3: [
        { colorSecundario: 'actuar',
          dialogo: `"No fue tan gracioso!" [Contesta un poco avergonzado]
          "Yo podria haver hecho una broma mejor", [añade mientras se sacude el polvo].

          Disculpa Etägók, pero el brujo de la cima me pidio que viniera. 
          No me lo vas a creer, pero un pajaro me hablo con su voz!, te lo juro. 
          Ahora me está entrenando para un ritual, te parecerá broma pero la idea de venir a la cueva y quedarme dormido no fue mia, Litez me dijo que bebiera una medicina especial y tratara de dormir por un día entero. Pero eso no es facil, ni siquiera para mi ha ha.
          `
        },
        { colorSecundario: 'normal',
          dialogo: `[El somnoliento chaman se despierta sin mucha prisa]
          
          Eh, que paso? [se frota los ojos y te mira] 
          Etägók, que haces aqui?

          Lamento si te preocupaste por mí, pero el brujo de la cima me pidio que viniera. 
          No me lo vas a creer, pero un pajaro me hablo con su voz!, te lo juro. 
          Ahora me está entrenando para un ritual, te parecerá broma pero la idea de venir a la cueva y quedarme dormido no fue mia, Litez me dijo que bebiera una medicina especial y tratara de dormir por un día entero. Pero eso no es facil, ni siquiera para mi ha ha.
          `
        },
        { colorSecundario: `agredir`,
          dialogo: `[Namàsh se levanta un exaltado]
          
          "Eh, que paso?... oh, bueno, tampoco te pedi que vinieras, no te enfades.

          El brujo de la cima me pidio que viniera. 
          No me lo vas a creer, pero un pajaro me hablo con su voz!, te lo juro. 
          Ahora me está entrenando para un ritual, te parecerá broma pero la idea de venir a la cueva y quedarme dormido no fue mia, Litez me dijo que bebiera una medicina especial y tratara de dormir por un día entero. Pero eso no es facil, ni siquiera para mi ha ha."
          `
        },
      ]
    },
    
  ]
/************respuestasN3******************respuestasN3*******************respuestasN3********************** */
  public respuestasN3 = [
    {
      colorPrimario: `d1-s1-ucvav`,
      arrayRespuestas: [
        {
          colorSecundario: 'complacer',
          textoCorto: `"Por supuesto, amigo"
          `,
          textoLargo: `"Por supuesto que eres bienvenido en Muchas Casas, Öntak. Eres el Erar Sáram de una tribu, y te considero mi amigo tambien".
          
          [Aprietas su mano de forma varonil y le das una palmada en el hombro mientras sonries].
          `
        },
        {
          colorSecundario: 'agredir',
          textoCorto: `"Lo siento pero no."
          `,
          textoLargo: `"Lo siento Öntak, pero mi tribu aun recuerda los tiempos en que tuvimos que luchar contra los ancestros de to clan para mantener nuestra tierra.
          Fueron exiliados por orden del Gran Sabio entonces y desovedecer su palabra seria una ofensa como nuevo Erar Sáram."
          `
        },
        {
          colorSecundario: 'seducir',
          textoCorto: `"Podrias, a cambio de tu ayuda"`,
          textoLargo: `"Tu pueblo esta perdonado en lo que a mi respecta, Erar Sáram. Sin embargo no puedo hablar por mi gente, los mas ancianos eran jovenes cuando se libro la ultima lucha entre nuestros clanes, todos han oído las historias.

          Si vas a quedarte aqui por un tiempo deves limpiar la mancha de sangre que dejaron tus ancestros, y creo que la mejor forma seria ayudando honradamente en Muchas Casas."
          `,
        }
      ],
    },
    {
      colorPrimario: 'd1-s1-dd',
      arrayRespuestas: [
        {
          colorSecundario: 'normal',
          textoCorto: `"Buena suerte con eso"`,
          textoLargo: `"Bueno, me alegro que no fuera solo un delirio tuyo por beber tus pociones raras.
          No se que tendra en mente el brujo de la montaña pero si te pidio que duermas como un oso en invierno no creo que deva preocuparme.
          ...
          Solo trata de no caer cuesta abajo, esta bien?"
          
        [El chaman se rie y asiente con la cabeza. Se despiden y emprendes el largo viaje cuesta abajo mientras oscurece, tratando de no ser tu quien cae por la cuesta.
        
        Al regresar a tu hogar te sientas comodamente y Ginyik te pregunta si te llevaste la comida para la cena.

        En ese momento recuerdas que dejaste tu bolsa con suministros en la entrada de la cueva.]
          `
        },
      ]
    }
  ]
  

  actualizarArrayColoresPSinVer(indicePagina: number){
    // console.log("se llamo actualizarArrayColoresPSinVer: ")
    // console.dir(this.arrayColoresPSinVer)
    
    const colorPrimarioSeleccionado = this.notificacionesVisibles[indicePagina].colorPrimario;
    const indexColor = this.arrayColoresPSinVer.indexOf(colorPrimarioSeleccionado);

    // Si el color está en coloresSinver, lo eliminamos
    if (indexColor !== -1) {
    this.arrayColoresPSinVer.splice(indexColor, 1);
    }
  }

  funcionChekearNotificacionesVistas() {
    console.log("se llamo a funcion Chekear Notificaciones Vistas")
    const configuracionDatos = this.obtenerConfiguracionDatos();
    console.log("databaseNoticiasVistasExiste = " + configuracionDatos.databaseNoticiasVistasExiste)
    console.log("baseDatosConsultada = " + configuracionDatos.baseDatosConsultada)

    if (configuracionDatos.baseDatosConsultada === true && configuracionDatos.databaseNoticiasVistasExiste === true){
      console.log ("se omitio la funcion funcionChekearNotificacionesVistas al verificarse que las variables que modifica ya existen en la base de datos")
      return
    } 
    if (this.variableActualizarDialogosSiONo === true){
      this.variableActualizarDialogosSiONo = false
      return
    }
    
    else {
      /* primero chekamos que la antorcha informes este apagada */
      
      if (this.noticiaSinVer || !this.CopiaElementosOcultos.includes('informes')){
        configuracionDatos.todasNoticiasVistas = false
        // console.log("antorcha informes esta encendida, todasNoticiasVistas: " + configuracionDatos.todasNoticiasVistas)
        return
      }
      /* luego chekeamos que se haya abierto la ventana de cada noticia disponible */
      if (this.arrayColoresPSinVer.length > 0){
        configuracionDatos.todasNoticiasVistas = false
        // console.log("hay noticias sin ver, todasNoticiasVistas: " + configuracionDatos.todasNoticiasVistas)
        return
      }
      /* luego chekeamos que todas las interacciones ayan llegado a su fin si no hay opciones de dialogo visibles */

      if (this.noticiasDisponibles.some(noticia => !noticia.interaccionTerminada)) { // Usamos `some` para verificar si hay interacciones sin terminar
      configuracionDatos.todasNoticiasVistas = false;
      // console.log("hay noticias sin interactuar, todasNoticiasVistas: " + configuracionDatos.todasNoticiasVistas);
      return;
      }

      configuracionDatos.todasNoticiasVistas = true
      // console.log("no se encontraron notificaciones sin ver o interactuar, todasNoticiasVistas: " + configuracionDatos.todasNoticiasVistas)
    }
  }

  funcionActualizarDialogoIrADormir(){
    // console.log("se llamo a funcionActualizarDialogoIrADormir, ademas todasNoticiasVistas: " + configuracionDatos.todasNoticiasVistas)
    const configuracionDatos = this.obtenerConfiguracionDatos();{
    console.log ("se llamo a funcionActualizarDialogoIrADormir, todasNoticiasVistas:  " + configuracionDatos.todasNoticiasVistas)

      if(configuracionDatos.todasNoticiasVistas === true) {
        this.dialogoIrADormir = "Te preparas para descansar luego de un largo día"
      } else {
        this.dialogoIrADormir = "Aún tienes noticias pendientes"
      }
    }
  }

  // Función para actualizar las notificaciones visibles
  actualizarNotificaciones(): void {
    const contador = this.contadorService.getValor();  // Obtener el valor del contador
    
    this.noticias.forEach(noticia => {  // Actualiza las notificaciones visibles
      if (noticia.día <= contador && !this.notificacionesVisibles.includes(noticia)) {
        this.notificacionesVisibles.push(noticia);
        this.arrayColoresPSinVer.push(noticia.colorPrimario); /* esto es para chekear noticias sin interactuar */
        this.noticiaSinVer = true /* esto es para las antorchas */
        }      
      }
    );

    // console.log ("se llamo a actualizar notificaciones: ")
    // console.dir(this.notificacionesVisibles)
    this.actualizarFinDialogos()
  }

  fakengOninit(){     /* esta funcion funciona como oninIt para que se le de valor a la variable antes de que traten de usarla y no crashee todo, para eslo la llamo desde el onInit del app.component*/

    this.noticiasDisponibles = this.obtenerNotificacionesVisibles();
    // Verifica si noticiasDisponibles tiene datos antes de asignar el valor a dialogoActivo
    if (this.noticiasDisponibles.length > 0) {
      this.dialogoActivo = this.noticiasDisponibles[this.currentPageNoticia].texto;
    } else {
      console.error("No hay notificaciones disponibles.");
    }
    
    this.noticiasDisponibles = this.obtenerNotificacionesVisibles();
    // console.log("Array de noticias disponibles:");
    // console.dir(this.noticiasDisponibles);
    
    this.actualizarArrayColoresPSinVer(0) /* esto es para chekear notificaciones sin interactuar */
  }

  obtenerNotificacionesVisibles(): any[] {
    return this.notificacionesVisibles;
  }

  
  actualizarColorPrimario(index: number): void {
    this.colorActivoPrimario = this.notificacionesVisibles[index].colorPrimario;
    // console.log("se llamo a actualizarColorPrimario/ colorActivoPrimario: " + this.colorActivoPrimario)
  }



  // LOGICA DLE HISTORIAL DE DIALOGOS:        -+-+-+--++-+--+-++--+-          -+-+-+--++-+--+-++--+-

  generarArraysDinamicos(): any[] {     // Método para generar arrays dinámicos vacíos con el campo "colorPrimario" copiado
    return this.noticias.map((noticia) => {
      return {
        colorPrimario: noticia.colorPrimario, // Copia el colorPrimario
        items: [],  // Inicialmente vacío
        nivelDialogo: 1,
        colorSecundarioGuardado: '',
      };
    });
  }

  generarArraysDeHistoriales(): void {// le da a la variable "arrayHistorialesDeCadaNoticia" un objeto con colorPrimario por cada noticia posible
    this.arrayHistorialesDeCadaNoticia = this.generarArraysDinamicos();
  }

  // Método para agregar objetos a un array dinámico generado
  agregarObjetoAlArray(arrayDinamico: any, conversacion: string, respuestas: string,): void {
    // console.log("se llamo agregarObjetoAlArray")
    arrayDinamico.items.push({
      conversacion: conversacion,
      respuestas: respuestas,
    });

    /* ese if asegura que el valor de N no siga creciendo cuando llego al LiteralPrimitive, y que se resetee el valor de N al clikear otra noticia */
    if (this.finDialogosBoolean === false){   
      arrayDinamico.nivelDialogo += 1 
      // console.log("se incremento el valor nivelDialogo (osea el N) del objeto seleccionado")

      arrayDinamico.colorSecundarioGuardado = this.colorActivoSecundario
      // ("se actualizo el valor de este array dinamico de color Secundario GUARDADO: " + arrayDinamico.colorSecundarioGuardado)
    } else {
      // console.log("no se incremento el niveldialogo(valor N) dle objeto seleccionado")
    }
    this.actualizarValorN()

    this.actualizarDialogoActivo() //IMPORTANTE, ACTUALIZAR LA VARIABLE DESPUES DE PUSHEAR SU VALOR EN EL HISTORIAL
  }

  actualizarValorN(){
    const arraySeleccionado = this.arrayHistorialesDeCadaNoticia.find(obj => obj.colorPrimario === this.colorActivoPrimario);
    
    this.N = arraySeleccionado.nivelDialogo;
    // console.log("se llamo a actualizar N, valor N: " + this.N)

    if(arraySeleccionado === undefined){
      console.log("arraySeleccionado no definido, se interrumpe actualizarValorN")
      return
    }
  }

  determinarVariables(): void {
 
    // Seleccionar el objeto que tiene un colorPrimario específico
    const objetoSeleccionado = this.arrayHistorialesDeCadaNoticia.find(obj => obj.colorPrimario === this.colorActivoPrimario);
    // console.log("determinar variables => objetoSeleccionado: " + objetoSeleccionado)
    // Agregar dos propiedades strings (conversacion y respuestas) al array "items" de ese objeto
    if (objetoSeleccionado) {
      this.agregarObjetoAlArray(objetoSeleccionado, this.dialogoActivo, this.textoLargoSeleccionado,);
    }
  }


  actualizarDialogoActivo() {

    this.interrumpirDialogo = false
    this.actualizarValorN() //si se quita esto usa el valor N de la pagian previa seleccionada, no la actual
    this.actualizarFinDialogos()

    // Método para actualizar dialogoActivo (el dialogo arriba del selector)
    if (this.finDialogosBoolean === true || this.noticiasDisponibles[this.currentPageNoticia].finDialogos === 0) {
      this.dialogoActivo = this.noticiasDisponibles[this.currentPageNoticia].texto;
      // console.log("se llamo al if 1, finDialogosBoolean (deve ser true)= " + this.finDialogosBoolean + ' fin dialogos(deve ser 0) = ' + this.noticiasDisponibles[this.currentPageNoticia].finDialogos)
      return;      
    }
    // Selección del diálogo en función de `N`
    const N = this.N
    
    switch (N) {
      case 1:
        // console.log("se llamo al if switch 1")
        this.dialogoActivo = this.noticiasDisponibles[this.currentPageNoticia]?.texto || '';
        if (this.dialogoActivo === "-EMPTY-"){
          this.interrumpirDialogo = true
          this.notificacionesVisibles[this.currentPageNoticia].interaccionTerminada = true
          // console.log("CASO 1 / interrumpirDialogo pasa a ser true, se resetea a false al clikear la proxima noticia")
          return
        }    
        break;
  
      case 2:
        this.actualizarDialogoN2(this.dialogosN2);
        break;
  
      case 3:
        this.actualizarDialogoN3(this.dialogosN3);
        // console.log("se llamo al if switch 3")
        break;

      case 4:
        this.actualizarDialogoN4(this.respuestasN3);
        // console.log("se llamo al if switch 4")
        break;

      default:
        console.warn("Valor de N no válido: " + N);
        break;
    }
    
    /* anula el dialogo si y solo si es una ventana interactuable que llego al final de los dialogos y solo queda mostrar el historial */

  }

  // Método para evitar duplicación de código en N2 y N3
  actualizarDialogoN2(dialogos: any[]) {
    let dialogoEncontrado = false;  // Bandera para verificar si se encuentra un diálogo
  
    dialogos.forEach(elementA => {
      
      if (this.colorActivoPrimario === elementA.colorPrimario) {
        elementA.arrayDialogosN2.forEach((elementB: any) => {

          if (this.colorActivoSecundario === elementB.colorSecundario) {
            // console.log("se igualaron los colores secundarios y se actualizo el dialogo activo")
            this.dialogoActivo = elementB.dialogo;
            dialogoEncontrado = true;  // Marcamos que se encontró un diálogo

            if (this.dialogoActivo === "-EMPTY-"){
              this.interrumpirDialogo = true
              this.notificacionesVisibles[this.currentPageNoticia].interaccionTerminada = true
              // console.log("CASO 2 / interrumpirDialogo pasa a ser true, se resetea a false al clikear la proxima noticia")
              return
            }  
            return
          }
          return

        });

        return
      } else {
        console.log("Comparando colores primarios: " + this.colorActivoPrimario + " =? " + elementA.colorPrimario);
      }
    });
  
    if (!dialogoEncontrado) {
      console.log("DIALOGO ACTIVO VACIO");  // Si no se encontró diálogo, lo dejamos vacío
    }
  
  }

  actualizarDialogoN3(dialogos: any[]) {
    dialogos.forEach(elementA => {
      
      if (this.colorActivoPrimario === elementA.colorPrimario) {
        elementA.arrayDialogosN3.forEach((elementB: any) => {
          
          if (this.colorActivoSecundario === elementB.colorSecundario) {
            // console.log("se igualaron los colores secundarios y se actualizo el dialogo activo")
            this.dialogoActivo = elementB.dialogo;
          }
          if (elementB.dialogo === "-EMPTY-"){
            this.interrumpirDialogo = true
            this.notificacionesVisibles[this.currentPageNoticia].interaccionTerminada = true
            // console.log("CASO 3 / interrumpirDialogo pasa a ser true, se resetea a false al clikear la proxima noticia")
            return
          } 
        });
      } else{
        console.log("Comparando colores primarios: " + this.colorActivoPrimario + " =? " + elementA.colorPrimario);
      }
    })
  }

  actualizarDialogoN4(dialogos: any[]) {
    dialogos.forEach(elementA => {
      
      if (this.colorActivoPrimario === elementA.colorPrimario) {
        elementA.arrayRespuestas.forEach((elementB: any) => {
          
          if (elementB.dialogo === "-EMPTY-"){
            this.interrumpirDialogo = true
            this.notificacionesVisibles[this.currentPageNoticia].interaccionTerminada = true
            // console.log("CASO 4 / interrumpirDialogo pasa a ser true, se resetea a false al clikear la proxima noticia")
            return
          }    

          if (this.colorActivoSecundario === elementB.colorSecundario) {
            // console.log("se igualaron los colores secundarios y se actualizo el dialogo activo")
            this.dialogoActivo = elementB.respuesta;
          }          
        });
      } else {
        console.log("Comparando colores primario: " + this.colorActivoPrimario + " =? " + elementA.colorPrimario);
      }
    })
  }

  actualizarColorSecundarioActivo(){

    const arrayDinamicoSeleccionado = this.arrayHistorialesDeCadaNoticia.find(obj => obj.colorPrimario === this.colorActivoPrimario);
    this.colorActivoSecundario = arrayDinamicoSeleccionado.colorSecundarioGuardado
    // console.log("color secundario activo actualizado => " + this.colorActivoSecundario)
    
  }

  obtenerSeleccionRespuestas() {
    this.respuestasVisibles = [] // se limpia el array para que no se acumulen respuestas
    let respuestasArray
  
    // Selecciona el array correcto según el valor de N
    if (this.N === 1) {
      respuestasArray = this.respuestasN1;
    } else if (this.N === 2) {
      respuestasArray = this.respuestasN2;
    } else if (this.N === 3) {
      respuestasArray = this.respuestasN3;
    } else {
      console.log("N no coincide para las respuestas")
    }

    // Revisa si respuestasArray está definido y procesa
    respuestasArray?.forEach(elementA => {
      if (elementA.colorPrimario === this.colorActivoPrimario) {
        elementA.arrayRespuestas.forEach(elementB => {
          this.respuestasVisibles.push(elementB.textoCorto);
        });
      }
    });

  }

  actualizarFinDialogos(){
    // console.log("se llamo actualizaar dialogos")
    this.finDialogosValueN = this.notificacionesVisibles[this.currentPageNoticia].finDialogos
    if (this.N > this.finDialogosValueN){
      this.finDialogosBoolean = true
      this.notificacionesVisibles[this.currentPageNoticia].interaccionTerminada = true
      // console.log("noticiasDisponibles: ")
      // console.dir(this.noticiasDisponibles)
    }
    else {
      this.finDialogosBoolean = false
    }
    // console.log(" se llamo a actualizar finDialogosBoolean => " + this.finDialogosBoolean)

  }
      


}
