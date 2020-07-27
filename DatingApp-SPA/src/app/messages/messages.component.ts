import { Component, OnInit } from '@angular/core';
import { Message } from '../_models/Message';
import { Pagination, PaginatedResult } from '../_models/pagination';
import { UserService } from '../_services/User.service';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  messages: Message[];
  pagination: Pagination;
  messageContainer = 'Unread';

  constructor(private userService: UserService,
              private authSerive: AuthService,
              private route: ActivatedRoute,
              private alertify: AlertifyService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.messages = data['messages'].result;
      this.pagination = data['messages'].pagination;
    });
    this.loadMessages();
  }

  loadMessages() {
    this.userService.getMessages(this.authSerive.decodedToken.nameid,
     this.pagination.currentPage,
     this.pagination.itemsPerPage,
     this.messageContainer)
     .subscribe(( res: PaginatedResult<Message[]>) => {
       this.messages = res.result;
       this.pagination = res.pagination;
     }, error => {
       this.alertify.error(error);
     });
  }

  deleteMessage(id: number) {
    this.alertify.confirm('Are you sure you want to delete the message', () => {
      this.userService.deleteMessage(id, this.authSerive.decodedToken.nameid).subscribe(() => {
        this.messages.splice(this.messages.findIndex(m => m.id === id), 1);
        this.alertify.success('The message has been deleted');
      }, error => {
        this.alertify.error('Failed to delete the message');
      });
    });
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadMessages();
  }

}
