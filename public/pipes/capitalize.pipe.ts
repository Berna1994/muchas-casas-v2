import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({
  name: 'capitalize',
  standalone: true
})
@Injectable({
  providedIn: 'root'
})
export class CapitalizePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';

    // Capitaliza la primera letra
    const sentences = value.split(/([.!?]\s*|\n)/); // Divide la cadena en frases
    return sentences
      .map(sentence => {
        // Capitaliza la primera letra de cada oración
        return sentence.charAt(0).toUpperCase() + sentence.slice(1).toLowerCase();
      })
      .join(''); // Une las frases de nuevo
  }
}
