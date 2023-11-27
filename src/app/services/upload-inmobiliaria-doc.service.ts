import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, catchError, map , of} from 'rxjs';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class UploadInmobiliariaDoc {
  private user= localStorage.getItem('correo');
  private password= localStorage.getItem('password');
  constructor( private http: HttpClient) { }


  cargarDocumento( formData: any): Observable<any> {

    return this.http.post(`${base_url}/inmobiliaria/document`, formData).pipe(
      map((resp: any) => resp.message)
    );

  }
  validarRut(rut: string): Observable<boolean> {
    return this.http.get(`${base_url}/clients/${rut}`).pipe(
        map((data:any) => {
            return data.types.Contrato;
          }),
          catchError((error)=>{
            return of(false);
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
