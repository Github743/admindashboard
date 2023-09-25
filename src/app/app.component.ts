import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, OnInit, Renderer2 } from '@angular/core';
import { AppService } from './layout/service/app.service';
import { ConfigService } from './layout/service/app.config.service';
import { PrimeNGConfig } from 'primeng/api';
import { ChangeLayoutService } from './layout/service/change-layout.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnInit {

  public isShowSidebar: boolean = false;
  public isOutletWidth: boolean = true;
  public theme: string | undefined;
  //public documentClickListener: () => void;

  constructor(
    private primengConfig: PrimeNGConfig,
    public renderer: Renderer2,
    public configService: ConfigService,
    public appService: AppService,
    public changeLayoutService: ChangeLayoutService
  ) {
    changeLayoutService.sidebarChanged.subscribe((res: any) => this.isShowSidebar = res);
    changeLayoutService.outletChanged.subscribe((res: any) => this.isOutletWidth = res);
    changeLayoutService.showSidebar();

    changeLayoutService.outletNotChange();
  }

  ngOnInit() {
    this.primengConfig.ripple = true;
    document.documentElement.style.fontSize = '14px';
    this.appService.config = this.configService.config;
  }

  ngAfterViewInit() {
    // hides the overlay menu and top menu if outside is clicked
    this.renderer.listen('body', 'click', (event) => {
      if (!this.appService.isDesktop()) {
        if (!this.appService.menuClick) {
          this.appService.menuActiveMobile = false;
        }

        if (!this.appService.topMenuButtonClick) {
          this.appService.hideTopMenu();
        }
      }
      else {
        if (!this.appService.menuClick && this.appService.isOverlay()) {
          this.appService.menuInactiveDesktop = true;
        }
        if (!this.appService.menuClick) {
          this.appService.overlayMenuActive = false;
        }
      }

      if (this.appService.configActive && !this.appService.configClick) {
        this.appService.configActive = false;
      }

      this.appService.configClick = false;
      this.appService.menuClick = false;
      this.appService.topMenuButtonClick = false;
    });
  }
}
