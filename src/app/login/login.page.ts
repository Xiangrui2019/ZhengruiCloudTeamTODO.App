import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { $ } from 'jquery';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public serverurl: string;
  public username: string;
  public password: string;
  public errormessages: any = [];

  constructor(private router: Router,
    private http: HttpClient) { }

  ngOnInit() {
    if (localStorage.getItem("islogin") == "true" &&
      localStorage.getItem("token") != null &&
      localStorage.getItem("uid") != null &&
      localStorage.getItem("serverurl") != null) {
      this.router.navigate(["/"]);
    }

    if (localStorage.getItem("serverurl") != null){
      this.serverurl = localStorage.getItem("serverurl");
    }
  }

  login() {
    let loginrx = this.http.get(`http://${this.serverurl}/?c=api&a=user_get_token&email=${this.username}&password=${this.password}`);

    loginrx.subscribe((data) => {
      this.errormessages = [];
      if (data["err_code"] == "0") {
        this.save(data);
        this.router.navigate(["/"]);
      } else {
        if (data["err_code"] == 10001) {
          this.adderror("您的用户名或密码出现错误!");
        }

        if (data["err_code"] != 10001) {
          this.adderror("出现了未知错误!");
        }
      }
    }, (error) => {
      this.adderror("出现了未知错误, 可能是服务器或者跨域问题!");
    });
  }
  private save(data: Object) {
    localStorage.setItem("serverurl", `${this.serverurl}`);
    localStorage.setItem("token", data["data"]["token"]);
    localStorage.setItem("uid", data["data"]["uid"]);
    localStorage.setItem("uname", data["data"]["uname"]);
    localStorage.setItem("email", data["data"]["email"]);
    localStorage.setItem("level", data["data"]["level"]);
    localStorage.setItem("islogin", "true");
    this.username = "";
    this.password = "";
  }

  private adderror(error: string) {
    this.errormessages.push(error);
  }
}
