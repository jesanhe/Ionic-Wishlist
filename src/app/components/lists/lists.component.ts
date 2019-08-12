import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Lista } from 'src/models';
import { Router } from '@angular/router';
import { IonList, AlertController } from '@ionic/angular';
import { DeseosService } from 'src/app/services/deseos.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss'],
})
export class ListsComponent implements OnInit {
  @Input() terminado = true;
  @ViewChild('slidingList') slidingList: IonList;
  constructor(
    private router: Router,
    private deseos: DeseosService,
    private alertController: AlertController,
  ) {}

  ngOnInit() {
    // console.log(this.terminado);
  }

  listaSeleccionada(lista: Lista) {
    this.router.navigate(['/agregar', { id: lista.id }]);
  }

  async borrarLista(lista: Lista) {
    this.deseos.deleteList(lista);
    await this.slidingList.closeSlidingItems();
  }

  async editarLista(lista: Lista) {
    const alert = await this.alertController.create({
      // header: 'Nueva lista',
      message: 'Nuevo nombre de la lista',
      inputs: [
        {
          name: 'listname',
          type: 'text',
          value: lista.titulo,
          // label: 'Nombre de la lista',
          placeholder: 'Nombre de la lista',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Guardar',
          handler: (data) => {
            if (data.listname.length === 0) {
              return;
            } else {
              console.log(data);
              lista.titulo = data.listname;
              this.deseos.saveStorage();
            }
          },
        },
      ],
    });

    await this.slidingList.closeSlidingItems();
    await alert.present();
  }
}
