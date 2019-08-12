import { Pipe, PipeTransform } from '@angular/core';
import { Lista } from '../../models/index';

@Pipe({
  name: 'filtroComppletado',
  pure: false,
})
export class FiltroComppletadoPipe implements PipeTransform {
  transform(listas: Lista[], completado: boolean = true): Lista[] {
    const waka: Lista[] = listas.filter((lista) => {
      return lista.terminada === completado;
    });
    return waka;
  }
}
