import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, map } from 'rxjs';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class UploadDocService {
  private user= localStorage.getItem('correo');
  private password= localStorage.getItem('password');
  constructor( private http: HttpClient) { }


  cargarDocumento( formData: any): Observable<any> {

    return this.http.post(`${base_url}/notaria/document`, formData).pipe(
      map((resp: any) => resp.message)
    );

  }
  obtenerDatos(): Observable<Document[]> {
    return this.http.get<any>(`${ base_url }/documents`).pipe(
      map((data) => {
        return data.map((item: Document) => {
          return item
        });
      })
    );
  }
  listarDocumento(id:string){

    return this.http.get<any>(`${ base_url }/document/${id}`).pipe(
      map((data) => {
        return data;
      })
    );
  }
}
