import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { TooltipPosition } from '@angular/material/tooltip';
import { FormControl } from '@angular/forms';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';
import { StudentService } from 'src/app/services/services';


export interface IStudent {
  ID: string;
  active: boolean,
  grades: number,
  Name: string,
  Gender: string,
  Class: string,
  Club: string,
  Persona: string,
  Crush: string,
  BreastSize: string,
  Strength: string,
  Color: string,
  Stockings: string,
  Accessory: string,
  ScheduleTime: string,
  ScheduleDestination: string,
  ScheduleAction: string
}

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.sass'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class StudentsComponent implements OnInit {


  //Setting tooltip
  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
  position = new FormControl(this.positionOptions[0]);

  rows : IStudent[] = [];

  displayedColumns: string[] = ['id', 'active','name','gender','class','club','person','crush','breastsize','strength','hairstyle','average'];
  dataSource: MatTableDataSource<IStudent>;

  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  expandedElement: IStudent | null;

  constructor(
    private router: Router,
    private studentServices: StudentService
  ) { }

  async ngOnInit(){
    await this.getListStudents();
  }

  getListStudents(){
    this.studentServices.getListStudents().then(response =>{
      console.log(response);
      let data = response.data;

      //Filtrar solo los que tengan el valor active TRUE
      const results = data.filter((item : any) => item.active == true);
      this.rows = results;
      this.dataSource = new MatTableDataSource(results);

    }).catch(er=>{
      console.log(er);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  logout(){
    this.router.navigate(['login']);
  }

}
