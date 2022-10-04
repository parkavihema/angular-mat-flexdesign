import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }


  getAllEmployees(url: any) {
    return this.http.get(url);
  }

  getEmployeeById(url: any) {
    return this.http.get(url);
  }

  createEmployee(url: any, data: any) {
    return this.http.post(url, data);
  }

  updateEmployee(url: any, data: any) {
    return this.http.put(url, data);
  }

  deleteEmployee(url: any) {
    return this.http.delete(url);
  }

}
