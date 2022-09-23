import { Component, OnInit } from '@angular/core';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

const auth = getAuth();

@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.page.html',
  styleUrls: ['./ingreso.page.scss'],
})
export class IngresoPage implements OnInit {
  email: string;
  password: string;
  spinnerHidden: boolean;

  constructor(
    private toastController: ToastController,
    private router: Router,
    public loadingCtrl: LoadingController
  ) {}

  ngOnInit() {}

  async successToast() {
    const toast = await this.toastController.create({
      message: 'Logueado correctamente',
      duration: 2000,
      position: 'bottom',
      color: 'success',
    });

    toast.present();
  }

  async errorToast() {
    const toast = await this.toastController.create({
      message: 'Mail o contraseña incorrecto',
      duration: 2000,
      position: 'bottom',
      color: 'warning',
    });

    toast.present();
  }

  signIn() {
    signInWithEmailAndPassword(auth, this.email, this.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        this.successToast();
        this.navigateTo('/main');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        this.errorToast();
        this.email = '';
        this.password = '';
      });
  }
  login(num: number) {
    switch (num) {
      case 1:
        this.email = 'usuario1@gmail.com';
        this.password = '12345678';
        break;
      case 2:
        this.email = 'usuario2@gmail.com';
        this.password = '12345678';
        break;
      case 3:
        this.email = 'usuario3@gmail.com';
        this.password = '12345678';
        break;
    }
    this.signIn();
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
}
