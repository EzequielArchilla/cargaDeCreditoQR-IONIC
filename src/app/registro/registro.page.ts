import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { LoadingController, ToastController } from '@ionic/angular';
import { UsuarioService } from '../services/usuario.service';
import { AuthService } from '../services/auth.service';
import { Usuario } from '../clases/usuario';
import { first } from 'rxjs/operators';

const auth = getAuth();

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  email: string = '';
  password: string = '';
  error = {
    hasError: false,
    message: '',
  };
  usuario: Usuario;

  constructor(
    private toastController: ToastController,
    private router: Router,
    public loadingCtrl: LoadingController,
    private usuarioService: UsuarioService,
    private authService: AuthService,
    private usuarioFirestore: UsuarioService
  ) {}

  ngOnInit() {
    this.usuario = new Usuario();
  }

  async successToast() {
    const toast = await this.toastController.create({
      message: 'Registrado correctamente',
      duration: 2000,
      position: 'bottom',
      color: 'success',
    });

    toast.present();
  }

  async errorToast() {
    const toast = await this.toastController.create({
      message: this.error.message,
      duration: 2000,
      position: 'bottom',
      color: 'warning',
    });

    toast.present();
  }

  signUp() {
    this.comprobacionDeErrores();
    var usuario = new Usuario();
    usuario.mail = this.email;
    usuario.monto = 0;
    usuario.tipo = 'basico';
    if (!this.error.hasError) {
      this.authService
        .register(this.email, this.password)
        .then((userCredential) => {
          // Signed in
          this.usuarioService.crearUsuario(usuario).then((ok) => {
            const user = userCredential.user;
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
            this.navigateTo('main');
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          this.email = '';
          this.password = '';
          this.errorToast();
        });
    } else {
      this.email = '';
      this.password = '';
      this.errorToast();
    }
    this.error.hasError = false;
  }

  comprobacionDeErrores() {
    if (this.email === '' || this.password === '') {
      this.error.hasError = true;
      this.error.message = 'Faltan completar campos';
      return;
    }
    if (this.password.length < 8) {
      this.error.hasError = true;
      this.error.message = 'La contraseña no tiene la longitud minima';
      return;
    }
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
