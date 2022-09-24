import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/user/user.component';
import { TableComponent } from '../../pages/table/table.component';
import { TypographyComponent } from '../../pages/typography/typography.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { NotificationsComponent } from '../../pages/notifications/notifications.component';
import { UpgradeComponent } from '../../pages/upgrade/upgrade.component';
import {ProductsComponent} from '../../pages/products/products.component';
import {OrderDetailsComponent} from '../../pages/order-details/order-details.component';
import {StockDetailsComponent} from '../../pages/stock-details/stock-details.component';
import {AdminDetailsComponent} from '../../pages/admin-details/admin-details.component';
import {EmailMarkComponent} from '../../pages/email-mark/email-mark.component';
import {RoleCreateComponent} from '../../pages/role-create/role-create.component';
import {StaffComponent} from '../../pages/staff/staff.component';
import {ProductAddComponent} from '../../pages/product-add/product-add.component';
import {SalesDetailsComponent} from '../../pages/sales-details/sales-details.component';
import {UserCreateComponent} from '../../pages/user-create/user-create.component';
import {WidgetComponent} from '../../pages/widget/widget.component';
import {LoginComponent} from '../../pages/login/login.component';
import {RolesComponent} from '../../pages/roles/roles.component';
import {MyOrdersComponent} from '../../pages/my-orders/my-orders.component';
import {AccountDetailsComponent} from '../../pages/account-details/account-details.component';
import {MyTeamComponent} from '../../pages/my-team/my-team.component';
import {MyAddressComponent} from '../../pages/my-address/my-address.component';
import {MyCommissionComponent} from '../../pages/my-commission/my-commission.component';
import {AnalyticalComponent} from '../../pages/analytical/analytical.component';
import {HierachyComponent} from '../../pages/hierachy/hierachy.component';


export const AdminLayoutRoutes: Routes = [
    /*{
      path: '',
      pathMatch: 'full',
      redirectTo: '/login'
    },*/
    { path: 'dashboard', component: DashboardComponent },
    { path: 'user', component: UserComponent },
    { path: 'table', component: TableComponent },
    { path: 'typography', component: TypographyComponent },
    { path: 'icons', component: IconsComponent },
    { path: 'maps', component: MapsComponent },
    { path: 'notifications', component: NotificationsComponent },
    { path: 'upgrade', component: UpgradeComponent },
    { path: 'products', component: ProductsComponent },
    { path: 'order-details', component: OrderDetailsComponent },
    { path: 'my-team', component: MyTeamComponent },
    { path: 'my-address', component: MyAddressComponent },
    { path: 'my-orders', component: MyOrdersComponent },
    { path: 'my-commission', component: MyCommissionComponent },
    { path: 'account-details', component: AccountDetailsComponent },
    { path: 'stock-details', component: StockDetailsComponent },
    { path: 'admin-details', component: AdminDetailsComponent },
    { path: 'email-marketing', component: EmailMarkComponent },
    { path: 'role-create', component: RoleCreateComponent },
    { path: 'roles', component: RolesComponent },
    { path: 'hierachy', component: HierachyComponent },
    { path: 'analytical', component: AnalyticalComponent },
    { path: 'staff', component: StaffComponent },
    { path: 'product-add', component: ProductAddComponent },
    { path: 'sales-details', component: SalesDetailsComponent },
    { path: 'user-create', component: UserCreateComponent },
    { path: 'widget', component: WidgetComponent }
];
