import { Injectable } from '@angular/core';
import { Firestore, doc, setDoc, getDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class FirebaseDatosService {
  private userId: string; // Identificador del usuario
  private datos: { [key: string]: any } = {
    contador: 0,
    otraVariable: 0,
    // Puedes agregar más variables aquí
  };

  constructor(private firestore: Firestore) {
    this.userId = 'userIdDelUsuario'; // Reemplaza con la lógica para obtener el ID del usuario
    this.obtenerDatos(); // Carga los datos al iniciar
  }

  async obtenerDatos(): Promise<void> {
    const docRef = doc(this.firestore, 'DatosUsuario', this.userId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      this.datos = { ...this.datos, ...docSnap.data() }; // Mezcla los datos obtenidos
    } else {
      this.datos = { contador: 0, otraVariable: 0 }; // Valores por defecto
    }
  }

  getValor(variable: string): number {
    return this.datos[variable] || 0; // Retorna 0 si no existe la variable
  }

  async actualizarValor(variable: string, valor: number): Promise<void> {
    this.datos[variable] = valor;
    const docRef = doc(this.firestore, 'DatosUsuario', this.userId);
    await setDoc(docRef, this.datos);
  }

  async incrementarContador(): Promise<void> {
    await this.actualizarValor('contador', this.datos.contador + 1);
  }

  // Métodos para manejar otras variables...
}
