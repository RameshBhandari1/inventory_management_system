import { Component, OnInit } from '@angular/core';
import {ItemService} from "../item.service";
import {ItemModel} from "../../../models/item.model";
import {DataConstants} from "../../../core-modules/constants/data-constants";
import {Router} from "@angular/router";

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {
  itemList: Array<ItemModel> = new Array<ItemModel>();
  constructor(
    private itemService: ItemService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getItemList();
  }

  addItem() {
    this.router.navigate(['/home/add-item']);
  }

  editItem(item: any) {
    this.router.navigate(['/home/edit-item', item?.id]);
  }

  onDeleteRecord(id: any) {
    this.itemService.delete(id, DataConstants.ITEM, ItemModel).subscribe();
    this.getItemList();
  }

  private getItemList() {
    this.itemService.getAll(DataConstants.ITEM, ItemModel).subscribe(res => {
      this.itemList = res;
    });
  }
}
