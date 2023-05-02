/**
 * @author Andrew Gautier
 * @date 2021-04-09
 * This component is the signup page for the application. It allows the user to create an account with their email and password.
 */

import { Component } from '@angular/core';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { UserData } from 'src/app/Database/userData';
import { USER_MANAGER } from 'src/main';


@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent {

/**
 * Signup function
 * 
 * @returns  A promise that returns the user's uid
 * @description This function signs the user up with their email and password. It also creates a new user in the database with the user's uid.
 * @preconditions The user must have entered a valid email and password.
 * @postconditions The user will be signed up and a new user will be created in the database.
 */
  async signup() {
    signOut(getAuth())
    var emailCheck = this.isValidEmail(this.email);
    if (emailCheck == false) {
      alert("Please enter a valid email address");
      return;
    } else {
      let uid = await createUserWithEmailAndPassword(getAuth(), this.email, this.password).then((credentials) => {
        console.log('Signup Success!');
        return credentials.user.uid;
      });

      if (uid != undefined) {
        var newUser = new UserData(uid, this.email, false);

        await USER_MANAGER.createData(newUser);
        alert("Successfully created an account. Please go back to login and sign in.");

      } else {
        console.log("Failed to create user");
        alert("Something went wrong with user creation")
      }
    }

  }

  email = "";
  password = "";
  confirmPassword = "";
  match: boolean = false;

// Helper method to check if the password and confirm password fields match.
  passwordConfirmation() {
    return this.match = this.password == this.confirmPassword
  }
// Checks if the email provided matches standard form, returns true if it is, false if it is not
  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return emailRegex.test(email);
  }


}
