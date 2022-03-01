import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { FileUploadService } from 'src/app/services/file-upload.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  public files =[];
  public testFile = new File([], 'test');
  public preview: string = '';
  public percentDone: any = 0;
  public form: FormGroup;
  public selectedFile:any;
  public tokens: any[] =[];

  constructor(
    public formBuilder: FormBuilder,
    public router: Router,
    public fileUploadService: FileUploadService
  ) { 
    this.form = this.formBuilder.group({
      name: '',
      image: ''
    })
  }

  ngOnInit(): void {
    this.getTokens();
  }

  onFileChanged(event: { target: { files: any[]; }; }) {
    this.selectedFile = event.target.files[0];
  }

  drag(event: any) {
    console.log(event.target);
    console.log(event.target.id);
    event.dataTransfer.setData("text", event.target.id);
    event.dataTransfer.setData("text1", event.target.src);
  }


  onUpload(event: any) {
    console.log(event);
    const file = (event.target).files[0];
    console.log('file:', file);
    this.form.controls['image'].setValue(file);
    this.form.controls['name'].setValue(file.name);


    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.preview = reader.result as string;
    }
    reader.readAsDataURL(file)
  }

  getTokens() {
    this.fileUploadService.getTokens().pipe(first()).subscribe((response: any) => {
      const tokens = response.tokens;
      console.log(tokens)
      console.log('hit subscribe')
      this.tokens = tokens;
    })
  }

  submit() {
    this.fileUploadService.addToken(
      this.form.value.name,
      this.form.value.image
    ).subscribe((event: HttpEvent<any>) => {
      switch (event.type) {
        case HttpEventType.Sent:
          console.log('Request has been made!');
          break;
        case HttpEventType.ResponseHeader:
          console.log('Response header has been received!');
          break;
        case HttpEventType.UploadProgress:
          // this.percentDone = Math.round(event.loaded / event.total * 100);
          console.log(`Uploaded! ${this.percentDone}%`);
          break;
        case HttpEventType.Response:
          console.log('User successfully created!', event.body);
          this.percentDone = false;
          this.router.navigate(['users-list'])
      }
    })
  }

}
