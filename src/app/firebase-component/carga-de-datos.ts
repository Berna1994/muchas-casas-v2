import { Injectable, Injector } from "@angular/core";
import { Firestore, doc, getDoc } from "@angular/fire/firestore";
import { NotificacionesService } from "../../../public/services/notificaciones.service";

@Injectable({
  providedIn: "root",
})
export class ConfiguracionDatos {
/*   variables de firebase */  
  contador = 0;
  todasNoticiasVistas = false;
  notificacionesVisibles = []

/* otras variables */
  databaseContadorExiste = false;
  databaseNoticiasVistasExiste = false;
  public baseDatosConsultada = false // su valor se actualiza desde la funcion login de component-firebase

  constructor(
    private injector: Injector, // Usamos el injector para resolver dependencias
    private firestore: Firestore
  ) {}

  private obtenerNotificacionesService(): NotificacionesService {
    return this.injector.get(NotificacionesService);
  }

  inicializarAplicacion(): void {
    console.log("Reinicializando la aplicación con los nuevos valores.");
    console.log("Contador:", this.contador);
    console.log("Todas las noticias vistas:", this.todasNoticiasVistas);
    console.log("Notificaciones visibles:", this.notificacionesVisibles);
  
    const notificacionesService = this.obtenerNotificacionesService();
    notificacionesService.actualizarNoticiasVistas(this.todasNoticiasVistas);
  }
  

  async verificarDatosEnFirebase(userId: string): Promise<void> {
    if (!userId) {
      console.error("El usuario no está autenticado.");
      return;
    }

    const userDoc = doc(this.firestore, "usuarios", userId);

    try {
      const docSnap = await getDoc(userDoc);

      if (docSnap.exists()) {
        const data = docSnap.data();
        console.log("Datos recuperados del documento:", data);

        if ("contador" in data) {
          this.databaseContadorExiste = true;
          this.contador = data["contador"];
          console.log("Se encontró la variable 'contador' en la base de datos:", this.contador);
        } else {
          this.databaseContadorExiste = false;
        }

        if ("todasNoticiasVistas" in data) {
          this.databaseNoticiasVistasExiste = true;
          this.todasNoticiasVistas = data["todasNoticiasVistas"];
          console.log("Se encontró la variable 'todasNoticiasVistas' en la base de datos:", this.todasNoticiasVistas);
        } else {
          this.databaseNoticiasVistasExiste = false;
        }
      } else {
        console.log("El documento del usuario no existe en la base de datos.");
      }
    } catch (error) {
      console.error("Error al verificar los datos en Firebase:", error);
    }
  }
}
