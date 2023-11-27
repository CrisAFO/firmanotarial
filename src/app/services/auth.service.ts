import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    constructor( private http: HttpClient) { }

    login(formData: any): Observable<boolean> {
      return this.http.post(`${base_url}/login`, formData)
        .pipe(
          map((resp: any) => {
            localStorage.setItem('rut', resp.rut);
            localStorage.setItem('nombre', resp.name);
            localStorage.setItem('correo', resp.email);
            localStorage.setItem('rol', resp.role);
            localStorage.setItem('password', resp.password);
  
            // Retornar true en caso de éxito
            return true;
          })
        );
    }
}