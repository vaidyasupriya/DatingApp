import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from '../_services/User.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PaginatedResult } from '../_models/pagination';
import { Message } from '../_models/Message';
import { AuthService } from '../_services/auth.service';

@Injectable()
export class MessagesResolver implements Resolve<PaginatedResult<Message[]>> {
  pageNumber = 1;
  pageSize = 5;
  messageContainer = 'Unread';

  constructor(private userService: UserService,
              private router: Router,
              private alertify: AlertifyService,
              private authService: AuthService) {}

     resolve(route: ActivatedRouteSnapshot): Observable<PaginatedResult<Message[]>> {
       return this.userService.getMessages(this.authService.decodedToken.nameid,
        this.pageNumber,
        this.pageSize,
        this.messageContainer).pipe(
         catchError(error => {
           this.alertify.error('Problem retrieveing messages');
           this.router.navigate(['/home']);
           return of(null);
         })
       );
     }
}
