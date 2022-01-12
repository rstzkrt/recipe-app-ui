import {Recipe} from "./recipe";

export class User {

  uid:string;

  _id:string;

  displayName:string;

  email:string;

  phone:string;

  avatar:string;

  favourites:string[];//

  recipes:Recipe[];
}
