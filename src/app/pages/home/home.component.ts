import { NgStyle } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatFabButton, MatIconButton } from '@angular/material/button';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
} from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import {
  MatListItem,
  MatListItemIcon,
  MatNavList,
} from '@angular/material/list';
import {
  MatSidenav,
  MatSidenavContainer,
  MatSidenavContent,
} from '@angular/material/sidenav';
import { MatToolbar, MatToolbarRow } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import { MessagesResult } from '@interfaces/message.interfaces';
import Message from '@model/message.model';
import ApiService from '@services/api.service';
import ClassMapperService from '@services/class-mapper.service';
import UserService from '@services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [
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
    MatCard,
    MatCardContent,
    MatCardActions,
    MatIconButton,
    MatFabButton,
  ],
})
export default class HomeComponent implements OnInit {
  private us: UserService = inject(UserService);
  private as: ApiService = inject(ApiService);
  private cms: ClassMapperService = inject(ClassMapperService);
  private router: Router = inject(Router);

  name: string | null = '';
  opened: boolean = false;

  selectedType: number = -1;
  allMessages: Message[] = [];
  messages: Message[] = [];

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
