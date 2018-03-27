import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CategoryService } from '../shared/category.service';
import { Category } from '../shared/category';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  categories: Category[];

  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getCategories();
  }

  private getCategories(): void {
    this.categoryService.getCategories()
    .subscribe(list => this.categories = list);
  }

}
