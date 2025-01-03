import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OAuthService } from 'angular-oauth2-oidc';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-auth-demo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './auth-demo.component.html',
  styleUrl: './auth-demo.component.css'
})
export class AuthDemoComponent implements OnInit {

  private authService = inject(OAuthService);
  private httpClient = inject(HttpClient);

  ngOnInit(): void {

    this.httpClient.get("http://localhost:8282/userinfo").subscribe(auth => console.log(auth));


    this.httpClient.get('http://localhost:8181/check').subscribe(value => console.log(value));
    this.httpClient.get('http://localhost:8181/check2').subscribe(value => console.log(value));



  }


}
