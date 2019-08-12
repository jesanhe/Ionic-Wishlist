import { Component, OnInit } from '@angular/core';
import { DeseosService } from '../services/deseos.service';
import { Lista } from 'src/models';

@Component({
  selector: 'app-terminados',
  templateUrl: './terminados.page.html',
  styleUrls: ['./terminados.page.scss'],
})
export class TerminadosPage implements OnInit {
  constructor(private deseos: DeseosService) {}

  ngOnInit() {}

  listaSeleccionada(lista: Lista) {
    console.log(lista);
  }
}
