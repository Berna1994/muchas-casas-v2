import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';  // Import CommonModule
import { RelojPajaritoService } from '../../../../public/services/reloj-pajarito.service';

@Component({
  selector: 'app-pajarito',
  standalone: true,
  templateUrl: './pajarito.component.html',
  styleUrls: ['./pajarito.component.css'],
  imports: [CommonModule]
})
export class PajaritoComponent implements OnInit, OnDestroy {
  currentIndex: number = 0;
  intervalId: any;
  intervalTime: number = 300; // Tiempo en milisegundos
  @Input() isDivVisible: boolean = false;
  private images!: NodeListOf<HTMLImageElement>;      // images y total images tengo q declararlas aca para poder 
  private totalImages: number = 1;                    //usarlas en 2 funciones, es un quilombo
                                                      

  constructor(private RelojPajaritoService: RelojPajaritoService) { }
  


  ngOnInit(): void {
    this.RelojPajaritoService.startReloj();     // llama a la función del reloj aleatorio del servicio
    // Suscribirse al observable del servicio
    this.RelojPajaritoService.Reloj$.subscribe(() => {
      this.images = document.querySelectorAll('.pajaro') as NodeListOf<HTMLImageElement>;
      this.totalImages = this.images.length + 1;
      this.startImageRotation();
    });
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  startImageRotation() {
    console.log ('se llamo a rotacion de imagenes')
    this.RelojPajaritoService.startReloj();     // llama a la función del reloj aleatorio del servicio
    if (this.totalImages === 0) return;
  
    const updateInterval = () => {
      this.images.forEach((div, index) => {
        div.style.visibility = (index === this.currentIndex) ? 'visible' : 'hidden';
      });
  
      this.currentIndex = (this.currentIndex + 1) % this.totalImages;
    };
  
    // Limpiar el intervalo anterior si existe
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  
    // Iniciar un nuevo intervalo
    this.intervalId = setInterval(() => {
      updateInterval();
      
      // Se detiene solo si se ha completado una rotación completa
      if (this.currentIndex === 0) {
        clearInterval(this.intervalId);
      }
    }, this.intervalTime);
  }
  

  golpearPajarito(event: MouseEvent): void {
    const img = event.target as HTMLImageElement; // Obtiene el elemento imagen clickeado
    const piedra = document.getElementById('piedra') as HTMLDivElement;
    const rect = img.getBoundingClientRect();
    img.style.visibility = 'hidden';
    
    this.currentIndex = this.totalImages; //esto es para q se resetee la iteracion de imagenes al inicio
    clearInterval(this.intervalId) // esto es para q se termine la funcion hasta q el reloj la llame devuelta
    piedra.style.top = `${rect.top}px`;
    piedra.style.left = `${rect.left}px`;
    piedra.style.display = 'block';

    setTimeout(() => {
      piedra.style.display = 'none'; // Oculta la piedra después del tiempo especificado
  }, this.intervalTime*4); 

    console.log ('pajaro golpeado')
    
}



} // FIN DE LA CLASE
