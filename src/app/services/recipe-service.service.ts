import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Recipe} from "../common/recipe";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {User} from "../common/user";
import {UserService} from "./user.service";
import {ActivatedRoute} from "@angular/router";
import {DetailPageComponent} from "../components/detail-page/detail-page.component";

@Injectable({
  providedIn: 'root'
})
export class RecipeServiceService {

  baseUrl:string="http://localhost:3000/recipe";

  constructor(private httpClient: HttpClient,public afAuth:AngularFireAuth
              ,private route:ActivatedRoute,
              private userService: UserService) { }

  async getToken():Promise<any>{
    return await (await this.afAuth.currentUser).getIdToken(true);
  }

  getRecipeList(): Observable<Recipe[]> {
    return this.httpClient.get<Recipe[]>(this.baseUrl);
  }

  getRecipeById(recipeId:string):Observable<Recipe>{
    const url = `http://localhost:3000/recipe/${recipeId}`;
    return this.httpClient.get<Recipe>(url);
  }


  updateRecipe(recipe: Recipe, token: string,recipeId:string):Observable<any> {
    const headers = { 'content-type': 'application/json','Authorization': `Bearer ${token}`};


    let url=`http://localhost:3000/recipe/${recipeId}`
    return this.httpClient.put(url, {

      // postedBy:recipe.postedBy,
      preparationDescription: recipe.preparationDescription,
      photoUrl : recipe.photoUrl,
      recipeName: recipe.recipeName,
      ingredients:recipe.ingredients

    },{'headers':headers});
  }


  createRecipe(recipe: Recipe,token:string):Observable<any> {
    const headers = { 'content-type': 'application/json','Authorization': `Bearer ${token}`};

    return this.httpClient.post(this.baseUrl, {

      postedBy:recipe.postedBy,
      preparationDescription: recipe.preparationDescription,
      photoUrl : recipe.photoUrl,
      recipeName: recipe.recipeName,
      ingredients:recipe.ingredients

    },{'headers':headers});
  }

  deleteRecipe(recipeId:string,token:string):Observable<any>{
    const url=`http://localhost:3000/recipe/${recipeId}`
    const headers = { 'content-type': 'application/json','Authorization': `Bearer ${token}`};
    return this.httpClient.delete(url,{'headers':headers})
  }
}
