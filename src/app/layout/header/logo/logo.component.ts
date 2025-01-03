import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LogoComponent implements OnInit{

  @Input() logoSrc: string;
  @Input() sirketLogoSrc: string;

  ngOnInit() {
  }
}
