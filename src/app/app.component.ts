import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  public urlForQR: string = 'QR data';

  @ViewChild('canvas', { static: false }) canvas: ElementRef;

  // Creamos el formcontro y validamos la URL con una Regex
  urlForm = new FormGroup({
    url: new FormControl(
      '',
      Validators.compose([Validators.required, Validators.pattern(/^wap.us/)])
    ),
  });

  onSubmit() {
    // Obtenemos la URL y sacamos el nombre del negocio
    this.urlForQR = this.urlForm.value.url;
    var bussiness = this.urlForQR.match(/\/+(.*)/);

    // Obtenemos el codigo QR
    let h = document.getElementsByTagName('img');
    var canvas: HTMLCanvasElement = this.canvas.nativeElement;
    var context = canvas.getContext('2d');

    // Agregamos el QR al canvas
    context.drawImage(h[0], 125, 250);

    // Agregamos el nombre del negocio a la imagen
    context.font = '50px Clootie';
    context.fillStyle = '#068c92';
    context.fillText(`${bussiness[0]}`, 175, 220);
  }

  ngAfterViewInit() {
    // Cargamos el canvas con la imagen inicial
    var canvas: HTMLCanvasElement = this.canvas.nativeElement;
    var context = canvas.getContext('2d');
    let img1 = new Image();

    img1.onload = function () {
      canvas.width = img1.width;
      canvas.height = img1.height;
      context.globalAlpha = 1.0;
      context.drawImage(img1, 0, 0);
    };

    img1.src = '../assets/images/imagen1.png';
  }
}
