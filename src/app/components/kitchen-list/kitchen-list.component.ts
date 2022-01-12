import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AddRecipeComponent} from "../add-recipe/add-recipe.component";
import {AddSmoothieComponent} from "../add-smoothie/add-smoothie.component";
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Component({
  selector: 'app-kitchen-list',
  templateUrl: './kitchen-list.component.html',
  styleUrls: ['./kitchen-list.component.css']
})
export class KitchenListComponent implements OnInit {

  constructor(public dialog: MatDialog,public afAuth:AngularFireAuth) { }

  ngOnInit(): void {
  }

  openRecipeDialog() {
    const dialogRef = this.dialog.open(AddRecipeComponent);

    dialogRef.afterClosed().subscribe(result => {

    });
  }
  openSmoothieDialog() {
    const dialogRef = this.dialog.open(AddSmoothieComponent);

    dialogRef.afterClosed().subscribe(result => {

    });
  }
}
