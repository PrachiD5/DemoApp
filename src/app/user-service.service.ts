import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  apiUrl = 'http://localhost:3200/locations';  // Replace with your actual API endpoint
  apiState = 'http://localhost:3200/state';
  apiCoun = 'http://localhost:3200/country';

  constructor(private http: HttpClient) { }

  getLocations(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getStates(): Observable<any> {
    return this.http.get(this.apiState);
  }

  getCountries(): Observable<any> {
    return this.http.get(this.apiCoun);
  }


  apiUrl1 = 'http://localhost:3000/users'; 

getAddress(): Observable<any> {
    return this.http.get(`${this.apiUrl1}/address`);
  }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl1);
  }

  addUsers(task: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl1}/users`, task);
  }

  // updateTask(id: string, task: any): Observable<any> {
  //   return this.http.put<any>(`${this.apiUrl1}/${id}`, task);
  // }

  // deleteTask(id: string): Observable<any> {
  //   return this.http.delete<any>(`${this.apiUrl1}/${id}`);
  // }

  // searchTask(id:any){
  //   return this.http.get(`${this.apiUrl1}/${id}`);
  // }

//   uploadImage(name:string, file:File):Observable<any>{
// const formData = new FormData();
// formData.append("profileUrl",file);
// return this.http.post(base)
//   }

public uploadImage(image: File): Observable<any> {
  const formData = new FormData();

  formData.append('image', image);

  return this.http.post('http://localhost:3000/users', formData);
}
}
