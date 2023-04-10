import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './Pages/home-page/home-page.component';
import { LoginPageComponent } from './Pages/login-page/login-page.component';
import { CreatePostPageComponent } from './Pages/create-post-page/create-post-page.component';
import { CommunityPageComponent } from './Pages/community-page/community-page.component';
import { ProfilePageComponent } from './Pages/profile-page/profile-page.component';
import { MyActivityPageComponent } from './Pages/my-activity-page/my-activity-page.component';
import { SignupPageComponent } from './Pages/signup-page/signup-page.component';
import { CommentsComponent } from './Components/comments/comments.component';
import { ForgotpassPageComponent } from './Pages/forgotpass-page/forgotpass-page.component';

const routes: Routes = [
  {
    path:'',
    component: LoginPageComponent
  },
  {
    path:'Signup',
    component: SignupPageComponent
  },
  {
    path:'ForgotPass',
    component: ForgotpassPageComponent
  },
  {
    path:'Home',
    component: HomePageComponent
  },
  {
    path:'Create',
    component: CreatePostPageComponent
  },
  {
    path:'Community',
    component: CommunityPageComponent
  },
  {
    path:'Profile',
    component: ProfilePageComponent
  },
  {
    path:'MyActivity',
    component: MyActivityPageComponent
  },
  {
    path: 'comments/:id', 
    component: CommentsComponent
  },
  {
    path: 'user/:id', 
    component: ProfilePageComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
