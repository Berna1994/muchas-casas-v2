import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RelojPajaritoService {
  private RelojId: any;
  private RelojSubject = new Subject<void>();

  // Observable para emitir eventos de Relojo
  Reloj$ = this.RelojSubject.asObservable();

  private getRandomTime(): number {
    const times = [60000, 300000, 600000]; // Tiempos en milisegundos 60000, 300000, 600000
    const randomIndex = Math.floor(Math.random() * times.length);
    return times[randomIndex];
  }

  // Inicia el Reloj y emite eventos cada X segundos (aleatorio)
  startReloj(): void {
    const RelojTime = this.getRandomTime(); // Seleccionar un tiempo aleatorio

    // Detener cualquier Reloj previo
    if (this.RelojId) {
      this.stopReloj();
    }

    this.RelojId = setInterval(() => {
      this.RelojSubject.next();
    }, RelojTime);
  }

  // Detiene el Reloj
  stopReloj(): void {
    if (this.RelojId) {
      clearInterval(this.RelojId);
      this.RelojId = null;
    }
  }
}
