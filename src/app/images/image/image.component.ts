import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {any} from 'codelyzer/util/function';
import { AngularFireStorage } from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import {ImageService} from '../../shared/image.service';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {
  imgSrc: string | ArrayBuffer;
  selectedImage: any = null;
  isSubmitted: boolean;
  // formGroup: FormGroup;

  formGroup = new FormGroup({
    caption: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    imageUrl: new FormControl('', Validators.required)
  });

  constructor(private storage: AngularFireStorage, private service: ImageService){}
  // tslint:disable-next-line:typedef
    ngOnInit() {
      this.resetForm();
      // this.service.getImageDetailList();
    }

  // ngOnInit(): void {
  //   this.formGroup = this.formBuilder.group({
  //
  //     caption: ['', [Validators.required]],
  //     category: ['', [Validators.required]],
  //     imageUrl: ['', [Validators.required]]
  //   });
  // }

  showPreview(event: any): void {
    if (event.target.files && event.target.files[0]){
      const reader = new FileReader();
      reader.onload = (event1: any) => this.imgSrc = event1.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    }
    else{
      this.imgSrc = '/assets/img/image_PlaceHolder.webp';
      this.selectedImage = null;
    }
  }
  // tslint:disable-next-line:typedef
  onSubmit(formValue){
    this.isSubmitted = true;
    // @ts-ignore
    if (this.formGroup.valid){
      // tslint:disable-next-line:no-unused-expression
      const filePath = '${formValue.category}/${this.selectedImage.name.split(\'; \').slice(0,-1).join(\'; \')}_${(new Date().getime()}';
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            formValue.imageUrl = url ;
            this.service.insertImageDetails(formValue);
            this.resetForm();
          });
        })
      ).subscribe();
    }

  }
  // tslint:disable-next-line:typedef
   get formControls(){
    return this.formGroup.controls;
   }
  // tslint:disable-next-line:typedef
   resetForm(){
    this.formGroup.reset();
    this.formGroup.setValue({
      caption: '',
      imageUrl: '',
      category: 'Animal'
    });
    this.imgSrc = '/assets/img/image_PlaceHolder.webp';
    this.selectedImage = null;
    this.isSubmitted = false;
   }

}
