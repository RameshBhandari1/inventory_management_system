import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ItemService} from "../item.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {

  itemForm: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private itemService: ItemService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  saveItem() {
    this.itemService.save(this.itemForm?.value).subscribe((res) => {
      alert(res?.msg);
      if (res.success) {
        this.router.navigate(['/home/item-list']);
      }
    });
  }

  private buildForm() {
    this.itemForm = this.formBuilder.group({
      name: [undefined],
      category: [undefined],
      price: [undefined],
      quantity: [undefined],
      description: [undefined]
    });
  }

  back() {
    this.router.navigate(['/home/item-list']);
  }
}
