import { Injectable } from '@angular/core';
import { Lista } from 'src/models';

@Injectable({
  providedIn: 'root',
})
export class DeseosService {
  listas: Lista[] = [];

  constructor() {
    this.loadStorage();
    // const lista1 = new Lista('Recolectar piedras');
    // const lista2 = new Lista('Recolectar madera');
    // this.listas.push(lista1, lista2);
    // console.log(this.listas);
  }

  agregarListas(lista: Lista) {
    this.listas.push(lista);

    this.saveStorage();
  }

  loadList(id: number): Lista {
    let idx: number;
    this.listas.forEach((lista, index) => {
      if (lista.id === id) {
        idx = index;
      }
    });
    return this.listas[idx];
  }

  deleteList(list: Lista) {
    this.listas = this.listas.filter((listaData) => {
      return listaData.id !== list.id;
    });
    this.saveStorage();
  }

  saveStorage() {
    localStorage.setItem('data', JSON.stringify(this.listas));
  }

  loadStorage() {
    if (localStorage.getItem('data')) {
      this.listas = JSON.parse(localStorage.getItem('data'));
    }
  }
}
