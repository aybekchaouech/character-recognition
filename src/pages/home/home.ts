import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import Tesseract from 'tesseract.js'


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public photos: any;
  public base64Image: any;
  public loadingCtrl: LoadingController

  constructor(public navCtrl: NavController, public camera: Camera, private alertCtrl: AlertController) {
    this.photos = [];
  }
  ngOnInit() {

  }



  takePicture() {
    let options = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit: true,
      saveToPhotoAlbum: false,
      cameraDirection: 1,
      //sourceType: this.camera.PictureSourceType.CAMERA*/

    };
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
      /*this.base64Image = {
        heigh: 100,
        widh: 100,
        data: 'data:image/jpeg;base64,' + imageData
      };*/
      this.photos.push(this.base64Image);
      this.photos.reverse();
    }, (err) => {

    });
  }

  analyzeWithTes() {

    if (this.base64Image != '') {
      console.log(this.base64Image)
      Tesseract.recognize(this.base64Image, { lang: 'fra' })
        .progress(message => console.log(message))
        .catch(err => console.error(err))
        .then(result => console.log(result))
        .finally(resultOrError => console.log(resultOrError))

    }
    else {
      console.warn('no picture yet');
    }

  }

  /*analyze() {
    let loader = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loader.present();
    (<any>window).OCRAD(document.getElementById('image'), text => {
      loader.dismissAll();
      alert(text);
      console.log(text);
    });
    console.log("image   "+document.getElementById('image'))
  }
  analyze2(){
(<any>window).TesseractPlugin.recognizeText(this.base64Image,  function(recognizedText) {
            this.text = recognizedText;
            alert(recognizedText);
        }, function(reason) {
            console.log('Error on recognizing text from image. ' + reason);
        });


  } */

  deletePhoto(index) {

    // alert("Delite");

    let confirm = this.alertCtrl.create({
      title: 'are you sure you want to delete phot ?',
      message: '',
      buttons: [
        {
          text: 'no',
          handler: () => {

          }
        },
        {
          text: 'yes',
          handler: () => {
            this.photos.splice(index, 1);
          }
        }
      ]
    });
    confirm.present();
  }


}