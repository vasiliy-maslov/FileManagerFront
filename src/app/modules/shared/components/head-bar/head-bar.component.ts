import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../../../models/user';
import {UserService} from '../../services/user.service';
import {HandlersService} from '../../services/handlers.service';
import {IResponce} from '../../../../models/responce';

@Component({
  selector: 'app-head-bar',
  templateUrl: './head-bar.component.html',
  styleUrls: ['./head-bar.component.scss']
})
export class HeadBarComponent implements OnInit {

   user: User;

  constructor(public authService: AuthService,
              private userService: UserService,
              private handlers: HandlersService) { }

  ngOnInit() {
    this.getUser();
  }

  getUser(): void {
    if (this.authService.accessToken) {
      this.userService.getUserById(this.authService.accessToken.unique_name)
        .subscribe(
          (res: IResponce) => {
            if (res) {
              this.user = res.data;
            }
          },
          (err) => this.handlers.handleError(err)
        );
    }
  }

}
