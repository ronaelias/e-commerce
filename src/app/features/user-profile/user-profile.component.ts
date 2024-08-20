// // import { Component, OnInit } from '@angular/core';
// // import { Router } from '@angular/router';

// // @Component({
// //   selector: 'app-user-profile',
// //   templateUrl: './user-profile.component.html',
// //   styleUrls: ['./user-profile.component.scss']
// // })
// // export class UserProfileComponent implements OnInit {
// //   currentUser: any = null;
// //   users: any[] = [];
// //   isEditing: boolean = false; // Track whether any field is being edited

// //   constructor(private router: Router) {}

// //   ngOnInit() {
// //     this.getCurrentUser();
// //     if (!this.currentUser) {
// //       this.router.navigate(['/sign-in']);
// //     }
// //   }

// //   getCurrentUser() {
// //     // Retrieve current user from local storage
// //     this.currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');

// //     if (!this.currentUser) {
// //       console.error('No current user found.');
// //       this.router.navigate(['/sign-in']);
// //     } else {
// //       // Retrieve the list of users for saving changes
// //       this.users = JSON.parse(localStorage.getItem('users') || '[]');
// //     }
// //   }

// //   defaultUser() {
// //     // Default values for currentUser
// //     return {
// //       name: '',
// //       surname: '',
// //       telephone: '',
// //       dob: '',
// //       billingAddress: {
// //         streetAndNumber: '',
// //         stairwayAndFloor: '',
// //         region: '',
// //         city: ''
// //       },
// //       email: '',
// //       password: ''
// //     };
// //   }

// //   saveChanges() {
// //     const index = this.users.findIndex(user => user.email === this.currentUser.email);
// //     if (index !== -1) {
// //       // Update the user in the list
// //       this.users[index] = { ...this.currentUser };
// //       // Save the updated users and currentUser back to local storage
// //       localStorage.setItem('users', JSON.stringify(this.users));
// //       localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
// //       this.isEditing = false; // Stop editing
// //     } else {
// //       console.error('User not found in the list of users.');
// //     }
// //   }

// //   deleteAccount() {
// //     if (this.currentUser) {
// //       // Remove the user from the list
// //       this.users = this.users.filter(user => user.email !== this.currentUser.email);
// //       // Save the updated users list to local storage and remove currentUser
// //       localStorage.setItem('users', JSON.stringify(this.users));
// //       localStorage.removeItem('currentUser');
// //       alert('Account deleted successfully');
// //       this.router.navigate(['/sign-up']);
// //     }
// //   }

// //   logOut() {
// //     localStorage.removeItem('currentUser');
// //     this.router.navigate(['/sign-in']);
// //   }
// // }

// //this

// import { Component, OnInit } from '@angular/core'
// import { Router } from '@angular/router'
// import { FormBuilder, FormGroup, Validators } from '@angular/forms'
// import { AuthService } from '../../core/auth/services/auth.service'

// @Component({
//   selector: 'app-user-profile',
//   templateUrl: './user-profile.component.html',
//   styleUrls: ['./user-profile.component.scss'],
// })
// export class UserProfileComponent implements OnInit {
//   userProfileForm: FormGroup
//   currentUser: any = null
//   users: any[] = []

//   constructor(
//     private router: Router,
//     private fb: FormBuilder,
//     private authService: AuthService
//   ) {
//     this.userProfileForm = this.fb.group({
//       Firstname: ['', Validators.required],
//       Lastname: ['', Validators.required],
//       Email: ['', [Validators.required, Validators.email]],
//       Password: ['', [Validators.required, Validators.minLength(8)]],
//     })
//   }

//   // ngOnInit() {
//   //   this.getCurrentUser()
//   //   if (!this.currentUser) {
//   //     this.router.navigate(['/sign-in'])
//   //   } else {
//   //     this.userProfileForm.patchValue(this.currentUser)
//   //   }
//   // }

//   // getCurrentUser() {
//   //   // Retrieve current user from local storage
//   //   this.currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null')
//   //   if (!this.currentUser) {
//   //     console.error('No current user found.')
//   //     this.router.navigate(['/sign-in'])
//   //   } else {
//   //     // Retrieve the list of users for saving changes
//   //     this.users = JSON.parse(localStorage.getItem('users') || '[]')
//   //   }
//   // }

//   ngOnInit(): void {
//     this.loadUserData()
//   }

//   loadUserData(): void {
//     // Assuming user data is stored in localStorage
//     this.currentUser = {
//       Firstname: localStorage.getItem('Firstname') || '',
//       Lastname: localStorage.getItem('Lastname') || '',
//       Email: localStorage.getItem('Email') || '',
//       Password: localStorage.getItem('Password') || '',
//     }
//   }

//   saveChanges() {
//     if (this.userProfileForm.invalid) {
//       return
//     }

//     const updatedUser = this.userProfileForm.value
//     // Remove the user with the old email if it exists
//     this.users = this.users.filter(
//       (user) => user.email !== this.currentUser.email
//     )

//     // Add the updated user to the list
//     this.users.push(updatedUser)

//     // Save the updated users list and currentUser back to local storage
//     localStorage.setItem('currentUser', JSON.stringify(updatedUser))
//   }

//   // deleteAccount() {
//   //   if (this.currentUser) {
//   //     // Remove the user from the list
//   //     this.users = this.users.filter(
//   //       (user) => user.email !== this.currentUser.email
//   //     )
//   //     // Save the updated users list to local storage and remove currentUser
//   //     localStorage.setItem('users', JSON.stringify(this.users))
//   //     localStorage.removeItem('currentUser')
//   //     localStorage.removeItem('name')
//   //     localStorage.removeItem('Access Token')
//   //     localStorage.removeItem('Refresh Token')
//   //     alert('Account deleted successfully')
//   //     this.router.navigate(['/sign-in'])
//   //   }
//   // }

