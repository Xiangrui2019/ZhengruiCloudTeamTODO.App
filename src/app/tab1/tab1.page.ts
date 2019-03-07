import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  public ncompletetodo = [];
  public completetodo = [];

  constructor(private router: Router,
    private http: HttpClient) { }

  ngOnInit() {
    if (localStorage.getItem("islogin") != "true" || localStorage.getItem("token") == null) {
      this.router.navigate(["/login"]);
    }
    this.http.get(`http://${localStorage.getItem("serverurl")}/?c=api&a=todo_list&token=${localStorage.getItem("token")}`).subscribe((data) => {
      data["data"].forEach(element => {
        if (element["status"] == "1") {
          this.ncompletetodo.push(element);
        } else {
          this.completetodo.push(element);
        }
      });
      console.log(this.completetodo);
      console.log(this.ncompletetodo);
    }, (error) => {
      alert("出现了未知错误, 无法获取TODOS");
    });
  }

  complate(tid: string) {
    this.http.get(`http://${localStorage.getItem("serverurl")}/?c=api&a=todo_done&token=${localStorage.getItem("token")}&tid=${tid}`).subscribe((d) => {
      location.reload();
    });
  }

  uncomplate(tid: string) {
    this.http.get(`http://${localStorage.getItem("serverurl")}/?c=api&a=todo_reopen&token=${localStorage.getItem("token")}&tid=${tid}`).subscribe((d) => {
      location.reload();
    });
  }
}