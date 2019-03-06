import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

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
  }

  login() {
    let loginrx = this.http.get(`http://${this.serverurl}/?c=api&a=user_get_token&email=${this.username}&password=${this.password}`);

    loginrx.subscribe((data) => {
      this.errormessages = [];
      if (data["err_code"] == "0") {
        
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

  private adderror(error: string) {
    this.errormessages.push(error);
  }
}
