import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-historia',
  templateUrl: './historia.component.html',
  styleUrls: ['./historia.component.css'],
  imports: [CommonModule],
  standalone: true
  
})
export class HistoriaComponent {
  currentPage: number = 1;
  totalPages: number = 2;
  indiceHistoria: number = 0
  indiceCriaturas: number = 0

  historias = [
    { titulo: "El origen del mundo", 
      texto: `Se cree que las montañas Volal-Tolis (cima blanca) y Lam-Tolis (cima pedregosa) que eran dos dioses hermanos. 
      
      Mucho tiempo antes de que existieran las montañas o los enanos, la tierra estaba vacía y un gigantesco jabalí monstruoso llamado Saràmgåkïz devoraba bosques como si fueran pasto y destruía la tierra con su hocico y sus pezuñas. Hasta que un día Anrizudar, el dios de la tormenta, envió un diluvio para ahogar a la bestia. 
      Cuando la colosal criatura murió, sus colmillos flotaron en el agua y de ellos nacieron dos peronas, Volal-Tolis o “Volis”, que era mujer y tenia cabello blanco, y del otro nacio Lam-Tolis o “Lalis”, que era hombre y tenía la cabeza calva. 

      Estos hermanos se dedicaron a reparar el mundo de los estragos del diluvio y el jabalí. Lalis levanto la tierra para que saliera del agua y Votlis soplo su aliento sobre las montañas para que crecieran los bosques. 
      Luego de restaurar el mundo, hicieron el amor durante 10 días y 10 noches, tras lo cual Votlis dio a luz a 100 hijos, 10 por cada noche y los llamo sus "enanos" porque eran diminutos al lado de sus padres. Luego al crecer esparcieron a sus pequeños hijos por el mundo para que lo poblaran. 

      Pero pronto los enanos se aburrieron del mundo pues éste estaba vacio y comenzaron a golpearse y matarse entre ellos. Al ver esto, sus padres esculpieron rocas con formas de animales y les dieron vida, así sus hijos podrían cazar y comer para así dejar de luchar entre ellos. 

      Pero cuando Volis le dio vida a una serpiente de piedra, la criatura le mordió y cayó enferma. Lalis mato a la serpiente cortándola con un hacha de sílex, pero la serpiente se dividió en 2 y escapó por un agujero. 
      
      Lalis no soporto ver morir a su hermana en sus brazos y se quito la vida bebiendo el veneno de su herida. Con el tiempo sus cuerpos se volvieron roca y hoy son las montañas hermanas: Volal-Tolis, la mas alta y con cima nevada, y Lam-Tolis, la mas robusta y sin nieve.
      `},
    { titulo: "El descubrimiento del cobre", 
      texto: `Se dice que Kuthdêng Odroz (accidente fatal), quien era el padre de tu amigo Tilat Odroz (hijo fatal), fue quien descubrió el cobre. 
      Según Tilat, su padre siempre le hacia ofrendas a Lam-Tolis, internándose en una cueva que solo aparece al decir una frase secreta que solo él conoce y que se niega a revelar, ya que Lalis se la conto solo a su padre, y su padre a él.

      Dentro de esa cueva, El dios de la montaña le mostro a Kuthdêng como hacer sangrar las rocas y usar su sangre para crear armas y defenderse de los Nekol-Okab (rompe cráneos), con quienes estábamos en guerra en aquel momento. Gracias a este hombre se salvaron “muchas casas” y expulsamos al clan Nekol hacia el fin del mundo, donde el agua se traga la tierra.

      *Kuthdêng Odroz se llama así debido a que sobrevivió a un terrible accidente de joven cuando cazaba un venado blanco. Irónicamente murió en otro accidente muy similar tratando de cazar a la misma criatura. Su hijo lo vengó dando caza al mítico venado y guarda la piel de la criatura albina como reliquia familiar.*
      `},
  ];

  criaturas = [
    {titulo: `Litez, el brujo de la cima de la montaña`, 
      texto: `Vive en una cueva, es inmortal y tiene enorme sabiduría. Es terrible con quienes lo hacen enojar, maldiciéndolos (es muy testarudo). Dicen que la única forma de pedirle algo es llevándole una corona de flores azules del pantano y una canasta con castañas.`},
    {titulo: `Kizbiz-Aral`, 
      texto: `Es una criatura mitad ciervo-mitad persona que vive en el valle donde está la laguna de las almejas. Habla con los animales y ayuda a los cazadores perdidos o heridos, solo algunas personas afirman haberla visto alguna vez, por lo que muchos piensan que no existe.`},
    {titulo: `Est-Gakit`, 
      texto: `Es un enano lampiño (enano para lo que es un enano), se oculta en lugares oscuros en los hogares o en cuevas. Es travieso y suele robar cosas, haciendo que la gente se pelee, asustando a las presas de los cazadores o tirando tu comida al fuego. Solo se deja ver por los niños a quienes incita a hacer travesuras y meterlos en problemas. 

      Se cree que el olor de la resina de pino ardiendo y las orejas de conejo lo mantienen alejado.`},
  ]

  goToPage(page: number): void {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  actualizarindiceHistoria(i: number){
    this.indiceHistoria = i
  }

  actualizarindiceCriaturas(i: number){
    this.indiceCriaturas = i
  }

}