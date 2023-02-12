import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ItemService} from "../item.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DataConstants} from "../../../core-modules/constants/data-constants";
import {ItemModel} from "../../../models/item.model";

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.scss']
})
export class EditItemComponent implements OnInit {
  itemForm: FormGroup = new FormGroup({});
  paramId: any;
  itemData: any;

  constructor(
    private formBuilder: FormBuilder,
    private itemService: ItemService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((res: any) => {
      this.paramId = res.id;
    });
    this.getDetails();
    this.buildForm(this.itemData);
  }

  private buildForm(data?: any) {
    this.itemForm = this.formBuilder.group({
      name: [data?.name],
      category: [data?.category],
      price: [data?.price],
      quantity: [data?.quantity],
      description: [data?.description],
      id: [data?.id]
    });
  }

  getDetails() {
    this.itemService.getById(this.paramId, DataConstants.ITEM, ItemModel).subscribe((res: any) => {
      this.itemData = res;
    })
  }

  saveItem() {
    this.itemService.editExistingDetails(DataConstants.ITEM, this.itemForm?.value, ItemModel).subscribe((res) => {
      alert(res?.msg);
      if (res.success) {
        this.router.navigate(['/home/item-list']);
      }
    });
  }

  back() {
    this.router.navigate(['/home/item-list']);
  }
}
