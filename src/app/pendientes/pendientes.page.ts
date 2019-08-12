import { Component, OnInit, ViewChild } from '@angular/core';
import { DeseosService } from '../services/deseos.service';
import { Lista } from 'src/models';
import { Router } from '@angular/router';
import { AlertController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-pendientes',
  templateUrl: './pendientes.page.html',
  styleUrls: ['./pendientes.page.scss'],
})
export class PendientesPage implements OnInit {
  @ViewChild('slidingList') slidingList: IonList;
  constructor(
    private deseos: DeseosService,
    private router: Router,
    private alertController: AlertController,
  ) {}

  ngOnInit() {}

  listaSeleccionada(lista: Lista) {
    this.router.navigate(['/agregar', { id: lista.id }]);
  }

  // agregarLista() {
  //
  // }

  async borrarLista(lista: Lista) {
    this.deseos.deleteList(lista);
    await this.slidingList.closeSlidingItems();
  }

  async agregarLista() {
    const alert = await this.alertController.create({
      // header: 'Nueva lista',
      message: 'Nombre de la nueva lista',
      inputs: [
        {
          name: 'listname',
          type: 'text',
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
          text: 'Ok',
          handler: (data) => {
            if (data.listname.length === 0) {
              return;
            } else {
              console.log(data);
              this.router.navigate(['/agregar', { name: data.listname }]);
            }
          },
        },
      ],
    });

    await alert.present();
  }
}
