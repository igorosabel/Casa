import { NgClass, NgStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  MatButton,
  MatFabButton,
  MatIconButton,
} from '@angular/material/button';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
} from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import {
  MatListItem,
  MatListItemIcon,
  MatListItemLine,
  MatNavList,
} from '@angular/material/list';
import {
  MatSidenav,
  MatSidenavContainer,
  MatSidenavContent,
} from '@angular/material/sidenav';
import { MatToolbar, MatToolbarRow } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import { MessagesResult } from 'src/app/interfaces/message.interfaces';
import { Message } from 'src/app/model/message.model';
import { ApiService } from 'src/app/services/api.service';
import { ClassMapperService } from 'src/app/services/class-mapper.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [
    NgClass,
    NgStyle,
    RouterModule,
    MatSidenavContainer,
    MatSidenav,
    MatSidenavContent,
    MatToolbar,
    MatToolbarRow,
    MatNavList,
    MatListItem,
    MatIcon,
    MatListItemIcon,
    MatListItemLine,
    MatCard,
    MatCardContent,
    MatCardActions,
    MatButton,
    MatIconButton,
    MatFabButton,
  ],
})
export default class HomeComponent implements OnInit {
  name: string = '';
  opened: boolean = false;

  selectedType: number = -1;
  allMessages: Message[] = [];
  messages: Message[] = [];

  constructor(
    private us: UserService,
    private as: ApiService,
    private cms: ClassMapperService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.name = this.us.user.name;
    this.as.getMessages().subscribe((result: MessagesResult): void => {
      if (result.status === 'ok') {
        this.allMessages = this.cms.getMessages(result.list);
        this.messages = this.cms.getMessages(result.list);
      } else {
        alert(
          '¡Ocurrió un error! Vuelve a intentarlo en unos minutos por favor.'
        );
      }
    });
  }

  toggleSidenav(): void {
    this.opened = !this.opened;
  }

  logout(ev: MouseEvent): void {
    ev.preventDefault();
    this.us.logout();
    this.router.navigate(['/']);
  }

  goToMessage(message: Message): void {
    this.router.navigate(['/message', message.id]);
  }

  selectList(type: number, ev: MouseEvent): void {
    ev && ev.preventDefault();
    this.selectedType = type;
    this.messages = this.allMessages.filter(
      (x: Message): boolean => x.type != type
    );
    this.toggleSidenav();
  }
}
