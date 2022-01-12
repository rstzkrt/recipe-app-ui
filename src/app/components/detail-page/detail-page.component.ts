import { Component, OnInit } from '@angular/core';
import {Recipe} from "../../common/recipe";
import {ActivatedRoute, Router} from "@angular/router";
import {RecipeServiceService} from "../../services/recipe-service.service";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AddRecipeComponent} from "../add-recipe/add-recipe.component";
import {UpdateRecipeComponent} from "../update-recipe/update-recipe.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.css']
})
export class DetailPageComponent implements OnInit {

  recipe:Recipe=new Recipe();
  recipeId:string;
  constructor(private recipeService:RecipeServiceService,
              private route:ActivatedRoute,public afAuth:AngularFireAuth,private router:Router,public dialog:MatDialog) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(()=>{
      this.recipeDetail();
      this.recipeId=this.route.snapshot.paramMap.get('id');
    })
  }

  recipeDetail(){
    const recipeId:string=this.route.snapshot.paramMap.get('id');
    this.recipeService.getRecipeById(recipeId).subscribe(
      data=>{
        this.recipe=data;
      }
    )
  }

  onDelete(){
    const recipeId:string=this.route.snapshot.paramMap.get('id');
    this.recipeService.getToken().then((token) => {
      this.recipeService.deleteRecipe(recipeId, token).subscribe(res => {
        this.router.navigateByUrl(`/recipe`)
      }, error => {
        console.error(error)
      });
    })
  }


  onUpdate() {
    // this.dialog.open(UpdateRecipeComponent);
    this.router.navigateByUrl(`/recipe-update/${this.recipeId}/`)
  }
}
