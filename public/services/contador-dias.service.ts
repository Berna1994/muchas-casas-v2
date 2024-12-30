import { Injectable } from "@angular/core";
import { Firestore, doc, getDoc, setDoc } from "@angular/fire/firestore";
import { ConfiguracionDatos } from "../../src/app/firebase-component/carga-de-datos"; // Ajusta la ruta
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class ContadorService {
  private userId: string | null = null;

  constructor(
    private firestore: Firestore, 
    private configuracionDatos: ConfiguracionDatos,
    authService: AuthService) {
      authService.userId$.subscribe((userId) => {
        this.userId = userId;
      });
    }

  getValor(): number {
    return this.configuracionDatos.contador;
  }

  setValor(valor: number): void {
    this.configuracionDatos.contador = valor;
  }

  incrementar(): void {
    this.configuracionDatos.contador++;
    console.log("Contador actualizado:", this.configuracionDatos.contador);
  }

  guardarContador(): void {
    if (!this.userId) {
      console.log("El usuario no está autenticado.");
      return;
    }

    const userDoc = doc(this.firestore, "usuarios", this.userId);
    const data = { contador: this.configuracionDatos.contador };

    setDoc(userDoc, data, { merge: true })
      .then(() => console.log("Contador guardado exitosamente."))
      .catch((error) => console.error("Error al guardar el contador:", error));
  }

  recuperarContador(): void {
    if (!this.userId) {
      console.log("El usuario no está autenticado.");
      return;
    }

    const userDoc = doc(this.firestore, "usuarios", this.userId);

    getDoc(userDoc)
      .then((docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          this.configuracionDatos.contador = data?.["contador"] ?? 0;
          console.log("Contador recuperado:", this.configuracionDatos.contador);
        } else {
          console.log("No se encontraron datos para el usuario.");
        }
      })
      .catch((error) => console.error("Error al recuperar el contador:", error));
  }
}
