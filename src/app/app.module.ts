import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {MatCardModule} from "@angular/material/card";
import {MatListModule} from "@angular/material/list";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatButtonModule} from "@angular/material/button";
import { FlexLayoutModule } from "@angular/flex-layout";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatIconModule} from "@angular/material/icon";
import {MatBadgeModule} from "@angular/material/badge";
import {MatInputModule} from "@angular/material/input";
import { KitchenListComponent } from './components/kitchen-list/kitchen-list.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {ActivatedRoute, RouterModule, Routes} from "@angular/router";
import {RecipeServiceService} from "./services/recipe-service.service";
import { RouterTestingModule } from "@angular/router/testing";
import { DetailPageComponent } from './components/detail-page/detail-page.component';
import { AddRecipeComponent } from './components/add-recipe/add-recipe.component';
import {MatDialogModule} from "@angular/material/dialog";
import { AddSmoothieComponent } from './components/add-smoothie/add-smoothie.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import {environment} from "../environments/environment";
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import {AuthService} from "./services/auth.service";
import {MatChipsModule} from "@angular/material/chips";
import {MatTooltipModule} from "@angular/material/tooltip";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatTabsModule} from "@angular/material/tabs";
import { UpdateRecipeComponent } from './components/update-recipe/update-recipe.component';



const routes:Routes =[
  {path:'recipe/:id',component:DetailPageComponent},
  {path:'recipe-update/:id/',component:UpdateRecipeComponent},
  // {path:'search/:keyword',component:AdvertListComponent},
  // {path:'brands/:brand',component:AdvertListComponent},
  {path:'user-profile',component:UserProfileComponent},
  {path:'user-login',component:UserLoginComponent},
  {path:'recipe',component:RecipeListComponent},
  //{path:'post-recipe',canActivate:[AuthGuard]},
  //{path:'favourites',component:FavouriteAdvertsComponent,canActivate:[AuthGuard]},
  {path:'',redirectTo:'recipe',pathMatch:'full'},
  {path:'**',redirectTo:'recipe',pathMatch:'full'}
]

@NgModule({
  declarations: [
    AppComponent,
    RecipeListComponent,
    KitchenListComponent,
    DetailPageComponent,
    AddRecipeComponent,
    AddSmoothieComponent,
    UserLoginComponent,
    UserProfileComponent,
    UpdateRecipeComponent
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatExpansionModule,
        MatSidenavModule,
        MatPaginatorModule,
        MatTableModule,
        MatCardModule,
        MatListModule,
        MatGridListModule,
        MatButtonModule,
        FlexLayoutModule,
        MatButtonToggleModule,
        MatIconModule,
        MatBadgeModule,
        MatInputModule,
        HttpClientModule,
        RouterModule,
        RouterTestingModule,
        RouterModule.forRoot(routes),
        MatDialogModule,
        FormsModule,
        ReactiveFormsModule,


        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireAuthModule,
        MatChipsModule,
        MatTooltipModule,
        MatTabsModule

    ],
  providers: [HttpClient,RecipeServiceService,HttpClient,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
