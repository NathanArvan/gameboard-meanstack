import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {

  @Input() xDimension = 10; 
  @Input() yDimension = 10; 

  // public columns: any[] = [];
  // public rows: any[] = [];
  public columns = [1,2,3,4,5,6,7,8,9,10];
  public rows = [1,2,3,4,5,6,7,8,9,10];
  public loading = true;

  constructor() { }

  ngOnInit(): void {
    // for (let i =0; i > this.xDimension; i++) {
    //   this.columns = [...this.columns, {test: 'dummyData'}]
    // }
    // for (let i =0; i > this.yDimension; i++) {
    //   this.rows = [...this.rows, {test: 'dummyData'}]
    // }
    console.log(this.columns, this.rows)
    this.loading = false;
  }

}
