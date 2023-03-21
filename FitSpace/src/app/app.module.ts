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
import { ExercisePostCardComponent } from './Components/exercise-post-card/exercise-post-card.component';
import { MyActivityPageComponent } from './Pages/my-activity-page/my-activity-page.component';
import {AngularFireModule} from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { provideFirebaseApp } from '@angular/fire/app';
import { initializeApp } from 'firebase/app';
//import {AngularFirestoreModule} from '@angular/fire/compat/firestore';
// May need to change the above environments import, leaving for now. (If debugging, check for an error here.) ~ AG

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    HomePageComponent,
    CreatePostPageComponent,
    CommunityPageComponent,
    ProfilePageComponent,
    NavBarComponent,
    ExercisePostCardComponent,
    MyActivityPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase))
   // AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
