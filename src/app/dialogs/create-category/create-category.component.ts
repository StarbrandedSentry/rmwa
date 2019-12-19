import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/research.model';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss']
})
export class CreateCategoryComponent implements OnInit {
  categoryName: string;
  constructor(
    public dialogRef: MatDialogRef<CreateCategoryComponent>,
    public dialog: MatDialog,
    private catService: CategoryService
  ) {}

  ngOnInit() {}

  closeDialog() {
    this.dialogRef.close();
  }

  newCategory() {
    if (!this.categoryName) {
      return;
    }
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '320px',
      position: { top: '15%' },
      data: {
        title: 'Create',
        text: 'Are you sure you want to create this category?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      const category: Category = {
        name: this.categoryName
      };
      this.catService.createCategory(category);
      this.dialogRef.close();
    });
  }
}
