import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  public files =[];
  public selectedFile:any;
  constructor() { }

  ngOnInit(): void {
  }

  onFileChanged(event: { target: { files: any[]; }; }) {
    this.selectedFile = event.target.files[0];
  }

  onUpload() {
    const uploadData = new FormData();
    uploadData.append('myFile', this.selectedFile);
  }

}
