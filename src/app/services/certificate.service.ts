import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, map } from 'rxjs';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class CertificateService {
  private user= localStorage.getItem('correo');
  private password= localStorage.getItem('password');
  constructor( private http: HttpClient) { }


  certificarDocumento( id:string ,formData: any): Observable<any> {

    return this.http.post(`${base_url}/notaria/certificate/${id}`, formData).pipe(
      map((resp: any) => resp.message)
    );

  }

  obtenerConglomerado( id:string ): Observable<any> {

    return this.http.post(`${base_url}/notaria/conglomeradoTemplate/${id}`,null).pipe(
      map((resp: any) => {
        console.log('Data de conglomerado',resp)
        return resp
    })
    );

  }

}
