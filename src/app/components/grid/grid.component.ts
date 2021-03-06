import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { BoardService } from 'src/app/services/board.service';

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
    private client: HttpClient,
    private boardService: BoardService
  ) { }

  ngOnInit(): void {
    this.drawGrid();
    this.loading = false;
    this.boardService.getBoards().subscribe(result => {
      console.log(result)
    }, error => {
      console.log('error:', error)
    })
    // this.client.get('http://localhost:3000/boards').pipe(first())
    //   .subscribe(boards => {
    //     console.log(boards)
    //     //this.boards = boards
    //   })
  }

  drawGrid() {
    this.rows = new Array(this.xDimension)
    this.columns = new Array(this.yDimension);
  }

}
