import { Component, inject } from "@angular/core";
import { Firestore } from "@angular/fire/firestore";
import {
  Auth,
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "@angular/fire/auth";
import { ConfiguracionDatos } from "./carga-de-datos";
import { ContadorService } from "../../../public/services/contador-dias.service";
import { AuthService } from "../../../public/services/auth.service";
import { NotificacionesService } from "../../../public/services/notificaciones.service";

@Component({
  selector: "app-componente-firebase",
  standalone: true,
  template: `
    <button (click)="guardarTodo()">Salvar partida</button>
    <button (click)="recuperarTodo()" style="display: none;">Cargar partida</button> <!-- este boton pemanece oculto solo lo necesito para testeos -->
    <button (click)="login()">Iniciar sesion</button>
    <button (click)="logout()">cerrar sesion</button>
  `,
  styleUrls: ['./css-firebase.component.css'], // Asociar el archivo CSS
})

export class Componentefirebase {
  private firestore = inject(Firestore);
  private auth = inject(Auth);
  private contadorService = inject(ContadorService);
  private configuracion = inject(ConfiguracionDatos);
  private authService = inject(AuthService);
  private notificacionesService = inject(NotificacionesService);

  guardarTodo() {
    this.contadorService.guardarContador();
    this.notificacionesService.guardarTodasNoticiasVistas();
    this.notificacionesService.guardarNotificacionesVisibles(); // Nuevo
  }
  
  recuperarTodo() {
    this.contadorService.recuperarContador();
    this.notificacionesService.recuperarTodasNoticiasVistas();
    this.notificacionesService.recuperarNotificacionesVisibles(); // Nuevo
  }

  login() {
    const provider = new GoogleAuthProvider();
    const authInstance = getAuth();
    this.notificacionesService.variableActualizarDialogosSiONo = true
  
    signInWithPopup(authInstance, provider)
      .then((result) => {
        const userId = result.user?.uid || null;
  
        if (userId) {
          console.log("Usuario autenticado:", userId);
          this.authService.setUserId(userId);
  
          // Recuperar datos de Firebase automáticamente
          this.contadorService.recuperarContador();
          this.notificacionesService.recuperarTodasNoticiasVistas();
          this.notificacionesService.recuperarNotificacionesVisibles(); // Nuevo
        }
      })
      .catch((error) => console.error("Error en el inicio de sesión:", error));
  }
  logout() {
    const authInstance = getAuth();

    signOut(authInstance)
      .then(() => {
        this.authService.setUserId(null);
        console.log("Sesión cerrada.");
      })
      .catch((error) => console.error("Error al cerrar sesión:", error));
  }
}
