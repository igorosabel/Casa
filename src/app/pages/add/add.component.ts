import { Component, OnInit } from '@angular/core';
import { Message } from 'src/app/model/message.model';

@Component({
	selector: 'app-add',
	templateUrl: './add.component.html',
	styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
	message: Message = new Message();
	addSending: boolean = false;

	constructor() {}
	ngOnInit(): void {}

	doAdd(ev: MouseEvent): void {

	}
}
