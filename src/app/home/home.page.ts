import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  spinnerHidden: boolean;

  constructor(private router: Router, public loadingCtrl: LoadingController) {
    this.spinnerHidden = false;
  }

  ngOnInit() {}

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
}
