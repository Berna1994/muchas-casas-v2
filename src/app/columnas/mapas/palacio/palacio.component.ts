import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapasActivosService } from '../../../../../public/services/mapas-activos.service';

@Component({
  selector: 'app-palacio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './palacio.component.html',
  styleUrls: ['./palacio.component.css'],

})
export class PalacioComponent {
  currentPage: number = 0;  //indica a cual de los 3 botones se refiere
  totalPages: number = 3;
  rutaImgInteractuables: string = "no-string";
  textoInteractivo: string = "no-string"


  textosInteractivosPalacio: string[] = [
    `La manufactura de herramientas de piedra experimentó avances significativos durante generaciones. Se perfeccionaron técnicas como la percusión y pulido de piedras para crear herramientas más sofisticadas para gran variedad de actividades, arpones para la pesca, utensilios para extraer dientes infectados, procesar alimentos o bien producir bloques de construccion. 
    
    El uso de estas herramientas impulsó una transformación social y económica, marcando la transición hacia un estilo de vida sedentario basado en la formación de acentamientos permanentes y edificaciones que requerian una sofisticada de coordinacion de entre personas para llevarse a cavo.`, 

    `Las pieles son uno de los recursos mas apreciados, no solo por impresindibles como abrigo sino tambien por su belleza. 
    Devido a la abundancia de recursos y el comportamiento sedentario de las nuevas comunidades, se ha generado multitud de nuevos usos para estos recursos, fomentando el intercambio y la especializacion del trabajo.
    
    En muchas tribus la posesion de pieles es un simbolo de riqueza o prestigio, por lo que siempre hay personas dispuestas a intercambiarlas por algo valioso.`,
  ];
  textosInteractivosCocina1: string[] = [
    `La carne es el alimento mas importante para cualquier persona, no solo su aporte proteinico permitio el desarrollo del cerebro, sino que la busqueda insaciable de este alimento fue el mayor estimulo para la innovacion y la creatividad.

    Sin embargo, mantener la carne comestible sigue siendo un problema, por lo que se utilizan varias maneras para tratarla. Si bien se usan todo tipo de ingredientes para este fin, como hiervas, miel o incluso arcilla, la forma mas comun de tratarla es cocinarla con humo.
    
    Mientras el calor de la hogera derrite la grasa, (la cual se estropea mucho mas rapido que la carne), el humo mata los germenes aerobicos y crea una capa desidratada sobre la carne que ralentiza su descomposicion.`, 

    `El arte de trabajar la piedra no se limita al uso practico de herramientas. En la sociedad de los enanos se elige este material primero por sobre ningun otro, el hecho de haber sobrevivido durante generaciones en las cuevas a forzado a este pueblo a convertirce en grandes maestros en el tallado de la piedra, eligiendo a menudo distintos materiales para distintas funciones.

    Por ejemplo, la piedra caliza se usa para la construccion devido a su abundancia y relativa facilidad de extraccion.
    El marmol y el granito se usan para objetos ornamentales por su color y tenacidad.
    Las piedras cristalinas como el cuarzo se utilizan para toda clase de fines ceremoniales y curativos, muy populares entre los chamanes.
    El silex o pedernal se usa para herramientas y utensilios de corte devido a su gran filo.
    Y la dolomita se utiliza para la cocina y recientemente en la fundicion de metal devido a su gran resistencia al calor. 
    `,
  ];
  textosInteractivosCocina2: string[] = [
    `El bosque ofrece todo tipo de nueces, bayas, verduras, miel, huevos y demas alimentos estacionarios que complementan la dieta habitual de una familia.`,

    `Los hongos no son solamente una fuente mas de alimento, han servido a los enanos desde tiempos remotos cuando deambulaban en las cavernas. Tienen una variedad de usos que van desde mantener brazas calientes para iniciar un fuego, intoxicar el agua para recolectar peces, sirven como pigmentos para tatuajes y ceremonias, y por supuesto los homgos magicos que permiten a los chamanes conectarse con sus visiones.`,
    
    `"Desde que el primer enano aprendio a recolectar alimento, una alimaña aprendio a robarlo".

    Aunque las ardillas, comadrejas, ratones y demas pequeños mamiferos son mascotas muy populares entre los niños, no suelen retenerlas por mucho tiempo cuando se les dice que a partir de ahora toda su comida sera para la pequeña criatura si no la hechan del hogar.`,
  ];
  textosInteractivosDormitorio: string[] = [
    `"Aveces cuando bebo una infusion aqui en este cuarto, recuerdo esas palabras...
    
    La montaña llorando sangre sobre casas destruidas,
    Forastero soplando hambre en la tierra,
    Pieles rojas lanzando niños sobre dos pilares."

    [hace una pausa]

    "Quizas sea porque aqui fue donde el Gran Sabio dio su ultimo suspiro junto a mí, y aún oigo sus palabras.
    
    De cualquier forma, el aroma a hiervas calientes mezclado con el olor a bisin que aun desprende este cuerno siempre me traen nostalgia." `, 
    `Texto 2`,
  ];
  
