import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs';
import { BoardService } from 'src/app/services/board.service';
import { Board } from 'src/app/Types/types';

@Component({
  selector: 'app-create-edit',
  templateUrl: './create-edit.component.html',
  styleUrls: ['./create-edit.component.css']
})
export class CreateEditComponent implements OnInit {

  @Input() data : Board = {
    xDimension: 0,
    yDimension: 0,
    name: '',
    Tokens: []
  };
  @Output() closeEvent: EventEmitter<string> = new EventEmitter<string>();

  public boardForm: any;

  constructor(
    private formBuilder: FormBuilder,
    private boardService: BoardService
  ) { }

  ngOnInit(): void {
    this.boardForm = this.formBuilder.group({
      xDimension: [this.data.xDimension, Validators.required],
      yDimension: [this.data.yDimension, Validators.required],
      name: [this.data.name, Validators.required],
    })
  
    console.log(this.boardForm)
  }

  submit() {
    const board = {
      name: this.boardForm.controls['name'].value,
      xDimension: this.boardForm.controls['xDimension'].value,
      yDimension: this.boardForm.controls['yDimension'].value,
    }
    if (!!this.data._id) {
      this.boardService.updateBoard(this.data._id, board).pipe(first())
        .subscribe(board => {
          this.closeEvent.emit('Updated')
        })
    } else {
      this.boardService.createBoard(board).pipe(first())
      .subscribe(board => {
        this.closeEvent.emit('Created!');
        console.log(board)
      })
    }
  }

  cancel() {
    this.closeEvent.emit('Cancel')
  }
}
