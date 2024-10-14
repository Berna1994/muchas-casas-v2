import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MapasActivosService {

  _mapaPalacio = false
  _mapaPalacioCocina1 = false
  _mapaPalacioCocina2 = false
  _mapaPalacioDormitorio = false

  _mapaEstrellas = false

  get mapaPalacio(): boolean {
    return this._mapaPalacio;
  }
  set mapaPalacio(value: boolean) {
    this._mapaPalacio = value;
  }

  get mapaPalacioCocina1(): boolean {
    return this._mapaPalacioCocina1;
  }
  set mapaPalacioCocina1(value: boolean) {
    this._mapaPalacioCocina1 = value;
  }

  get mapaPalacioCocina2(): boolean {
    return this._mapaPalacioCocina2;
  }
  set mapaPalacioCocina2(value: boolean) {
    this._mapaPalacioCocina2 = value;
  }

  get mapaPalacioDormitorio(): boolean {
    return this._mapaPalacioDormitorio;
  }
  set mapaPalacioDormitorio(value: boolean) {
    this._mapaPalacioDormitorio = value;
  }

  get mapaEstrellas(): boolean {
    return this._mapaEstrellas;
  }
  set mapaEstrellas(value: boolean) {
    this._mapaEstrellas = value;
  }












}
