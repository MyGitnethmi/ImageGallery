import { Component, OnInit } from '@angular/core';
import {ImageService} from '../shared/image.service';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit {

  constructor(private service: ImageService ) { }

  // tslint:disable-next-line:typedef
  ngOnInit(){
    this.service.getImageDetailList();
  }

}
