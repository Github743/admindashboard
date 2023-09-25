import { Component, OnInit } from '@angular/core';
import { AppConfig } from '../interfaces/appconfig.interface';
import { ConfigService } from './service/app.config.service';
import { PrimeNGConfig } from 'primeng/api';
import { AppService } from './service/app.service';

@Component({
    selector: 'app-config',
    templateUrl: './config.component.html',
    styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnInit {

    public scale: number = 14;
    public scales: any[] = [12, 13, 14, 15, 16];
    public config: AppConfig | undefined;

    constructor(
        public appService: AppService,
        public configService: ConfigService,
        public primengConfig: PrimeNGConfig,
    ) {

    }

    ngOnInit() {
        this.config = this.configService.config;
        this.configService.configUpdate$.subscribe(config => {
            this.config = config;
            this.primengConfig.ripple = true;
            this.scale = 14;

            this.applyScale();
        });
    }

    public onConfigButtonClick(event: any) {
        this.appService.configActive = !this.appService.configActive;
        this.appService.configClick = true;
        event.preventDefault();
    }

    public incrementScale() {
        this.scale++;
        this.applyScale();
    }

    public decrementScale() {
        this.scale--;
        this.applyScale();
    }

    public applyScale() {
        document.documentElement.style.fontSize = this.scale + 'px';
    }

    public changeTheme(theme: string, dark: boolean) {
        let themeElement = document.getElementById('theme-css');
        themeElement!.setAttribute('href', 'assets/theme/' + theme + '/theme.css');
        this.configService.updateConfig({ ...this.config, ...{ theme, dark } });
    }
}