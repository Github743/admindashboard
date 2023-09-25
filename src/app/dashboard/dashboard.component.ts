import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../layout/service/app.config.service';
import { AppConfig } from '../interfaces/appconfig.interface';
import { ChangeLayoutService } from '../layout/service/change-layout.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})

export class DashboardComponent implements OnInit {

    public config: AppConfig | undefined;

    constructor(public configService: ConfigService, public changeLayoutService: ChangeLayoutService) {
        this.changeLayoutService.showSidebar();
        this.changeLayoutService.showTopbar();
        this.changeLayoutService.outletNotChange();
    }

    ngOnInit() {
        this.config = this.configService.config;
        this.configService.configUpdate$.subscribe(
            (config) => {
                this.config = config;
            }
        );
    }

}