import { Component, OnInit } from '@angular/core';
import {ImageService} from '../../shared/image.service';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: []
})
export class ImageListComponent implements OnInit {

  imageList: any[];
  rowIndexArray: any[];

  constructor(private service: ImageService) { }

  ngOnInit(): void {
    this.service.imageDetailList.snapshotChanges().subscribe(
      list => {
       this.imageList = list.map(item => item.payload.val());
       this.rowIndexArray = Array.from(Array(Math.ceil((this.imageList.length + 1) / 3)).keys());
      }
    );
  }

}
