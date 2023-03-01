import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './Pages/home-page/home-page.component';
import { LoginPageComponent } from './Pages/login-page/login-page.component';
import { CreatePostPageComponent } from './Pages/create-post-page/create-post-page.component';
import { CommunityPageComponent } from './Pages/community-page/community-page.component';
import { ProfilePageComponent } from './Pages/profile-page/profile-page.component';

const routes: Routes = [
  {
    path:'',
    component: LoginPageComponent
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
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
