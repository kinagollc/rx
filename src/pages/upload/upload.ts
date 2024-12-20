import { Component } from '@angular/core';
import { NavController, ViewController, ToastController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { FirebaseClient } from '../../providers/firebase.service';
import { WordpressClient } from '../../providers/wordpress-client.service';
import { TranslateService } from '@ngx-translate/core';
import { File, FileEntry, Entry } from '@ionic-native/file';
import { Subscription } from 'rxjs/Subscription';
import { Constants } from '../../models/constants.models';
import { UserResponse } from '../../models/user-response.models';

@Component({
  selector: 'page-upload ',
  templateUrl: 'upload.html',
  providers: [WordpressClient, FirebaseClient]
})
export class UploadPage {
  private subscriptions: Array<Subscription> = [];
  private message: string;
  private progress: boolean;
  private fileToUpload: File;
  private presUrl: string;
  private cameraUploads = [];
  private galleryUploads = [];

  constructor(private navCtrl: NavController, private service: WordpressClient, private toastCtrl: ToastController,
    private viewCtrl: ViewController, private file: File, private camera: Camera,
    private firebaseService: FirebaseClient, private translate: TranslateService) {
    this.translate.get('share_prsc').subscribe(value => {
      this.message = value;
    });
  }

  private editphoto() {
    if (this.progress)
      return;
    let fileInput = document.getElementById("pres-image");
    fileInput.click();
  }

  changeFileListener($event): void {
    const files = $event.target.files;
    console.log($event.target.files);
    for (let i = 0; i < files.length; i++) {
      if (files[i]) {
        this.progress = true;
        this.translate.get('upload_progress_message').subscribe(value => {
          this.message = value;
        });
        this.firebaseService.uploadFile(files[i]).then(url => {
          this.progress = false;
          this.translate.get('share_prsc').subscribe(value => {
            this.message = value;
          });
          this.galleryUploads.push(String(url));
          // if ((i+1) == files.length) {
          //   this.saveUrl(String(url), true);
          // }
          // else {
          //   this.saveUrl(String(url), false);
          // }
        }).catch(err => {
          this.progress = false;
          console.log(err);
          this.translate.get('upload_error').subscribe(value => {
            this.message = value;
          });
        })
      }
    }
    // for (var i = 0; i < files.length; i++) {
    //   // this.fileToUpload = files[i];
      // if (files[i]) {
      //   this.progress = true;
      //   this.translate.get('upload_progress_message').subscribe(value => {
      //     this.message = value;
      //   });
      //   this.firebaseService.uploadFile(files[i]).then(url => {
      //     console.log(i + '--------------------------------------------------------');
      //     console.log(files[i]);
      //     console.log(String(url));
      //     this.saveUrl(String(url));
      //   }).catch(err => {
      //     this.progress = false;
      //     console.log(err);
      //     this.translate.get('upload_error').subscribe(value => {
      //       this.message = value;
      //     });
      //   })
      // }
    // }
  }

  pickCamera() {
    if (this.progress)
      return;
    this.camera.getPicture().then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      console.log(imageData);
      this.resolve(imageData, true);
    }, (err) => {
      this.translate.get('upload_error_file').subscribe(value => {
        this.message = value;
      });
      console.log('ce ' + err);
    });
  }

  resolve(uri: string, image) {
    console.log('uri: ' + uri);
    let base64Image = '';
    if (uri.startsWith('content://') && uri.indexOf('/storage/') != -1) {
      uri = "file://" + uri.substring(uri.indexOf("/storage/"), uri.length);
      console.log('file: ' + uri);
    }
    this.file.resolveLocalFilesystemUrl(uri).then((entry: Entry) => {
      console.log(entry);
      var fileEntry = entry as FileEntry;
      fileEntry.file(success => {
        var mimeType = success.type;
        console.log(mimeType);
        let dirPath = entry.nativeURL;

        base64Image = (<any>window).Ionic.WebView.convertFileSrc(uri);

        this.cameraUploads.push({'dirPath': dirPath, 'name': entry.name, 'mimeType': mimeType, 'base64Image': base64Image});
        // this.upload(dirPath, entry.name, mimeType);
      }, error => {
        console.log(error);
      });
    })
  }

  uploadPickCameraImages() {
    for (var i = 0; i < this.cameraUploads.length; i++) {
      this.upload(this.cameraUploads[i].dirPath, 
                  this.cameraUploads[i].name, 
                  this.cameraUploads[i].mimeType, 
                  ((i + 1) == this.cameraUploads.length) ? true : false, 
                  ((i + 1) == this.cameraUploads.length) ? true : false);
    }
  }

  uploadSelectedImages() {
    this.progress = true;
    this.translate.get('upload_progress_message').subscribe(value => {
      this.message = value;
    });
    for (var i = 0; i < this.galleryUploads.length; i++) {
      if ((i+1) == this.galleryUploads.length) {
        this.saveUrl(this.galleryUploads[i], true);
      }
      else {
        this.saveUrl(this.galleryUploads[i], false);
      }
    }
  }

  upload(path, name, mime, dismiss: boolean = true, clearCameraUploads: boolean = false) {
    this.translate.get('upload_progress_message').subscribe(value => {
      this.message = value;
    });
    console.log('original: ' + path);
    let dirPathSegments = path.split('/');
    dirPathSegments.pop();
    path = dirPathSegments.join('/');
    console.log('dir: ' + path);
    this.file.readAsArrayBuffer(path, name).then(buffer => {
      this.translate.get('upload_progress_message').subscribe(value => {
        this.message = value;
      });
      this.progress = true;
      this.firebaseService.uploadBlob(new Blob([buffer], { type: mime })).then(url => {
        this.saveUrl(String(url), dismiss);
        if (clearCameraUploads) {
          this.cameraUploads = [];
        }
      }).catch(err => {
        this.progress = false;
        console.log(err);
        this.translate.get('upload_error').subscribe(value => {
          this.message = value;
        });
        if (clearCameraUploads) {
          this.cameraUploads = [];
        }
      })
    }).catch(err => {
      this.translate.get('upload_error_file').subscribe(value => {
        this.message = value;
      });
      if (clearCameraUploads) {
        this.cameraUploads = [];
      }
      console.log(err);
    })
  }

  saveUrl(url: string, dismiss: boolean = true) {
    console.log('url -------');
    console.log(url);
    this.presUrl = url;
    let user: UserResponse = JSON.parse(window.localStorage.getItem(Constants.USER_KEY));
    let subscription: Subscription = this.service.createPrescription(String(user.id), url).subscribe(data => {
      this.translate.get('upload_success').subscribe(value => {
        this.showToast(value);
      });
      this.progress = false;
      console.log(data);
      if (dismiss) {
        this.galleryUploads = [];
        this.dismiss();
      }
    }, err => {
      this.translate.get('upload_error_submit').subscribe(value => {
        this.showToast(value);
      });
      this.progress = false;
      console.log(err);
      if (dismiss) {
        this.galleryUploads = [];
        this.dismiss();
      }
    });
    this.subscriptions.push(subscription);
  }

  showToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'bottom'
    });
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
    toast.present();
  }

  dismiss() {
    if (this.progress)
      return;
    this.viewCtrl.dismiss(this.presUrl);
  }

}
