import { Injectable } from '@angular/core';
import { MisionesService } from './misiones.service';
@Injectable({
  providedIn: 'root',
})
export class ContadorService {
  private contador = 0;


  constructor(private misionesService: MisionesService) {}

  getValor(): number {
    return this.contador;     //contador de turnos global
  }

  incrementar(): void {
    this.contador++;

    this.misionesService.incrementarContadores();
  }



}