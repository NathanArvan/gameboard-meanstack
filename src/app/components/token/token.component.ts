import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.css']
})
export class TokenComponent implements OnInit {

  @Input() name ='';
  @Input() image = '';

  constructor() { }

  ngOnInit(): void {
  }

}
