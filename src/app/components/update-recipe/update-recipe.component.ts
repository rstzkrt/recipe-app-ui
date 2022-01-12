import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {RecipeServiceService} from "../../services/recipe-service.service";
import {AuthService} from "../../services/auth.service";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-update-recipe',
  templateUrl: './update-recipe.component.html',
  styleUrls: ['./update-recipe.component.css']
})
export class UpdateRecipeComponent implements OnInit {


  checkoutFormGroup:FormGroup;

  constructor(private userService:UserService,
              private recipeService:RecipeServiceService,
              private authService:AuthService,
              private afAuth:AngularFireAuth,
              private formBuilder:FormBuilder,
              private route:ActivatedRoute,
              public dialog: MatDialog,
              ) { }

  ngOnInit(): void {
    this.checkoutFormGroup=this.formBuilder.group({
      recipe:this.formBuilder.group({
        recipeName:[''],
        preparationDescription:[''],
        photoUrl:[''],
        ingredients:['']
      })
    })
  }

  onClick() {
    this.dialog.closeAll()
  }

  onSubmit() {
    let recipe = this.checkoutFormGroup.get('recipe').value;
    recipe.postedBy =this.authService.currentUser._id;
     let recipeId=this.route.snapshot.paramMap.get('id');

    console.log("recipe id "+  recipeId)

    this.recipeService.getToken().then((token) => {
      this.recipeService.updateRecipe(recipe, token,recipeId).subscribe(res => {
        console.log(res)
        this.dialog.closeAll()
        window.location.reload();
      }, error => {
        console.error(error)
      });
    })
  }
}
