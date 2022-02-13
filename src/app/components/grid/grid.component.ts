import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {

  @Input() public xDimension = 10; 
  @Input() public yDimension = 10; 

  // public columns: any[] = [];
  // public rows: any[] = [];
  public columns: any[] = [];
  public rows: any[] = [];
  public loading = true;

  constructor() { }

  ngOnInit(): void {
    this.drawGrid();
    this.loading = false;
  }

  drawGrid() {
    this.rows = new Array(this.xDimension)
    this.columns = new Array(this.yDimension);
  }

}
