import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { MatDialog } from '@angular/material/dialog';
import { EditDialogComponent } from '../../dialogs/edit-dialog/edit-dialog.component';
import { CreateCategoryComponent } from '../../dialogs/create-category/create-category.component';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-sadmin-configure',
  templateUrl: './sadmin-configure.component.html',
  styleUrls: ['./sadmin-configure.component.scss']
})
export class SadminConfigureComponent implements OnInit {
  // categories: Category[];
  newCategoryName: string;
  constructor(private catService: CategoryService, public dialog: MatDialog) {}

  ngOnInit() {}

  openEditDialog(id: string): void {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '320px',
      position: { top: '10%' },
      data: {
        id: id,
        text: 'Enter new name for category.',
        purpose: 'Category name'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      this.catService.editCategory(result, id);
    });
  }

  openCreateCategoryDialog() {
    const dialogRef = this.dialog.open(CreateCategoryComponent, {
      width: '700px',
      position: { top: '10%' },
      disableClose: true
    });
  }

  openConfirmDialog(id: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '320px',
      position: { top: '10%' },
      data: {
        title: 'Remove',
        text: 'Are you sure you want to delete this category?'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      this.catService.deleteCategory(id);
    });
  }
}
