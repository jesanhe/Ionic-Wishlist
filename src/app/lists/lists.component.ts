import { Component, OnInit, Input } from '@angular/core';
import { Lista } from 'src/models';
import { Router } from '@angular/router';
import { DeseosService } from '../services/deseos.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss'],
})
export class ListsComponent implements OnInit {
  @Input() terminado = true;
  constructor(private router: Router, private deseos: DeseosService) {}

  ngOnInit() {}

  listaSeleccionada(lista: Lista) {
    this.router.navigate(['/agregar', { id: lista.id }]);
  }

  async borrarLista(lista: Lista) {
    this.deseos.deleteList(lista);
    await this.slidingList.closeSlidingItems();
  }
}
