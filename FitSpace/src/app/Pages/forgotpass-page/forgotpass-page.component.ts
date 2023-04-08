import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';

@Component({
  selector: 'app-forgotpass-page',
  templateUrl: './forgotpass-page.component.html',
  styleUrls: ['./forgotpass-page.component.css']
})
export class ForgotpassPageComponent {
  login(){
    signOut(getAuth())
     signInWithEmailAndPassword (getAuth() , this.email, this.password).then(response => {
       console.log('Success!') 
       this.router.navigate(["/Home"], {relativeTo : this.route})
     })
   }
   // Passing a function into the promise . Passing the promise the code to run. Lambda
   signup(username: string, password: string){
     signOut(getAuth())
      createUserWithEmailAndPassword(getAuth() , username, password).then(response => {
        console.log('Signup Success!')
      })
    }
    email = "";
    password = "";
    constructor(private router : Router, private route: ActivatedRoute ){
 
    }

}
