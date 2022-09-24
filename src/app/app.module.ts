import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {APP_ID, Inject, NgModule, Optional, PLATFORM_ID} from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';

import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';
import { FixedPluginModule} from './shared/fixedplugin/fixedplugin.module';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import {WidgetComponent} from './pages/widget/widget.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginComponent} from './pages/login/login.component';
import {UserCreateComponent} from './pages/user-create/user-create.component';
import {BrowserModule, makeStateKey, TransferState} from '@angular/platform-browser';
import {isPlatformBrowser} from '@angular/common';
import {environment} from '../environments/environment';
import {StaticConfig} from './app-static-config';
import {GlobalVariable} from './app-core-module/global-variable';
import {ClientApiService} from './api-services';
import {GuardService, HttpService, LocalStorageService} from './app-core-module/services';
import {HttpClientModule} from '@angular/common/http';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {UserComponent} from './pages/user/user.component';
import {SalesDetailsComponent} from './pages/sales-details/sales-details.component';
import {ProductAddComponent} from './pages/product-add/product-add.component';
import {StaffComponent} from './pages/staff/staff.component';
import {RoleCreateComponent} from './pages/role-create/role-create.component';
import {EmailMarkComponent} from './pages/email-mark/email-mark.component';
import {AdminDetailsComponent} from './pages/admin-details/admin-details.component';
import {StockDetailsComponent} from './pages/stock-details/stock-details.component';
import {OrderDetailsComponent} from './pages/order-details/order-details.component';
import {ProductsComponent} from './pages/products/products.component';
import {RolesComponent} from './pages/roles/roles.component';
import * as echarts from 'echarts';
import { NgxEchartsModule } from 'ngx-echarts';
import {RegisterComponent} from './pages/register/register.component';
import {AnalyticalComponent} from './pages/analytical/analytical.component';

const WEB_APP_CONFIG_KEY = makeStateKey<string>('WEB_APP_CONFIG_KEY');

@NgModule({
  declarations: [
    AppComponent, LoginComponent, RegisterComponent, UserCreateComponent, SalesDetailsComponent, ProductAddComponent, RolesComponent,
    AdminLayoutComponent, ProductsComponent, OrderDetailsComponent, StockDetailsComponent, WidgetComponent,
    AdminDetailsComponent, StaffComponent, RoleCreateComponent, EmailMarkComponent, AnalyticalComponent  // DashboardComponent, UserComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'web-app-name' }),
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes, {
      useHash: true
    }),
    HttpClientModule,
    SidebarModule,
    FormsModule,
    ReactiveFormsModule,
    NavbarModule,
    NgbModule,
    ToastrModule.forRoot(),
    FooterModule,
    FixedPluginModule,
    // NgxEchartsModule,
    NgxEchartsModule.forRoot({
      // echarts
      echarts: () => import('echarts'),
    }),
  ],
  providers: [GlobalVariable, ClientApiService, HttpService, GuardService, LocalStorageService ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    @Optional() @Inject('__WEB_APP_CONFIG__') protected __WEB_APP_CONFIG__: any,
    @Inject(PLATFORM_ID) platformId: object,
    @Inject(APP_ID) appId: string,
    private tState: TransferState,
    // private translate: TranslateService,
    private gv: GlobalVariable) {
    this.gv.platformBrowser = isPlatformBrowser(platformId);
    const platform = this.gv.platformBrowser ? 'in the browser' : 'on the server';
    console.log(`Running ${platform} with appId = ${appId}`);

    if (!this.gv.platformBrowser) {
      this.gv.webAppConfig = __WEB_APP_CONFIG__;
      this.tState.set(WEB_APP_CONFIG_KEY, __WEB_APP_CONFIG__);
    } else {
      if (this.tState.hasKey(WEB_APP_CONFIG_KEY)) {
        // We are in the browser
        const WEB_APP_CONFIG = this.tState.get(WEB_APP_CONFIG_KEY, null);
        this.tState.remove(WEB_APP_CONFIG_KEY);
        this.gv.webAppConfig = WEB_APP_CONFIG || {};
      } else {
        // development environment
        this.gv.webAppConfig = environment.webAppConfig;
      }
    }

    this.gv.language = StaticConfig.lanMap[this.gv.webAppConfig.LANGUAGE || 'en'];

    /*translate.addLangs(StaticConfig.lanCodeList || []);
    translate.setDefaultLang('en');
    this.translate.use(this.gv.language.lanKey || 'en');*/

    if (this.gv.platformBrowser) {
      document.documentElement.lang = this.gv.language.lanKey || 'en';
      document.documentElement.dir = this.gv.language.dir || 'ltr';
    }
  }
}
