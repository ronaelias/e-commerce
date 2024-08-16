// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-user-profile',
//   templateUrl: './user-profile.component.html',
//   styleUrls: ['./user-profile.component.scss']
// })
// export class UserProfileComponent implements OnInit {
//   currentUser: any = null;
//   users: any[] = [];
//   isEditing: boolean = false; // Track whether any field is being edited

//   constructor(private router: Router) {}

//   ngOnInit() {
//     this.getCurrentUser();
//     if (!this.currentUser) {
//       this.router.navigate(['/sign-in']);
//     }
//   }

//   getCurrentUser() {
//     // Retrieve current user from local storage
//     this.currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');

//     if (!this.currentUser) {
//       console.error('No current user found.');
//       this.router.navigate(['/sign-in']);
//     } else {
//       // Retrieve the list of users for saving changes
//       this.users = JSON.parse(localStorage.getItem('users') || '[]');
//     }
//   }

//   defaultUser() {
//     // Default values for currentUser
//     return {
//       name: '',
//       surname: '',
//       telephone: '',
//       dob: '',
//       billingAddress: {
//         streetAndNumber: '',
//         stairwayAndFloor: '',
//         region: '',
//         city: ''
//       },
//       email: '',
//       password: ''
//     };
//   }

//   saveChanges() {
//     const index = this.users.findIndex(user => user.email === this.currentUser.email);
//     if (index !== -1) {
//       // Update the user in the list
//       this.users[index] = { ...this.currentUser };
//       // Save the updated users and currentUser back to local storage
//       localStorage.setItem('users', JSON.stringify(this.users));
//       localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
//       this.isEditing = false; // Stop editing
//     } else {
//       console.error('User not found in the list of users.');
//     }
//   }

//   deleteAccount() {
//     if (this.currentUser) {
//       // Remove the user from the list
//       this.users = this.users.filter(user => user.email !== this.currentUser.email);
//       // Save the updated users list to local storage and remove currentUser
//       localStorage.setItem('users', JSON.stringify(this.users));
//       localStorage.removeItem('currentUser');
//       alert('Account deleted successfully');
//       this.router.navigate(['/sign-up']);
//     }
//   }

//   logOut() {
//     localStorage.removeItem('currentUser');
//     this.router.navigate(['/sign-in']);
//   }
// }


import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  userProfileForm: FormGroup;
  currentUser: any = null;
  users: any[] = [];

  constructor(private router: Router, private fb: FormBuilder) {
    this.userProfileForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      telephone: ['', Validators.required],
      dob: ['', Validators.required],
      country: ['', Validators.required],
      region: ['', Validators.required],
      streetAndNumber: ['', Validators.required],
      stairwayAndFloor: [''],
      city: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  ngOnInit() {
    this.getCurrentUser();
    if (!this.currentUser) {
      this.router.navigate(['/sign-in']);
    } else {
      this.userProfileForm.patchValue(this.currentUser);
    }
  }

  getCurrentUser() {
    // Retrieve current user from local storage
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
    if (!this.currentUser) {
      console.error('No current user found.');
      this.router.navigate(['/sign-in']);
    } else {
      // Retrieve the list of users for saving changes
      this.users = JSON.parse(localStorage.getItem('users') || '[]');
    }
  }

  saveChanges() {
    if (this.userProfileForm.invalid) {
      return;
    }
  
    const updatedUser = this.userProfileForm.value;
    // Remove the user with the old email if it exists
    this.users = this.users.filter(user => user.email !== this.currentUser.email);
  
    // Add the updated user to the list
    this.users.push(updatedUser);
  
    // Save the updated users list and currentUser back to local storage
    localStorage.setItem('users', JSON.stringify(this.users));
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
  }
  

  deleteAccount() {
    if (this.currentUser) {
      // Remove the user from the list
      this.users = this.users.filter(user => user.email !== this.currentUser.email);
      // Save the updated users list to local storage and remove currentUser
      localStorage.setItem('users', JSON.stringify(this.users));
      localStorage.removeItem('currentUser');
      localStorage.removeItem('name');
      localStorage.removeItem('Access Token');
      localStorage.removeItem('Refresh Token');
      alert('Account deleted successfully');
      this.router.navigate(['/sign-in']);
    }
  }

  logOut() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('name');
    localStorage.removeItem('Access Token');
    localStorage.removeItem('Refresh Token');
    this.router.navigate(['/sign-in']);
  }

  get f() { return this.userProfileForm.controls; }
}