  constructor(private mapasActivosService: MapasActivosService) {}

/*   mapa: string[] = [
    `Ubicado en tierras altas y boscosas, a los pies de la sagrada montaña de Lam Tolis, yace Shàmman-Zoden, un bullisioso asentamiento cullo nombre significa muchas-casas. Aqui tienen hogar inmumerables familias, distibuidas en pequeñas parcelas con casas de piedra y madera con una particular forma arqueada que les da una aparienca de domo. Estas casas no son especialmente grandes pero suelen conectarse entre varias muy cercanas para crear habitaciones mas amplias para las familias numerosas.

    En la parte mas alta de la ciudad se encuentra el pie de la montaña, en donde hay una cueva en la que se dice que el gran, gran, gran sabio llevo a la tribu. Actualmente en la galeria de la cueva se encuentra el hogar del actual Erar Saram y la sobrina del anterior. 
    El recinto de la galeria se usa para intercanbiar productos entre las gentes del pueblo y tambien forasteros.

    Sobre la cima de la montaña calva, padre de todos nosotros, vive en soledad el brujo Litez, a quien conociste durante la mision que te dio el viejo Erar Saram.
    `,
    `Tambien conocida como la tierra de los hombres-bisin, una tribu de gigantes de las que vienen los erdebisin. 
    Esas tierras jamas han sido visitadas por alguien de muchas casas, pero se conocen historias de los forasteros que vienen regularmente a pedir piesas de cobre y otros productos a cambio de leche, bisins y queso. Ellos dicen que su aldea esta siguiendo el rio en direccion a las estrellas de Anrizudar, y que mas alla se encuentra la tierra de estos hombres misteriosos.
    `,
    `Es la montaña blanca, madre de todos nosotros. 
    Siendo la montaña mas alta puede ser vista a lo lejos desde Muchas Casas si subes por encima de  los arboles y colinas circundantes. El paisaje desde las tierras altas de muchas casas esta separado por una enorme llanura boscosa hasta la solitaria cima nevada.
    Alli viajo uno de los hermanos de Etägók y posiblemente vive en el pueblo vecino. 
    Como Lam-Tolis, es tambien una montaña sagrada y no es raro ver gente llendo a peregrinar alli para pedir por sanacion y muchos hijos. Sin embargo has oido muy pocas veces de algun visitante de esas tierras que haya pasado por Muchas Casas.
    `,
    `Una laguna escondida en un valle al que se llega a traves de un sendero entre las montañas, famosa por estar llena de deliciosas almejas y ser un excelente terreno de caza. Se dice que en el lago vive la misteriosa mujer-ciervo Kizbiz-Aral, pero muchos afirman que no existe o que se fue hace mucho tiempo.
    `,
    `Uno de los bosques tenebrosos donde recide Shàmman-Fotthor, alli desaparece el rio de Anrizudar donde la tierra se vuelve lodosa, oscura y llena de malditas moscas chupasangre. Se cree que mas alla de este bosque espantoso se acava el mundo, donde el agua se traga la tierra hasta que algun dia no quede nada.
    En tu mision encomendada por el viejo Erar Saram encontraste a la tribu exiliada del pantano y los convenciste de que te ayudaran a encontrar las flores brillantes.
    `,
  ];
  tituloMapa: string[] = [
    `Muchas Casas
    `,
    `Tierras del Queso
    `,
    `Volal Tolis
    `,
    `Laguna de las Almejas
    `,
    `El Pantano Boscoso
    `,
  ];
  subTituloMapa: string[] = [
    `[Shàmman-Zoden]
    `,
    `[8-10 dias de viaje siguiendo el rio en direccion a Anrizudar]
    `,
    `[4-5 dias de viaje en direccion a la cima blanca de Volal Tolis]
    `,
    `[5-7 dias de viaje a traves del pazo de las montañas en direccion a Uvel-Idar]
    `,
    `[2 dias de viaje en llendo al oscuro bosque de Shàmman-Fotthor]
    `,
  ];
 */
  get mapaPalacio(): boolean {
    return this.mapasActivosService.mapaPalacio;
  }
  get mapaPalacioCocina1(): boolean {
    return this.mapasActivosService.mapaPalacioCocina1;
  }
  get mapaPalacioCocina2(): boolean {
    return this.mapasActivosService.mapaPalacioCocina2;
  }
  get mapaPalacioDormitorio(): boolean {
    return this.mapasActivosService.mapaPalacioDormitorio;
  }
  get mapaEstrellas(): boolean {
    return this.mapasActivosService.mapaEstrellas;
  }

  
  goToPage(page: number): void {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
      console.log ("currentPage:_" + this.currentPage)
    }

