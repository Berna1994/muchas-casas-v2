import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-informes',
  templateUrl: './informes.component.html',
  styleUrls: ['./informes.component.css'],
  imports: [CommonModule],
  standalone: true
})
export class InformesComponent {
  currentPage: number = 1;
  totalPages: number = 3;

  goToPage(page: number): void {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  noticias = [
    
     `Un amigo viene a saludarte!`,
     `Öntak Luror (brazo cruel), el nuevo líder de la tribu del pantano con quien luchaste un duelo justo, ha venido a verte.
     Él se presenta con 3 hombres que lo acompañan y te saludan cordialmente.
      `,
  ]
  proyectos = [
    
    `"El Oso de Cobre"`,
    `-Escuela de metalurgia-`,
    `Maestros: 3
 Aprendices: 3`, //no correr esta parte porque sino se hace un margen por el salto de linea
    `Mausoleo del antiguo Erar Saram`,
    `-Monumento-`,
    `Una estatua grande (2 enanos de alto), de una enana con la mitad del cuerpo de ciervo, y la otra mitad con cuerpo de enana. La estatua esta mirando hacia donde sale el sol (la entrada de la cueva). La estatua esta sobre la entrada al mausoleo.

A los lados de la puerta hay engravados de que relatan las pruebas que supero el Nuevo Erar Saràm para recibir el titulo. 
Dentro del pasillo están esculpidas en la pared las historias cotidianas sobre la vida del viejo Erar Saràm.

Al final se encuentra el sarcófago hecho en piedra con el nombre grabado "Erar Saràm". La habitación es cuadrada con las paredes pulidas.`,

  ]
  recursos = [
    `
    Alimentos: ?

    Madera: De sobra

    Pedernal: Abundante

    Cobre: Escaso`
  ]





}