import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigService } from './service/app.config.service';
import { RouterModule } from '@angular/router';
import { ConfigComponent } from './config.component';
import { TopbarComponent } from './topbar/topbar.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
    declarations: [
        ConfigComponent,
        TopbarComponent,
        FooterComponent
    ],
    imports: [
        CommonModule,
        RouterModule
    ],
    providers: [
        ConfigService
    ],
    exports: [
        ConfigComponent,
        TopbarComponent,
        FooterComponent
    ]
})
export class LayoutModule { }