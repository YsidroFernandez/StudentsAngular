import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse,HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
/**
 * @name Api
 * @description
 * Api es un controlador genérico de REST Api. Establezca su URL de API primero.
 *
 * @usage
 *
 * ```typescript
 * import { Api } from './../../providers/providers';
 *
 * class MyClass {
 *  constructor(private api: Api) {
 *    this.miFunction();
 *  }
 *
 *  myFunction() {
 *    this.api.post(inUrl, 'query', 10000).then((success) => {
 *      console.log(success);
 *    }, fail => {
 *      console.log(fail);
 *    });
 *  }
 * }
 * ```
 */
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  /**
   * Es la variable donde se asigna la url.
   */
  protected url = environment.SERVER_URL;
  /**
   * Contar los intentos de comunicación fallidos.
   */
  attemptsFailed = 0;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
  }
  /**
   * Regresa la url del servidor web ej.: 'http://xxx.xxx.xxx.xxx/xx'.
   * @return {string} url
   */
  public getUrl(): string {
    return this.url;
  }
  /**
   * Regresa el host del servidor web ej.: 'xxx.xxx.xxx.xxx'.
   * @return {string} url
   */
  public getHost(): string {
    return this.url.split('/').slice(0, -1).join('/');
  }
  /**
   * @name post
   * @description
   * Se envia una peticion `POST` a un servidor web y regresa los datos que son recuperados.
   *
   * @usage
   *
   * ```typescript
   * const query = {
   *  foo: foo,
   *  var: var
   * };
   * this.api.post(inUrl, query, 10000).then(
   * (success) => {
   *  console.log(success);
   * }, fail => {
   *  console.log(fail);
   * });
   * ```
   *
   * @param {string} inUrl url a donde hacer post.
   * @param {any} query Es la consulta a realizar.
   * @return {Promise<any>} Es la respuesta del servidor según la consulta que se realice.
   */
  public post(inUrl: string, query?: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      });
      const httpOptions = {
        headers: headers,
        // params: new HttpParams().set('lang', localStorage.getItem('lang'))
      };
      this.http.post(`${this.url}${inUrl}`, query, httpOptions).subscribe((response: any) => {
        resolve(response);
      }, (fail: HttpErrorResponse) => {
        this.logout(fail);
        reject(fail);
      });
    });
  }
  /**
   * @name get
   * @description
   * Se envia una peticion `GET` a un servidor web y regresa los datos que son recuperados.
   *
   * @usage
   *
   * ```typescript
   * this.api.get(inUrl, 10000).then(
   * (success) => {
   *  console.log(success);
   * }, fail => {
   *  console.log(fail);
   * });
   * ```
   *
   * @param {string} inUrl url a donde hacer post.
   * @return {Promise<any>} Es la respuesta del servidor según la consulta que se realice.
   */
  public get(inUrl: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
       
      });

      const httpOptions = {
        headers: headers,
        // params: new HttpParams().set('lang', localStorage.getItem('lang'))
      };
      this.http.get(`${this.url}${inUrl.trim().replace(' ', '+')}`, httpOptions).subscribe((response: any) => {
        resolve(response);
      }, (fail: HttpErrorResponse) => {
        this.logout(fail);
        reject(fail);
      });
    });
  }
  /**
   * @name delete
   * @description
   * Se envia una peticion `DELETE` a un servidor web y regresa los datos que son recuperados.
   *
   * @usage
   *
   * ```typescript
   * this.api.delete(inUrl, 10000).then(
   * (success) => {
   *  console.log(success);
   * }, fail => {
   *  console.log(fail);
   * });
   * ```
   *
   * @param {string} inUrl url a donde hacer post.
   * @return {Promise<any>} Es la respuesta del servidor según la consulta que se realice.
   */
  public delete(inUrl: string,body? : any): Promise<any> {


    const formedUrl = inUrl.split(' ').join('-');
    return new Promise(async (resolve, reject) => {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        
      });
      const httpOptions = {
        headers: headers,
        body : body
        // params: new HttpParams().set('lang', localStorage.getItem('lang'))
      };
      this.http.delete(`${this.url}${formedUrl}`, httpOptions).subscribe((response: any) => {
        resolve(response);
      }, (fail: HttpErrorResponse) => {
        this.logout(fail);
        reject(fail);
      });
    });
  }
  /**
   * @name put
   * @description
   * Se envia una peticion `PUT` a un servidor web y regresa los datos que son recuperados.
   *
   * @usage
   *
   * ```typescript
   * const query = {
   *  foo: foo,
   *  var: var
   * };
   * this.api.put(inUrl, query, 10000).then(
   * (success) => {
   *  console.log(success);
   * }, fail => {
   *  console.log(fail);
   * });
   * ```
   *
   * @param {string} inUrl url a donde hacer post.
   * @param {any} query Es la consulta a realizar.
   * @return {Promise<any>} Es la respuesta del servidor según la consulta que se realice.
   */
  public put(inUrl: string, query?: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      });
      const httpOptions = {
        headers: headers,
        // params: new HttpParams().set('lang', localStorage.getItem('lang'))
      };
      this.http.put(`${this.url}${inUrl}`, query, httpOptions).subscribe((response: any) => {
        resolve(response);
      }, (fail: HttpErrorResponse) => {
        this.logout(fail);
        reject(fail);
      });
    });
  }



  public postMultiformData(inUrl: string, query?: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const headers = new HttpHeaders({
        // 'Content-Type': '',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      });
      const httpOptions = {
        headers: headers,
        // params: new HttpParams().set('lang', localStorage.getItem('lang'))
      };
      this.http.post(`${this.url}${inUrl}`, query, httpOptions).subscribe((response: any) => {
        resolve(response);
      }, (fail: HttpErrorResponse) => {
        this.logout(fail);
        reject(fail);
      });
    });
  }

  public putMultiformData(inUrl: string, query?: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const headers = new HttpHeaders({
        // 'Content-Type': '',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      });
      const httpOptions = {
        headers: headers,
        // params: new HttpParams().set('lang', localStorage.getItem('lang'))
      };
      this.http.put(`${this.url}${inUrl}`, query, httpOptions).subscribe((response: any) => {
        resolve(response);
      }, (fail: HttpErrorResponse) => {
        this.logout(fail);
        reject(fail);
      });
    });
  }

  /**
   * Función para cerrar sesión cuando el usuario no está correctamente logeado.
   */
  private logout(fail: HttpErrorResponse) {
    if (fail.status !== 500) {
      if (fail.error === 'SERVER.NO_SESION') {
        this.attemptsFailed++;
        if (this.attemptsFailed >= 3) {
          // this.storage.logout();
          this.router.navigate([environment.MAIN_URL]);
        }
      }
    }
  }
  /**
   * @name postform
   * @description
   * Se envia una peticion `POST` a un servidor web y regresa los datos que son recuperados diseñada para archivos.
   *
   * @usage
   *
   * ```typescript
   * const query = {
   *  foo: foo,
   *  var: var
   * };
   * this.api.put(inUrl, query, 10000).then(
   * (success) => {
   *  console.log(success);
   * }, fail => {
   *  console.log(fail);
   * });
   * ```
   *
   * @param {string} inUrl url a donde hacer post.
   * @param {any} query Es la consulta a realizar.
   * @return {Promise<any>} Es la respuesta del servidor según la consulta que se realice.
   */
  public postForm(inUrl: string, query?: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const headers = new HttpHeaders({
        //'Content-Type': 'multipart/form-data',
        // 'Authorization': `Bearer ${localStorage.getItem('token')}`,
         //'Access-Control-Allow-Origin':'https://humedalapi.azurewebsites.net',
      
      });

      const httpOptions = {
        headers: headers,
       // 'Access-Control-Allow-Origin':'https://humedalapi.azurewebsites.net',
        // params: new HttpParams().set('lang', localStorage.getItem('lang'))
      };
      this.http.post(`${this.url}${inUrl}`, query, httpOptions).subscribe((response: any) => {
        resolve(response);
      }, (fail: HttpErrorResponse) => {
        this.logout(fail);
        reject(fail);
      });
    });
  }
  
}
