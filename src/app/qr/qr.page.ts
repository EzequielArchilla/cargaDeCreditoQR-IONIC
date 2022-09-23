import { Component, OnInit } from '@angular/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.page.html',
  styleUrls: ['./qr.page.scss'],
})
export class QrPage implements OnInit {

  ngOnInit() {
  }

  constructor(private qrScanner: QRScanner) { }

  captarQR(){
  this.qrScanner.prepare()
    .then((status: QRScannerStatus) => {
       if (status.authorized) {
         // Los permisos están concedidos
         // Comenzamos a escanear
         let scanSub = this.qrScanner.scan().subscribe((text: string) => {
           console.log('Scanned something', text);
           this.qrScanner.hide(); // Ocultamos el preview
           scanSub.unsubscribe(); // Dejamos de Scannear
         });
       } else if (status.denied) {
         // Los permisos de la cámara están denegados permanentemente
         // Para poder volver a usar la cámara, el usaurio tendrá que abrir los ajustes de persmisos
         // Y dar permisos desde allí con la función "openSettings"
       } else {
         // Los permisos han sido denegados, pero no permanentemente. Si los solicitas otra vez volverá a aparecer la solicitud.
       }
    })
    .catch((e: any) => console.log('Error is', e));
  }
}
