import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformesComponent } from './informes.component';

describe('InformesComponent', () => {
  let component: InformesComponent;
  let fixture: ComponentFixture<InformesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InformesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});




/* <div  *ngIf="noticiasDisponibles[currentPageNoticia].interactuable === true"> <!--  bloques guardados -->
<div *ngFor="let bloque of notificacionesService.respuestasCortasGuardadas">  <!-- aca tengo que poner una condicion de que se refiera solo al array del boton noticia seleccionado -->
  <select 
    [ngModel]="bloque.respuestaSeleccionada || ''" 
    (change)="onSelectChange($event, bloque)"
    [disabled]= "true">  

    <ng-container *ngFor="let item of bloque.respuestaSeleccionada; let i = index">
      <ng-container *ngIf="item.colorPrimario === 'd1-s1-ucvav'">
        <ng-container *ngFor="let respuesta of item.arrayRespuestas">
          <option [value]="respuesta.textoCorto">{{ respuesta.textoCorto }}</option>
        </ng-container>
      </ng-container>
    </ng-container>
  </select>

  <hr />
</div>
</div>


<div *ngIf="noticiasDisponibles[currentPageNoticia].interactuable === true">  <!-- Bloque actual que sigue siendo interactivo -->
<select id="opciones-respuestas" 
[(ngModel)]="respuestaSeleccionada" 
(change)="onSelectChange($event, null )"  
[disabled]="selectorDeshabilitado">     <!-- aca uso null solamente para que tenga dos argumentos como en el otro bloque porque      sino angular le da amciedad, no hace absolutamente nada -->

<option value="" disabled selected [hidden]="true">Selecciona una respuesta</option> 

<ng-container *ngFor="let item of respuestasElegibles">
  <ng-container *ngIf="item.colorPrimario === 'd1-s1-ucvav'">
    <ng-container *ngFor="let respuesta of item.arrayRespuestas">
      <option [value]="respuesta.textoCorto">{{ respuesta.textoCorto }}</option>
    </ng-container>
  </ng-container>
</ng-container>
</select>

<button [disabled]="!respuestaSeleccionada" (click)="onContinuar()">Continuar >></button> 
<hr />
</div>
 */