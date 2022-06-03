import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service'; 
import { CONSTANTS } from '../../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(
    private api : ApiService
  ) { }


  getListStudents(){
    return this.api.get(CONSTANTS.GET_LIST_STUDENTS);
  }

  
}
