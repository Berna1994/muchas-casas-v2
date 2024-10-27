import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-personajes',
  templateUrl: './personajes.component.html',
  styleUrls: ['./personajes.component.css'],
  imports: [CommonModule],
  standalone: true,
})
export class PersonajesComponent {
  currentPage: number = 0;

  tokens: string[] = [
    'images/t1.png', // hombre
    'images/t2.png', // mujer
    'images/t3.png', // animal
  ];
  personajes = [
    { nombre: 'Etägók Erar Saràm', genero: 'hombre', oficio: 'Gran sabio de la tribu y artesano de piedra' },
    { nombre: 'Ërtong Alaklamcubor', genero: 'mujer', oficio: 'Cazadora' },
    { nombre: 'Namàsh Inrus', genero: 'hombre', oficio: 'Chaman' },
    { nombre: 'Asdos Merseth', genero: 'hombre', oficio: 'Cazador' },
    { nombre: 'Tilat Odroz', genero: 'hombre', oficio: 'Herrero' },
    { nombre: 'Astesh', genero: 'mujer', oficio: 'Leñadora' },
    { nombre: 'Er Lokum', genero: 'hombre', oficio: 'Cazador' },
    { nombre: 'Bisin', genero: 'animal', oficio: 'Mascota' }
  ];

  private descripciones: string[] = [
    `Nombrado Gran Sabio por su antecesor luego de superar numerosos retos.
    Sus padres estan vivos, y son 4 hermanos:
    El mismo, su hermana Ërtong, un hermano muerto y otro que viajo en direcciona  Lam Tolis y no regreso, probablemente vive alli.`,
    `Hermana de Etägók.
    
    Es una mujer joven, de cabello trenzado y oscuro, con los incisivos muy pronunciados y un tatuaje de jabalí en el rostro. Aún no está casada y varios enanos del vecindario compiten por ella. 
    Caza animales grandes para trabajar el cuero y últimamente con la llegada de los erdebisin tiene mucho trabajo y sale poco al bosque. Su nombre significa jerbo (un roedor), por como sobresalen sus 2 dientes frontales.`,
    `Personaje de satu`,
    `Es un hombre joven y vigoroso que quedó huérfano, y fue cuidado por la tía de Etägók, por lo que son como primos. Usa una capa de hiena, una honda y lanza para cazar. Su nombre significa mala suerte.`,
    `Tiene los incisivos separados, el brazo derecho más robusto y una larga barba castaña trenzada. 
    Según él, su padre descubrió el cobre, tiene una piel de ciervo albino en su casa como reliquia familiar. 
    
    Su nombre significa "hijo fatal".`,
    `Es una mujer alta y adulta, con el cabello negro canoso, tanto en la cabeza como las patillas. 
    Viste con pieles de zorro rojo y se pinta la cara del mismo color porque dice que la vuelve más fuerte. 
    Cuando eran jóvenes gustaba de Etägók y le dio un beso, siguen siendo amigos. 
    
    Su nombre significa garrote.`,
    `Es un cazador retirado, está obeso y lleva muchos tatuajes con temas de caza, se viste con pieles de hiena y lleva el cráneo de una enorme en el hombro. 
    Suele visitar a sus vecinos, incluidos Etägók, para contarles historias de cazas y comer todo lo que le “ofrezcan". 
    
    Su nombre significa lanza gorda.`,
    `Animal doméstico semejante a un bisonte, pero de menor peso y mucho menos peligroso. Fue adquirido por Etägók a traves de uno de los mercaderes que viajan a las Tierras del Queso.
    Se deja ordeñar por las personas y prefiere su compañía.

    Goza de buena salud.`,
  ];

  // Obtener el nombre del personaje por índice
  getNombrePersonaje(index: number): string {
    return this.personajes[index]?.nombre || '';
  }

  // Obtener el género del personaje por índice
  getGeneroPersonaje(index: number): string {
    return this.personajes[index]?.genero || '';
  }

  // Obtener el oficio del personaje por índice
  getOficioPersonaje(index: number): string {
    return this.personajes[index]?.oficio || '';
  }

  // Obtener la descripción del personaje por índice
  getDescripcionPersonaje(index: number): string {
    return this.descripciones[index] || '';
  }

  // Obtener el token basado en el género del personaje
  getToken(genero: string): string {
    if (genero === 'hombre') {
      return this.tokens[0];
    } else if (genero === 'mujer') {
      return this.tokens[1];
    } else if (genero === 'animal') {
      return this.tokens[2];
    } else {
      console.log("Error con el nombre del token");
      return '';
    }
  }
}
