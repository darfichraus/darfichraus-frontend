import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'img-prev',
  templateUrl: './img-prev.component.html',
  styleUrls: ['./img-prev.component.scss']
})
export class ImgPrevComponent implements OnInit {

  @Input() url: string;

  constructor() { }

  ngOnInit(): void {
  }

}
