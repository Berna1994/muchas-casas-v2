import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-estrellas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './estrellas.component.html',
  styleUrls: ['./estrellas.component.css']
})
export class EstrellasComponent {
  currentPage: number = 0;
  totalPages: number = 6;
  rutaImgConstelaciones: string []= [
    `/images/columna-izquierda/estrellas/c-bosque.png`,
    `/images/columna-izquierda/estrellas/c-ciervo.png`,
    `/images/columna-izquierda/estrellas/c-luna.png`,
    `/images/columna-izquierda/estrellas/c-lluvia.png`,
    `/images/columna-izquierda/estrellas/c-madre.png`,
    `/images/columna-izquierda/estrellas/c-sol.png`,
  ]
  ArrayTextosConstelaciones = [ 
    {titulo: `Shàmman-Fotthor`, texto: `Espíritu de los bosques densos y oscuros, la noche, frío y maldiciones.` },
    {titulo: `Uvel-Idar`, texto: `Padre de las bestias peligrosas y espíritu de la caza y la fiereza.`},
    {titulo: `Riras-Ïlon, la luna mayor`, texto: `Espíritu de la protección, el amor y la belleza`},
    {titulo: `Anrrizudar`, texto: `Su nombre significa cielo lluvioso, es el espíritu de los rios, el viento y tormentas.`},
    {titulo: `Volal-Tolis`, texto: ` La montaña nevada, madre de los hombres (enanos) y diosa de la fertilidad, la vida, y la curación.`},
    {titulo: `Ziril-Nòm`, texto: `El canario solar, criatura espiritual que da la luz, el calor y el fuego.`},
  ]

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
    `Uno de los bosques tenebrosos donde recide Shàmman-Fotthor, alli desaparece el rio de Anrizudar donde la tierra se vuelve lodosa, oscura y llena de malditas moscas chupasangre. Se cree que mas alla de este bosque espantoso se acava el mundo, donde el agua se traga la tierra hasta que algun día no quede nada.
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
  
  goToPage(page: number): void {
    if (page >= 0 && page <= this.totalPages) {
      this.currentPage = page;
      console.log ("currentPage:_" + this.currentPage)
    }
  }

  cerarDiv(){
    this.currentPage = 0
  }

  
}
