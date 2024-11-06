import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MisionesService {
  private _totalPages: number = 1;
  public _contadorMisiones: number[] = [0];
  private _tituloMision: string[] = [`Expedición a las tierras del queso:`,];
  private _diasDeViaje: string[] = ['8-10',];
  private _mision: string[] = [       /*  array misiones */
   
    `  
    Ërtong Alaklamcubor fue enviada junto a los mercaderes que traen bisin para llegar a las tierras de la gente que produce queso y comerciar unos objetos de valor a cambio de productos exóticos e información. Además de los mercaderes, viaja con una escolta escoltada por algunos enanos asignados por Etägók.
    Objetos de valor: 
    
    - 1 riñón de licor extranjero muy grande.
    - 1 Bisin-Egen (regalo de la vaca): es una estatuilla de cuarzo de la mejor calidad, tiene forma de bisin, este parece estar transportando en su boca un ramo de flores.
    - 3 herramientas de cobre.
    - 3 estatuillas sencillas de granito.
    - varias cosas genéricas más.`,
  ];

//--------------------------------------------
  
  agregarTitulo(titulo: string) {
    this._tituloMision.push(titulo);
  }

  agregarDescripcion(descripcion: string) {
    this._mision.push(descripcion);
  }

  agregarTiempo(tiempo: string) {
    this._diasDeViaje.push(tiempo);
  }

  agregarContador(conteo: number) {   //contador de dias pasados en cada mision
    this._contadorMisiones.push(conteo);
  }

  incrementarContadores(): void {   // Función para incrementar +1 a cada elemento del array contadores
    this._contadorMisiones = this._contadorMisiones.map(contador => contador + 1);
  }



//------------------------------------------------------

  
  get totalPages(): number {
    return this._totalPages;
  }

  set totalPages(value: number) {
    this._totalPages = value;
  }
//********
  get tituloMision(): string[] {
    return this._tituloMision;
  }

  set tituloMision(value: string[]) {
    this._tituloMision = value;
  }
//********
  get mision(): string[] {
    return this._mision;
  }

  set mision(value: string[]) {
    this._mision = value;
  }
//********
  get tiempo(): string[] {
    return this._diasDeViaje;
  }

  set tiempo(value: string[]) {
    this._diasDeViaje = value;
  }
//*********

  get conteo(): number[] {
    return this._contadorMisiones;
  }

  set conteo(value: number[]) {
    this._contadorMisiones = value;
  }
//**************

  get contadorMisiones(): number[] {
    return this._contadorMisiones;
  }

  set contadorMisiones(value: number[]) {
    this._contadorMisiones = value;
  }
  



  addMission(): void {
    // Usa la longitud actual para acceder a los elementos correctos
    const newMissionTitle = this._tituloMision[this._tituloMision.length - 1] || ''; 
    const newMissionDescription = this._mision[this._mision.length - 1] || '';
    const newMissionTime = this._diasDeViaje[this._diasDeViaje.length - 1] || '';
    
    // Solo agrega elementos si están definidos y no vacíos
    if (newMissionTitle && newMissionDescription && newMissionTime) {
      this._totalPages++;
    }
    else (console.log ("faltan definir parametros de la mision"))
  }
}
