import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { AuthService } from '../services/auth.service';
import { UsuarioService } from '../services/usuario.service';
import { first } from 'rxjs/operators';
import { Usuario } from '../clases/usuario';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  spinnerHidden: boolean;
  result: any;
  codigoLeido: string;
  usuario: Usuario;
  montoACargar: number;

  constructor(
    private toastController: ToastController,
    private router: Router,
    public loadingCtrl: LoadingController,
    private barcodeScanner: BarcodeScanner,
    private auth: AuthService,
    private usuarioFirestore: UsuarioService
  ) {
    this.spinnerHidden = false;
    this.usuario = new Usuario();
    this.montoACargar = 0;
  }

  ngOnInit() {}

  ionViewDidEnter() {
    this.usuarioFirestore
      .obtenerColeccionUsuario()
      .pipe(first())
      .subscribe((data) => {
        this.usuario = data.filter(
          (item) => item.mail == this.auth.usuarioLogueado.mail
        )[0];
      });
  }

  navigateTo(url: string) {
    this.autoHideShow();
    setTimeout(() => {
      this.router.navigateByUrl(url);
    }, 2000);
  }

  autoHideShow() {
    this.loadingCtrl
      .create({
        message: 'Cargando...',
        duration: 2000,
        translucent: true,
        cssClass: 'ion-loading-class',
        spinner: 'crescent',
      })
      .then((res) => {
        res.present();
        res.onDidDismiss().then((res2) => {
          console.log('Loader closed', res2);
        });
      });
  }

  scan() {
    this.barcodeScanner
      .scan()
      .then((barcodeData) => {
        this.getCodeValue(barcodeData.text);
        this.calcularNuevoMonto();
      })
      .catch((err) => {
        alert('Error' + err);
      });
  }

  getCodeValue(valor: string) {
    let returnValue = 0;
    switch (valor) {
      case '8c95def646b6127282ed50454b73240300dccabc':
        this.codigoLeido = '8c95def646b6127282ed50454b73240300dccabc';
        this.montoACargar = 10;
        break;
      case 'ae338e4e0cbb4e4bcffaf9ce5b409feb8edd5172':
        this.codigoLeido = 'ae338e4e0cbb4e4bcffaf9ce5b409feb8edd5172';
        this.montoACargar = 50;
        break;
      case '2786f4877b9091dcad7f35751bfcf5d5ea712b2f':
        this.codigoLeido = '2786f4877b9091dcad7f35751bfcf5d5ea712b2f';
        this.montoACargar = 100;
        break;
    }
  }

  calcularNuevoMonto() {
    let contador = 0;
    if (this.usuario.tipo == 'admin') {
      this.usuario.qrEscaneados.forEach((qr) => {
        if (qr == this.codigoLeido) {
          contador++;
        }
      });
      if (contador < 2) {
        this.usuario.monto += this.montoACargar;
        this.usuario.qrEscaneados.push(this.codigoLeido);
        this.usuarioFirestore.update(this.usuario.id, this.usuario);
        this.successToast('Cargado correctamente');
      } else {
        this.errorToast('Ya se ha escaneado mas de 2 veces');
      }
    } else {
      if (this.usuario.qrEscaneados.includes(this.codigoLeido)) {
        this.errorToast('Ya se encuentra escaneado el QR');
      } else {
        this.usuario.monto += this.montoACargar;
        this.usuario.qrEscaneados.push(this.codigoLeido);
        this.usuarioFirestore.update(this.usuario.id, this.usuario);
        this.successToast('Cargado correctamente');
      }
    }
  }

  logout() {
    this.auth
      .signOut()
      .then((ok) => {
        this.navigateTo('/home');
      })
      .catch((err) => {
        this.navigateTo('/home');
      });
  }

  async successToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
      color: 'success',
    });

    toast.present();
  }

  async errorToast(error: string) {
    const toast = await this.toastController.create({
      message: error,
      duration: 2000,
      position: 'bottom',
      color: 'warning',
    });

    toast.present();
  }
}
