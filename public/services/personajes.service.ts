import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PersonajesService {
  private tokens: string[] = [
    'images/t1.png', // hombre
    'images/t2.png', // mujer
    'images/t3.png', // animal
  ];

private personajes = [
  { nombre: 'Etägók Erar Saràm', genero: 'hombre' },
  { nombre: 'Ërtong Alaklamcubor', genero: 'mujer' },
  { nombre: 'Namàsh Inrus', genero: 'hombre' },
  { nombre: 'Asdos Merseth', genero: 'hombre' },
  { nombre: 'Tilat Odroz', genero: 'hombre' },
  { nombre: 'Astesh', genero: 'mujer' },
  { nombre: 'Er Lokum', genero: 'hombre' },
  { nombre: 'Bisin', genero: 'hombre' },
];

private _oficioPersonaje: string[] = [
  `Gran sabio de la tribu y artesano de piedra`,
  `Cazadora`,
  `Chaman`,
  `Cazador`,
  `Herrero`,
  `Leñadora`,
  `Cazador`,
  `Mascota`,
];

private _descripcionPersonaje: string[] = [
    `(Etägók Alaklamcubor)
    
    Nombrado Gran Sabio por su antecesor luego de superar numerosos retos.`,
    `(Hermana de Etägók)

   Es una mujer joven, de cabello trenzado y oscuro, con los incisivos muy pronunciadas y un tatuaje de jabalí en el rostro. Aun no esta casada y varios enanos del vecindario compiten por ella. Caza animales grandes para trabajar el cuero y últimamente con la llegada de los erdebisin tiene mucho trabajo y sale poco al bosque.
   AL igual que a sus hermanos, su padre les enseño a defenderse y usar armas por si otro clan los atacaba en el futuro.
   
    (su nombre significa jerbo (un roedor), por como sobresalen sus 2 dientes frontales)`,
  `Personaje de satu`,
  `Es un hombre joven y vigoroso que quedo huérfano, y fue cuidado por la tía de Etägók, por lo que son como primos. Usa una capa de hiena, una honda y lanza para cazar.
  
  Su nombre significa mala suerte`,
  `Tiene los incisivos separados, el brazo derecho mas robusto y una larga barba castaña trenzada. Según el su padre descubrió el cobre, tiene una piel de ciervo albino en su casa como reliquia familiar.

  Su nombre significa "hijo fatal".`,
  `Es una mujer alta y adulta, con el cabello negro canoso, tanto en la cabeza como las patillas. Viste pieles de zorro rojo y se pinta la cara del mismo color porque dice que la vuelve mas fuerte.
  Cuando eran jóvenes gustaba de Etägók y le dio un beso, siguen siendo amigos.

  Su nombre significa garrote`,
  `Es un cazador retirado, esta obeso y lleva muchos tatuajes con temas de caza, se viste con pieles de hiena y lleva el cráneo de una enorme en el hombro. Suele visitar a sus vecinos, incluidos Etägók, para contarles historias de cazas y comer todo lo que le “ofrezcan".

  Su nombre significa lanza gorda`,
  `Animal domestico semejante a un bisonte, pero menos peligroso. Se deja ordeñar por las personas y prefiere su compania.
  
  Goza de buena salud.`,
];

getToken(index: number): string {
  const genero = this.getGeneroPersonaje(index);
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
//********

  // Obtener el nombre del personaje por índice
  getNombrePersonaje(index: number): string {
    return this.personajes[index]?.nombre || '';
  }

  // Obtener el género del personaje por índice
  getGeneroPersonaje(index: number): string {
    return this.personajes[index]?.genero || '';
  }

//********

get descripcionPersonaje(): string[] {
  return this._descripcionPersonaje;
}

set descripcionPersonaje(value: string[]) {
  this._descripcionPersonaje = value;
}
//********

get oficioPersonaje(): string[] {
  return this._oficioPersonaje;
}

set oficioPersonaje(value: string[]) {
  this._oficioPersonaje = value;
}
//********

}