//   SignOut() {
//     this.authService.signOut()
//     this.router.navigate(['/sign-in'])
//   }

//   get f() {
//     return this.userProfileForm.controls
//   }
// }

// // import { Component, OnInit } from '@angular/core'
// // import { Router } from '@angular/router'

// // @Component({
// //   selector: 'app-user-profile',
// //   templateUrl: './user-profile.component.html',
// //   styleUrls: ['./user-profile.component.scss'],
// // })
// // export class UserProfileComponent implements OnInit {
// //   user: any = {}

// //   ngOnInit(): void {
// //     this.loadUserData()
// //   }

// //   loadUserData(): void {
// //     // Assuming user data is stored in localStorage
// //     this.user = {
// //       Firstname: localStorage.getItem('Firstname') || '',
// //       Lastname: localStorage.getItem('Lastname') || '',
// //       Email: localStorage.getItem('Email') || '',
// //       Password: localStorage.getItem('Password') || '',
// //     }
// //   }

// //   goBack(): void {
// //     // Navigate back to home or any other desired route
// //     this.router.navigate(['/'])
// //   }

// //   constructor(private router: Router) {}
// // }

// import { Component, OnInit } from '@angular/core'
// import { Router } from '@angular/router'
// import { FormBuilder, FormGroup, Validators } from '@angular/forms'
// import { AuthService } from '../../core/auth/services/auth.service'

// @Component({
//   selector: 'app-user-profile',
//   templateUrl: './user-profile.component.html',
//   styleUrls: ['./user-profile.component.scss'],
// })
// export class UserProfileComponent implements OnInit {
//   userProfileForm: FormGroup
//   currentUser: any = null

//   constructor(
//     private router: Router,
//     private fb: FormBuilder,
//     private authService: AuthService
//   ) {
//     // Initialize the form with validation
//     this.userProfileForm = this.fb.group({
//       Firstname: ['', Validators.required],
//       Lastname: ['', Validators.required],
//       Email: ['', [Validators.required, Validators.email]],
//       Password: ['', [Validators.required, Validators.minLength(8)]],
//     })
//   }

//   ngOnInit(): void {
//     this.loadUserData()
//   }

//   // Load data from localStorage and populate the form
//   loadUserData(): void {
//     const Firstname = localStorage.getItem('Firstname')
//     const Lastname = localStorage.getItem('Lastname')
//     const Email = localStorage.getItem('Email')
//     const Password = localStorage.getItem('Password')

//     // Check if user data is available in localStorage
//     if (Firstname && Lastname && Email && Password) {
//       this.currentUser = {
//         Firstname,
//         Lastname,
//         Email,
//         Password,
//       }

//       // Patch the form with current user data
//       this.userProfileForm.patchValue(this.currentUser)
//     }
//   }

//   // Save changes made to the form back to localStorage
//   saveChanges() {
//     if (this.userProfileForm.invalid) {
//       return
//     }

//     const updatedUser = this.userProfileForm.value

//     // Save updated values in localStorage
//     localStorage.setItem('Firstname', updatedUser.Firstname)
//     localStorage.setItem('Lastname', updatedUser.Lastname)
//     localStorage.setItem('Email', updatedUser.Email)
//     localStorage.setItem('Password', updatedUser.Password)

//     // Optionally update currentUser variable if needed
//     this.currentUser = updatedUser
//   }

//   // Sign out and clear user data
//   SignOut() {
//     this.authService.signOut()
//     this.router.navigate(['/sign-in'])
//   }

//   // Helper to access form controls in the template
//   get f() {
//     return this.userProfileForm.controls
//   }
// }

import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { AuthService } from '../../core/auth/services/auth.service'
import { IndexedDBService } from '../../shared/services/indexed-db.service'

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  userProfileForm!: FormGroup
  userProfile: any = {}
  profileImageUrl: string = 'assets/profile.png'

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private indexedDBService: IndexedDBService
  ) {}

  ngOnInit(): void {
    this.userProfileForm = this.fb.group({
      Firstname: [localStorage.getItem('Firstname') || '', Validators.required],
      Lastname: [localStorage.getItem('Lastname') || '', Validators.required],
      Email: [
        localStorage.getItem('Email') || '',
        [Validators.required, Validators.email],
      ],
      Password: [
        localStorage.getItem('Password') || '',
        [Validators.required, Validators.minLength(8)],
      ],
    })
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e: any) => {
        this.profileImageUrl = e.target.result // Update the profile image URL
      }
      reader.readAsDataURL(file) // Read the file as a data URL
    }
  }

  //Save changes and update local storage
  onSaveChanges(): void {
    if (this.userProfileForm.valid) {
      const { Firstname, Lastname, Email, Password } =
        this.userProfileForm.value

      localStorage.removeItem('Firstname')
      localStorage.removeItem('Lastname')
      localStorage.removeItem('Email')
      localStorage.removeItem('Password')

      localStorage.setItem('Firstname', Firstname)
      localStorage.setItem('Lastname', Lastname)
      localStorage.setItem('Email', Email)
      localStorage.setItem('Password', Password)

      this.router.navigate(['product-listing'])
    }
  }

  SignOut(): void {
    this.router.navigate(['/sign-in/sign-up'])
    this.authService.signOut()
  }

  // Getter for form controls for validation in the template
  get f() {
    return this.userProfileForm.controls
  }
}
