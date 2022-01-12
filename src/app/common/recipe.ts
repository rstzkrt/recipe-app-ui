import {User} from "./user";

export class Recipe {

  id:string;
  user:User;
  postedBy:string;
  recipeName:string;
  preparationDescription:string;
  photoUrl:string;
  ingredients:string;
}
