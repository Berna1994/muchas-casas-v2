import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-gift-antorchas',
  standalone: true,
  templateUrl: './gift-antorchas.component.html',
  styleUrls: ['./gift-antorchas.component.css']
  
})
export class ImagenGiftAntorchasComponent implements OnInit, OnDestroy {
  images: string[] = [
    '/images/columna-izquierda/antorcha-izq1.png',
    '/images/columna-izquierda/antorcha-izq2.png',
    '/images/columna-izquierda/antorcha-izq3.png'
  ];
  currentIndex: number = 0;
  intervalId: any;
  intervalTime: number = 500; // Tiempo en milisegundos 

  ngOnInit() {
    this.startImageRotation();
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  startImageRotation() {
    this.intervalId = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    }, this.intervalTime);
  }
}
