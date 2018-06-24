import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { Http, Response } from '@angular/http';
import { FileSelectDirective, FileUploader } from 'ng2-file-upload';
import { FileService } from './file.service';
import { saveAs } from 'file-saver';
import {DomSanitizer} from '@angular/platform-browser';

const URL = 'http://localhost:3000/file/upload';

@Component({
    selector: 'app-root',
    templateUrl: './upload.file.component.html',
    styleUrls: ['./upload.file.component.scss'],
    providers : [FileService]
})
export class FileUploadComponent implements OnInit {
  uploader: FileUploader = new FileUploader({url: URL});
  attachmentList: any = [];
  imgSrc: any = '';
  filesArray: any = [];
  ngOnInit() {
    alert('Upload Component');
    this.getAllFiles();
  }
  constructor(
    private http: Http,
    private el: ElementRef,
    private fileService: FileService,
    private sanitizer: DomSanitizer
  ) {
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, res: any, status: any, headers: any) => {
      this.attachmentList.push(JSON.parse(res));
      console.log('over here');
      this.getAllFiles();
    };
  }
  upload() {
    console.log('in upload');
      const inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#photo');
      const fileCount: number = inputEl.files.length;
      console.log('inputEl : ' , inputEl.files);
      const formData = new FormData();
      if (fileCount > 0) {
        formData.append('photo', inputEl.files.item(0));

        this.fileService.uploadFile(formData).subscribe(
          data => {
            console.log('data!!!');
            alert(data);
          },
          error => {
            console.log('error: ' , error);
             alert(error);
          }
        );
      } else {
        console.log('no files selected');
      }
  }

  imageToShow: any;

  createImageFromBlob(image: Blob) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        console.log('reader: ' , reader);
          this.imageToShow = reader.result;
      }, false);

      if (image) {
          reader.readAsDataURL(image);
      }
  }

  getAllFiles() {
    const self = this;
    this.fileService.getFiles().subscribe(
      data => {
        console.log(data);
        self.filesArray = data.files;
      },
      error => {
        console.error(error);
        self.filesArray = [];
      }
    );
  }
  delete(file) {
    console.log('file: ' , file);
    const self = this;
    const filename = file.filename;
    self.fileService.deleteFile(filename).subscribe(
      data => {
        console.log(data);
        self.getAllFiles();
      },
      error => {
        console.error(error);
      }
    );
  }
  download(file) {
    console.log('file: ' , file);
    const self = this;
    const filename = file.filename;
    self.fileService.downloadFile(filename).subscribe(
      data => {
        console.log(data);
        saveAs(data, filename.split('||')[1]);
        self.createImageFromBlob(data);
      },
      error => {
        console.error(error);
      }
    );
  }
}
