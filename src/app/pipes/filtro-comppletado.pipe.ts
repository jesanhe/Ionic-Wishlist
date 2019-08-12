import { Pipe, PipeTransform } from '@angular/core';
import { Lista } from '../../models/index';

@Pipe({
  name: 'filtroComppletado',
})
export class FiltroComppletadoPipe implements PipeTransform {
  transform(listas: Lista[], completado: boolean = true): Lista[] {
    return listas.filter((lista) => {
      return lista.terminada === completado;
    });
  }
}
