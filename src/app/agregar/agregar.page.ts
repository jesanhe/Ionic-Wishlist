import { Component, OnInit, ViewChild } from '@angular/core';
import { DeseosService } from '../services/deseos.service';
import { Lista, ListaItem } from 'src/models';
import { Router, ActivatedRoute } from '@angular/router';
import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';
import { IonList } from '@ionic/angular';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {
  @ViewChild('slidingList') slidingList: IonList;
  lista: Lista;
  nombreItem = '';
  constructor(
    private deseos: DeseosService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    let titulo = '';
    this.route.params.subscribe((params) => {
      titulo = params.name;
      if (params.id) {
        this.lista = this.deseos.loadList(parseInt(params.id, 10));
      } else {
        this.lista = new Lista(titulo);

        this.deseos.agregarListas(this.lista);
      }
    });
    console.log('waka');
  }

  agregarItem() {
    if (this.nombreItem.length === 0) {
      return;
    } else {
      const nuevoItem = new ListaItem(this.nombreItem);
      this.lista.items.push(nuevoItem);
      this.nombreItem = '';

      this.deseos.saveStorage();
    }
  }

  actualizarTarea(item: ListaItem) {
    item.completado = !item.completado;
    const pendientes = this.lista.items.filter((itemData) => {
      return !itemData.completado;
    }).length;

    if (pendientes === 0) {
      this.lista.terminada = true;
      this.lista.terminadaEn = new Date();
    } else {
      this.lista.terminada = false;
      this.lista.terminadaEn = null;
    }
    this.deseos.saveStorage();
  }

  async borrar(i: number) {
    this.lista.items.splice(i, 1);
    await this.slidingList.closeSlidingItems();
    await this.deseos.saveStorage();
  }
}
