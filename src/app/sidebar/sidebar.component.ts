import { Component, OnInit } from '@angular/core';


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    child: any;
}

export const ROUTES: RouteInfo[] = [
    { path: '/dashboard',     title: 'Dashboard', icon: 'nc-bank', class: '', child: [] }, /*active-pro*/
    { path: '/icons', title: 'All Users', icon: 'nc-diamond', class: '', child: [] },
    { path: '/products', title: 'Products', icon: 'nc-diamond', class: '', child: [] },
    { path: '/maps', title: 'Sales & Marketing',     icon: 'nc-pin-3',      class: '', child: [] },
    { path: '/my-team', title: 'My Team',     icon: 'nc-pin-3',      class: '', child: [] },
    { path: '/my-orders', title: 'My Orders',     icon: 'nc-pin-3',      class: '', child: [] },
    { path: '/my-commission', title: 'My Commission',     icon: 'nc-pin-3',      class: '', child: [] },
    { path: '/analytical', title: 'Analytical',     icon: 'nc-pin-3',      class: '', child: [] },
    { path: '/my-address', title: 'My Address',     icon: 'nc-pin-3',      class: '', child: [] },
    { path: '/account-details', title: 'Account Details',     icon: 'nc-pin-3',      class: '', child: [] },
    { path: '/notifications', title: 'User Reports',     icon: 'nc-bell-55',    class: '', child: [] },
    { path: '/user', title: 'Sales Reports',      icon: 'nc-single-02',  class: '', child:
        [{ path: '/order-details', title: 'Order Details',    icon: 'nc-spaceship',  class: ''},
          { path: '/sales-details', title: 'Sales Details',    icon: 'nc-spaceship',  class: ''},
          { path: '/stock-details', title: 'Stock Details',    icon: 'nc-spaceship',  class: ''}]},
    // { path: '/table', title: 'Office Reports', icon: 'nc-tile-56',    class: '', child: [] },
    // { path: '/typography',    title: 'User Profile', icon: 'nc-caps-small', class: '', child: [] },
    { path: '/admin-details', title: 'Admin Details',    icon: 'nc-spaceship',  class: '', child: [] },
    // { path: '/upgrade', title: 'Documentation',    icon: 'nc-spaceship',  class: '', child: [] },
    { path: '/email-marketing', title: 'Email Marketing',    icon: 'nc-spaceship',  class: '', child: [] },
    { path: '/roles', title: 'Roles',    icon: 'nc-spaceship',  class: '' , child: []},
    { path: '/hierachy', title: 'Roles',    icon: 'nc-spaceship',  class: '' , child: []},
    { path: '/staff', title: 'Staff',    icon: 'nc-spaceship',  class: '' , child: []},
    { path: '/user-create', title: 'Create User',    icon: 'nc-spaceship',  class: '', child: [] },
    { path: '/widget', title: 'Widget',    icon: 'nc-spaceship',  class: '', child: [] },
];

@Component({
    moduleId: module.id,
    selector: 'app-sidebar-cmp',
    templateUrl: 'sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    public shownGroup = null;

    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }

  toggleGroup(group) {
    if (this.isGroupShown(group)) {
      this.shownGroup = null;
    } else {
      this.shownGroup = group;
    }
  }

  isGroupShown(group) {
    return this.shownGroup === group;
  }
}
