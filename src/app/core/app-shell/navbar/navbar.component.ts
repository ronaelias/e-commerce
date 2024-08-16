import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SearchService } from '../../../features/services/search.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { iProduct } from '../../../shared/models/product.model';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  searchInput = new FormControl();
  private searchSubscription!: Subscription;
  userName: string | null = '';
  searchVisible: boolean = true;


  constructor(private searchService: SearchService, private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Hide search on 'Categories' and 'My Account' routes
        const hiddenRoutes = ['/category', '/profile', '/sign-in', '/sign-in/sign-up'];
        this.searchVisible = !hiddenRoutes.includes(event.url);
      }
    });
  }

  ngOnInit() {
    this.searchSubscription = this.searchInput.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged()
    ).subscribe(query => {
      this.searchService.setSearchQuery(query);
    });

    this.userName = localStorage.getItem('name');

  }

  ngOnDestroy() {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }
}