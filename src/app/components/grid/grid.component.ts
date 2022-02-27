import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { BoardService } from 'src/app/services/board.service';
import { Board } from 'src/app/Types/types';

export interface BoardToken {
  name: string,
  image: string,
  x: number,
  y: number
}


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
  public tokens: BoardToken[] = [
    {name: 'Hezrou.jpeg', image: 'http://localhost:3000/public/hezrou.jpeg', x: 2 , y: 3},
    {name: 'robed woman.jpg', image: 'http://localhost:3000/public/robed-woman.jpg', x: 4 , y: 4},
    {name: 'Orryn Folkor.jpg', image: 'http://localhost:3000/public/orryn-folkor.jpg', x: 6 , y: 1},
  ]

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

  tokenInCell(x : number, y: number): boolean {
    const test = this.tokens.findIndex(token => {
      //console.log(token, x , y)
      return token.x === x && token.y === y;
    })
    return test > -1;
  }

  getTokenImage(x : number, y: number) {
    const token = this.tokens.find(token => {
      return token.x === x && token.y === y;
    })
    if (!!token?.image) {
      return token?.image;
    } else {
      return '';
    }
    
  }

}
