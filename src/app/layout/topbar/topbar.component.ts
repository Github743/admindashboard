import { Component, OnInit } from '@angular/core';
import { AppService } from '../service/app.service';
import { ChangeLayoutService } from '../service/change-layout.service';

@Component({
    selector: 'app-topbar',
    templateUrl: './topbar.component.html',
    styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

    public isShowTopbar: boolean = true;
    constructor(public appService: AppService, changeLayoutService: ChangeLayoutService) {
        changeLayoutService.topbarChanged.subscribe((res: any) => this.isShowTopbar = res);
        changeLayoutService.showTopbar();
    }

    ngOnInit(): void {

    }

    public onConfigButtonClick(event: any) {
        this.appService.configActive = !this.appService.configActive;
        this.appService.configClick = true;
        event.preventDefault();
    }
}