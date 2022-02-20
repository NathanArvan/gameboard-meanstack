import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { first } from 'rxjs';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {

  @Input() public xDimension = 10; 
  @Input() public yDimension = 10; 
  private boards = new Array();

  // public columns: any[] = [];
  // public rows: any[] = [];
  public columns: any[] = [];
  public rows: any[] = [];
  public loading = true;

  constructor(
    private client: HttpClient
  ) { }

  ngOnInit(): void {
    this.drawGrid();
    this.loading = false;
    this.client.get('http://localhost:3000/boards').pipe(first())
      .subscribe(boards => {
        console.log(boards)
        //this.boards = boards
      })
  }

  drawGrid() {
    this.rows = new Array(this.xDimension)
    this.columns = new Array(this.yDimension);
  }

}
