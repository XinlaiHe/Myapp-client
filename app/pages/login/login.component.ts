import {Component, ElementRef, OnInit, ViewChild} from "angular2/core";
import {User} from "../../shared/user/user";
import {UserService} from "../../shared/user/user.service";
import {Router} from "angular2/router";
import {Page} from "ui/page";
import {Color} from "color";
import {View} from "ui/core/view";

@Component({
  selector: "my-app",
  templateUrl: "pages/login/login.html",
  providers: [UserService],
  styleUrls: ["pages/login/login-common.css", "pages/login/login.css"]
})
export class LoginPage implements OnInit {

  //email = "nativescriptrocks@telerik.com";
  user: User;
  isLoggedIn = true;

  @ViewChild("container") container: ElementRef;

  constructor(private _router: Router, private _userService: UserService, private page: Page) {
    this.user = new User();
  }
  submit() {
    if (!this.user.isValidEmail()) {
      alert("Enter a valid email address.");
      return;
    }
    if (this.isLoggedIn) {
      this.login();
    } else {
      this.signUp();
    }
  }
  toggleDisplay() {
    this.isLoggedIn = !this.isLoggedIn;
    let container = <View>this.container.nativeElement;
    container.animate({
      backgroundColor: this.isLoggedIn ? new Color("white") : new Color("orange"),
      duration: 200
    });
  }
  login() {
    this._userService.login(this.user)
      .subscribe(
      () => this._router.navigate(["List"]),
      (error) => alert("Unfortunately we could not find your account.")
      );
  }
  signUp() {
    this._userService.register(this.user)
      .subscribe(
      () => {
        alert("Your account was successfully created.");
        this.toggleDisplay();
      },
      () => alert("Unfortunately we were unable to create your account.")
      );
  }
  ngOnInit() {
    this.user.email = 'hexinlai1991@gmail.com';
    this.user.password = '1991923';
    this.page.actionBarHidden = true;
    this.page.backgroundImage = this.page.ios ? "res://bg_login.jpg" : "res://bg_login";
  }
}