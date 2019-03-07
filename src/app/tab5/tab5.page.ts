import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit {

  public username: string = localStorage.getItem("uname");

  constructor(private router: Router) {  }

  ngOnInit() {
    if (localStorage.getItem("islogin") != "true" || localStorage.getItem("token") == null) {
      this.router.navigate(["/login"]);
    }
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("uid");
    localStorage.removeItem("uname");
    localStorage.removeItem("email");
    localStorage.removeItem("level");
    localStorage.setItem("islogin", "false");
    this.router.navigate(["/login"]);
  }
}
