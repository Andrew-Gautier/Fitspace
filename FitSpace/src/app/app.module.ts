import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './Pages/login-page/login-page.component';
import { HomePageComponent } from './Pages/home-page/home-page.component';
import { CreatePostPageComponent } from './Pages/create-post-page/create-post-page.component';
import { CommunityPageComponent } from './Pages/community-page/community-page.component';
import { ProfilePageComponent } from './Pages/profile-page/profile-page.component';
import { NavBarComponent } from './Components/nav-bar/nav-bar.component';
import { MyActivityPageComponent } from './Pages/my-activity-page/my-activity-page.component';
import {AngularFireModule} from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { provideFirebaseApp } from '@angular/fire/app';
import { initializeApp } from 'firebase/app';
import {AngularFirestoreModule} from '@angular/fire/compat/firestore';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';


import { HomePageBannerComponent } from './Components/home-page-banner/home-page-banner.component';

import { FormsModule } from '@angular/forms';
import { SignupPageComponent } from './Pages/signup-page/signup-page.component';
import { CommentsComponent } from './Components/comments/comments.component';
import { ForgotpassPageComponent } from './Pages/forgotpass-page/forgotpass-page.component';
import { PostComponentComponent } from './Components/post-component/post-component.component';
import { SlideComponentComponent } from './Components/slide-component/slide-component.component';
import { ProfileInfoComponent } from './Components/profile-info/profile-info.component';
import { ChunkPipe } from './Pages/community-page/pipe';
// May need to change the above environments import, leaving for now. (If debugging, check for an error here.) ~ AG
import * as CanvasJSAngularChart from "../assets/canvasjs.angular.component";
var CanvasJSChart = CanvasJSAngularChart.CanvasJSChart;

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    HomePageComponent,
    CreatePostPageComponent,
    CommunityPageComponent,
    ProfilePageComponent,
    NavBarComponent,
    MyActivityPageComponent,
    HomePageBannerComponent,

    SignupPageComponent,
      CommentsComponent,
      ForgotpassPageComponent,
      PostComponentComponent,
      SlideComponentComponent,
      ProfileInfoComponent,
      ChunkPipe,
      CanvasJSChart,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
   
    AngularFireModule.initializeApp(environment.firebase)
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