    if (this.currentPage === 1) { 
      switch (true) {
        case this.mapaPalacio:
          this.rutaImgInteractuables = '/images/columna-izquierda/palacio/interactuables/tools.png';
          this.textoInteractivo = this.textosInteractivosPalacio[0]
          break;
        case this.mapaPalacioCocina1:
          this.rutaImgInteractuables = '/images/columna-izquierda/palacio/interactuables/smoked-meat.png';
          this.textoInteractivo = this.textosInteractivosCocina1[0]
          break;
        case this.mapaPalacioCocina2:
          this.rutaImgInteractuables = '/images/columna-izquierda/palacio/interactuables/frutos-secos.png';
          this.textoInteractivo = this.textosInteractivosCocina2[0]
          break;
        case this.mapaPalacioDormitorio:
          this.rutaImgInteractuables = '/images/columna-izquierda/palacio/interactuables/mug.png';
          this.textoInteractivo = this.textosInteractivosDormitorio[0]
          break;
      }
    }
    else if (this.currentPage === 2) {
      switch (true) {
        case this.mapaPalacio:
          this.rutaImgInteractuables = '/images/columna-izquierda/palacio/interactuables/hide.png';
          this.textoInteractivo = this.textosInteractivosPalacio[1]
          break;
        case this.mapaPalacioCocina1:
          this.rutaImgInteractuables = '/images/columna-izquierda/palacio/interactuables/stone-plate.png';
          this.textoInteractivo = this.textosInteractivosCocina1[1]
          break;
        case this.mapaPalacioCocina2:
          this.rutaImgInteractuables = '/images/columna-izquierda/palacio/interactuables/dry-mushrooms.png';
          this.textoInteractivo = this.textosInteractivosCocina2[1]
          break;
        case this.mapaPalacioDormitorio:
          this.rutaImgInteractuables = '';
          this.textoInteractivo = this.textosInteractivosPalacio[0]
          break;
      }
    }
    else if (this.currentPage === 3) {
      switch (true) {
        case this.mapaPalacio:
          this.rutaImgInteractuables = '';
          this.textoInteractivo = this.textosInteractivosPalacio[2]
          break;
        case this.mapaPalacioCocina1:
          this.rutaImgInteractuables = '';
          this.textoInteractivo = this.textosInteractivosCocina1[2]
          break;
        case this.mapaPalacioCocina2:
          this.rutaImgInteractuables = '/images/columna-izquierda/palacio/interactuables/squirrel.png';
          this.textoInteractivo = this.textosInteractivosCocina2[2]
          break;
        case this.mapaPalacioDormitorio:
          this.rutaImgInteractuables = '';
          this.textoInteractivo = this.textosInteractivosPalacio[0]
          break;
      }
    }
    console.log ('rutaImgInteractuables: ' + this.rutaImgInteractuables)
  }
  cerarDiv(){
    this.currentPage = 0
  }

 





}
