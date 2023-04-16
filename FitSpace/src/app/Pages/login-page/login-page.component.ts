import { Component } from '@angular/core';
import {getAuth, signInWithEmailAndPassword} from '@angular/fire/auth'
import { createUserWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { USER_MANAGER } from 'src/main';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  async login(){
   signOut(getAuth())

    // Get the current user
    await signInWithEmailAndPassword (getAuth() , this.email, this.password).then(response => {
      console.log('Success!') 
      this.router.navigate(["/Home"], {relativeTo : this.route})
    }).catch( () => {
      alert("Invalid credentials");
    })

    const user = getAuth().currentUser;

    if(user?.uid != undefined){
      sessionStorage.setItem("currentUserID", user?.uid)
      
      let userEntry = await USER_MANAGER.loadData(user?.uid);
      if(userEntry.displayName != null){
        sessionStorage.setItem("currentUsername", userEntry.displayName)
        console.log(userEntry.displayName);
      }

    }
    
  }
  // Passing a function into the promise . Passing the promise the code to run. Lambda
  async signup(username: string, password: string){
    signOut(getAuth())
    createUserWithEmailAndPassword(getAuth() , username, password).then(response => {
       console.log('Signup Success!')
     });
   }

   email = "";
   password = "";

   constructor(private router : Router, private route: ActivatedRoute ){

   }
}
