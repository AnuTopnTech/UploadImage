import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadServiceService {
  private apiUrl = "https://localhost:5000/api/Image";
  constructor(private http: HttpClient) { }
 

  uploadImage(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('File', file, file.name);
    return this.http.post(this.apiUrl, formData).pipe(
      catchError((error) => {
        console.error("Error Uploading Image:", error);
        return throwError(error);
      })
    );
  }
}
