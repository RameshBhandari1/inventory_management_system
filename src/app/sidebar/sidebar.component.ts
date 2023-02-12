import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  navigationItems: Array<any> = [
    {
      title: 'Dashboard',
      link: '/home/dashboard',
    },
    {
      title: 'Role Management',
      link: '/home/role-list',
    },
    {
      title: 'User Management',
      link: '/home/user-list',
    },
    {
      title: 'Item Management',
      link: '/home/item-list',
    },
    {
      title: 'Sales Management',
      link: '/home/sales',
    },
  ];

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

}
