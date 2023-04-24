import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from 'firebase/auth';

@Component({
  selector: 'app-forgotpass-page',
  templateUrl: './forgotpass-page.component.html',
  styleUrls: ['./forgotpass-page.component.css']
})
export class ForgotpassPageComponent {
  // login(){
  //   signOut(getAuth())
  //    signInWithEmailAndPassword (getAuth() , this.email, this.password).then(response => {
  //      console.log('Success!') 
  //      this.router.navigate(["/Home"], {relativeTo : this.route})
  //    })
  //  }
  //  // Passing a function into the promise . Passing the promise the code to run. Lambda
  //  signup(username: string, password: string){
  //    signOut(getAuth())
  //     createUserWithEmailAndPassword(getAuth() , username, password).then(response => {
  //       console.log('Signup Success!')
  //     })
  //   }
    // Write a forgot password function

    // Rewrite forgot password to only use previous routes.
    
    forgotPassword(): void{
      this.fireAuth.sendPasswordResetEmail(this.email).then(() => {
        
      
    }, error => {
      console.log(error);
    });
  }
    email = "";
    password = "";
    constructor(private router : Router, private route: ActivatedRoute, private fireAuth: AngularFireAuth ){
 
   
    }

}
