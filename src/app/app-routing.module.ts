import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ImagesComponent } from './images/images.component';
import { ImageListComponent } from './images/image-list/image-list.component';
import { ImageComponent } from './images/image/image.component';


const routes: Routes = [
  { path: '', redirectTo: 'image/upload', pathMatch: 'full'},
  { path: 'image', component: ImagesComponent, children: [
      { path: 'upload', component: ImagesComponent },
      { path: 'list', component: ImageListComponent }
    ]}
];




@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]


})
export class AppRoutingModule { }
