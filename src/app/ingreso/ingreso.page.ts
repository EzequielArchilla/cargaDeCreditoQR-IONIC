import { Component, OnInit } from '@angular/core';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import {
  LoadingController,
  PickerController,
  ToastController,
} from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../clases/usuario';
import { first } from 'rxjs/operators';

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
  usuario: Usuario;

  constructor(
    private toastController: ToastController,
    private router: Router,
    public loadingCtrl: LoadingController,
    private pickerCtrl: PickerController,
    private usuarioFirestore: UsuarioService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.usuario = new Usuario();
  }

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
        this.usuarioFirestore
          .obtenerColeccionUsuario()
          .pipe(first())
          .subscribe((data: any) => {
            this.usuario = data.filter(
              (user: any) => user.mail == this.email
            )[0];
            this.authService.usuarioLogueado = this.usuario;
            this.authService.logueado = true;
          });
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
        this.email = 'admin@gmail.com';
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

  async openPicker() {
    const picker = await this.pickerCtrl.create({
      columns: [
        {
          name: 'Usuarios',
          options: [
            {
              text: 'Usuario 1',
              value: 1,
            },
            {
              text: 'Usuario 2',
              value: 2,
            },
            {
              text: 'Usuario 3',
              value: 3,
            },
          ],
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Confirm',
          handler: (value) => {
            this.login(value.Usuarios.value);
          },
        },
      ],
    });

    await picker.present();
  }
}
