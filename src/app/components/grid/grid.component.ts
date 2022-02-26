import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { BoardService } from 'src/app/services/board.service';
import { Board } from 'src/app/Types/types';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {

  @Input() public xDimension = 10; 
  @Input() public yDimension = 10; 
  public boards = new Array<Board>();
  public selectedBoard!: Board;

  public columns: any[] = [];
  public rows: any[] = [];
  public loading = true;
  public showCreate = false;
  public showEdit = false;
  public showList = false;

  constructor(
    private boardService: BoardService
  ) { }

  ngOnInit(): void {
    this.drawGrid();
    this.loading = false;
    this.boardService.getBoards().subscribe((result: Board[]) => {
      this.boards = result;
    }, error => {
      console.log('error:', error)
    })
  }

  drawGrid() {
    this.rows = new Array(this.xDimension)
    this.columns = new Array(this.yDimension);
  }

  selectBoard(board: Board) {
    this.selectedBoard=board;
    this.xDimension = board.xDimension;
    this.yDimension = board.yDimension;
    this.drawGrid();
  }

  deleteBoard() {
    this.boardService.deleteBoard(this.selectedBoard._id as string).pipe(first())
      .subscribe(result => console.log(result));
  }

  onClose(event: string) {
    console.log(event)
    this.showCreate = false;
    this.showEdit = false;
  }

}
