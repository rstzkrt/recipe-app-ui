import { Component, OnInit } from '@angular/core';
import {Recipe} from "../../common/recipe";
import {ActivatedRoute, Router} from "@angular/router";
import {RecipeServiceService} from "../../services/recipe-service.service";

import {AngularFireAuth} from "@angular/fire/compat/auth";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[];

  constructor(private recipeService: RecipeServiceService,
              private route:ActivatedRoute,public afAuth:AngularFireAuth,private router:Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(()=>{
      this.listRecipes();
    })
  }

  listRecipes() {
    this.recipeService.getRecipeList().subscribe(
      data => {

        // for (let i = 0; i < 4; i++) {
        //   data.push(data[0])//
        // }

        this.recipes = data;
      }
    )
  }

}
