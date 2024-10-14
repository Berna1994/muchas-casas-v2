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
  totalPages: number = 3;
  

  ancestros = [ 
    {titulo: `Volal-Tolis:`, texto: ` La montaña nevada, madre de los hombres (enanos) y diosa de la fertilidad, la vida, y la curación.`},
    {titulo: `Lam-Tolis:`, texto: `La montaña rocosa, padre de los hombres (enanos) y dios de los trabajos en piedra, las armas y el hogar.`},
    {titulo: `Anriz Udar o Anrrizudar:`, texto: `Su nombre significa cielo lluvioso, es el espíritu de los rios, el viento y tormentas.`},
    {titulo: `Shàmman-Fotthor:`, texto: `Espíritu de los bosques densos y oscuros, la noche, frío y maldiciones.` },
    {titulo: `Uvel-Idar:`, texto: `Padre de las bestias peligrosas y espíritu de la caza y la fiereza.`},
    {titulo: `Ziril-Nòm:`, texto: `El canario solar, criatura espiritual que da la luz, el calor y el fuego.`},
    {titulo: `Riras-Ïlon: La luna mayor`, texto: `Espíritu de la protección, el amor y la belleza`},
  ]

  historias = [
    { titulo: "El origen del mundo:", texto: `Las montañas Volal-Tolis (cima blanca) y Lam-Tolis (cima pedregosa) se creen que eran dos dioses hermanos. 
      
      Mucho tiempo antes de que existieran las montañas o los enanos, la tierra estaba vacía y un gigantesco jabalí monstruoso, llamado Saràmgåkïz, devoraba bosques como si fueran pasto y destruía la tierra con su hocico y pezuñas. Hasta que un día Anrizudar, el dios de la lluvia, envió un diluvio para ahogar a la bestia. Cuando esta murió, de sus colmillos nacieron dos peronas, Volal-Tolis o “Votlis”, que era mujer y tenia cabello blanco y luego Lam-Tolis o “Lalis”, que era hombre y tenía la cabeza pelada. 

      Estos hermanos se dedicaron a reparar el mundo de los estragos del diluvio y el jabalí. Lalis levanto la tierra para que saliera del agua y Votlis soplo su aliento sobre las montañas para que crecieran los bosques. Luego de restaurar el mundo, hicieron el amor durante 10 días y 10 noches, tras lo cual Votlis dio a luz a 100 hijos, 10 por cada noche, y los esparció por el mundo para que lo poblaran. 
      Pero pronto sus hijos se aburrieron del mundo pues estaba vacio y comenzaron a golpearse y matarse entre ellos; al ver esto sus padres esculpieron rocas con formas de animales y les dieron vida, así sus hijos podrían cazar y comer para así dejar de luchar entre ellos. 

      Pero cuando Votlis le dio vida a una serpiente de piedra, esta le pico y cayó enferma. Lalis mato a la criatura cortándola con un hacha de sílex, pero la serpiente se dividió en 2 y escapó por un agujero. Lalis no soporto ver morir a su hermana en sus brazos y se suicido bebiendo el veneno de la herida; con el tiempo sus cuerpos se volvieron roca y hoy son las montañas hermanas: Volal-Tolis, la mas alta y con cima nevada y Lam-Tolis, mas baja y sin nieve.
      `},
    { titulo: "El descubrimiento del cobre:", texto: `Se dice que Kuthdêng Odroz (accidente fatal), el padre de Tilat Odroz (hijo fatal), fue quien descubrió el cobre. Según Tilat, su padre siempre le hacia ofrendas a Lam-Tolis, internándose en una cueva que solo aparece si dices una frase secreta que solo él conoce y que se niega a revelar, ya que Lalis se la conto solo a su padre, y su padre a él.

      Dentro de esa cueva, Lalis le mostro a su padre como hacer sangrar las rocas y usar su sangre para crear armas y defenderse de los Nekol-Okab(rompe cráneos), con quienes estában en guerra en aquel momento. Gracias a su padre se salvaron “muchas casas” y expulsamos al clan Nekol hacia el fin del mundo, donde el agua se traga la tierra.

      *Kuthdêng Odroz se llama así debido a que sobrevivió a un terrible accidente de joven cuando cazaba un venado blanco. Irónicamente murió en otro accidente muy similar tratando de cazar a la misma criatura. Su hijo lo vengo y guarda la piel del venado albino como reliquia familiar.* `},
    { titulo: "Título 3", texto: "Este es el texto asociado al Título 3." }
  ];

  criaturas = [
    {titulo: `Litez, el brujo de la cima de la montaña:`, texto: `Vive en una cueva, es inmortal y tiene enorme sabiduría. Es terrible con quienes lo hacen enojar, maldiciéndolos (es muy testarudo). Dicen que la única forma de pedirle algo es llevándole una corona de flores azules del pantano y una canasta con castañas.`},
    {titulo: `Kizbiz-Aral:`, texto: `Es una criatura mitad ciervo-mitad persona que vive en el valle donde está la laguna de las almejas. Habla con los animales y ayuda a los cazadores perdidos o heridos, solo algunas personas afirman haberla visto alguna vez, por lo que muchos piensan que no existe.`},
    {titulo: `Est-Gakit:`, texto: `Es un enano lampiño (enano para un enano), se oculta en cuevas o en lugares oscuros en las casas. Es travieso y suele robar cosas, haciendo que la gente se pelee, asustando a las presas de los cazadores y tirando la comida al fuego. Solo se deja ver por los niños a quienes incita a hacer travesuras y meterlos en problemas. Se cree que el olor de la resina de pino ardiendo y las orejas de conejo lo espantan.`},
  ]

  goToPage(page: number): void {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }
}