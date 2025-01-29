import { Injectable } from '@angular/core';
import { Development } from '../environments/development';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
  deps: [HttpClient]
})
export class ApiService {

  constructor(private http: HttpClient) { }

  get_data(endpoint: string){
    return this.http.get<any>(`${Development.api}/${endpoint}`);
  }

  post_data(endpoint: string, data: any){
    return this.http.post<any>(`${Development.api}/${endpoint}`, data);
  }

  patch_data(endpoint: string, data: any){
    return this.http.patch<any>(`${Development.api}/${endpoint}`, data);
  }

  delete_data(endpoint: string){
    return this.http.delete<any>(`${Development.api}/${endpoint}`);
  }
}
