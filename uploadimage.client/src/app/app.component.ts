import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ImageUploadServiceService } from './image-upload-service.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent{
  selectedFile: File | null = null;
  uploadResponse: any = null;
  errorMessage: string | null = null;

  constructor(private imageService: ImageUploadServiceService) { }

  OnFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.errorMessage = null;
  }

  OnUpload() {
    if (this.selectedFile) {

      this.imageService.uploadImage(this.selectedFile).subscribe({
        next: (response) => {
          console.log("Updated Image", response);
          this.uploadResponse = response; 
          this.errorMessage = null;
        },
        error: (error) => {
          console.error("Updated Failed", error);
          this.errorMessage = 'Upload failed: ' + error.message;
          this.uploadResponse = null;

        }
      })
    }
  }

  title = 'uploadimage.client';
}
