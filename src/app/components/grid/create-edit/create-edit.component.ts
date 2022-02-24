import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs';
import { BoardService } from 'src/app/services/board.service';
import { EventEmitter } from 'stream';

@Component({
  selector: 'app-create-edit',
  templateUrl: './create-edit.component.html',
  styleUrls: ['./create-edit.component.css']
})
export class CreateEditComponent implements OnInit {

  @Input() data = null;
  @Output() closeEvent: EventEmitter = new EventEmitter();

  public boardForm = this.formBuilder.group({
    xDimension: [0, Validators.required],
    yDimension: [0, Validators.required],
    name: ['', Validators.required],
  })

  constructor(
    private formBuilder: FormBuilder,
    private boardService: BoardService
  ) { }

  ngOnInit(): void {
  }

  submit() {
    const board = {
      name: this.boardForm.controls['name'].value,
      xDimension: this.boardForm.controls['xDimension'].value,
      yDimension: this.boardForm.controls['yDimension'].value,
    }
    this.boardService.createBoard(board).pipe(first())
      .subscribe(board => {
        this.closeEvent.emit('Created!');
        console.log(board)
      })
  }

  cancel() {
    this.closeEvent.emit('Cancel')
  }
}
