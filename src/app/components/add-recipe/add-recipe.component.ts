import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validator, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {RecipeServiceService} from "../../services/recipe-service.service";
import {User} from "../../common/user";
import {MatDialog, matDialogAnimations} from "@angular/material/dialog";


@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent implements OnInit {

  addRecipeGroup:FormGroup;
  submitted:boolean;

  constructor(private userService:UserService,
              private recipeService:RecipeServiceService,
              private authService:AuthService,
              private afAuth:AngularFireAuth,
              private formBuilder:FormBuilder,
              public dialog: MatDialog) {}


  ngOnInit(): void {

    this.addRecipeGroup=this.formBuilder.group({

      recipe:this.formBuilder.group({
        recipeName:new FormControl('',[Validators.required,Validators.minLength(3)]),
        preparationDescription:new FormControl('',[Validators.required,Validators.minLength(3)]),
        photoUrl:new FormControl('',[Validators.required,Validators.minLength(3)]),
        ingredients:['',Validators.required]
      })
    })
  }

  get f() { return this.addRecipeGroup.controls; }

  onSubmit() : void {

    this.submitted = true;


    if (this.addRecipeGroup.invalid) {
      alert("check your inputs again");
    }


    let recipe = this.addRecipeGroup.get('recipe').value;
    recipe.postedBy =this.authService.currentUser._id;

    this.recipeService.getToken().then((token) => {
      this.recipeService.createRecipe(recipe, token).subscribe(res => {
        console.log(res)
        this.dialog.closeAll()
          window.location.reload();
      }, error => {
        console.error(error)
      });
    })
  }

  onClick():void {
    this.submitted = false;
    this.dialog.closeAll();
  }
}
