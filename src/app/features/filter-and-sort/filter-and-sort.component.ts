// import { Component, OnInit } from '@angular/core';
// import { ColDef, GridReadyEvent, GridApi } from 'ag-grid-community';
// import { ProductService } from '../product-listing/services/product.service';
// import { iProduct } from '../../shared/models/product.model';
// import { BehaviorSubject, combineLatest, map, Observable, switchMap } from 'rxjs';
// import { SearchService } from '../services/search.service';

// @Component({
//   selector: 'app-filter-and-sort',
//   templateUrl: './filter-and-sort.component.html',
//   styleUrls: ['./filter-and-sort.component.scss']
// })
// export class FilterAndSortComponent implements OnInit {
//   private searchQuerySubject = new BehaviorSubject<string>('');
//   //searchQuery$ = this.searchQuerySubject.asObservable();
//   searchQuery$: BehaviorSubject<string> = new BehaviorSubject<string>('');

//   private productsSubject = new BehaviorSubject<iProduct[]>([]);
//   products$ = this.productsSubject.asObservable();

//   filteredProducts$!: Observable<iProduct[]>;

//   fabricRowData = [
//     { fabric: 'Cotton' },
//     { fabric: 'Polyester' },
//     { fabric: 'Leather' },
//     { fabric: 'Fleece' },
//     { fabric: 'Polyurethane' },
//     { fabric: 'Rayon' },
//     { fabric: 'Spandex' },
//   ];
//   genderRowData = [
//     { gender: 'Men' },
//     { gender: 'Women' },
//   ];
//   colorRowData = [
//     { color: 'Gold' },
//     { color: 'Silver' },
//     { color: 'Rose Gold' },
//   ];
//   styleRowData = [
//     { style: 'Slim Fit' },
//     { style: 'Casual' },
//     { style: 'V-Neck' },
//   ];
//   typeRowData = [
//     { type: 'Long Sleeve' },
//     { type: 'Short Sleeve' },
//   ];

//   public fabricColDefs: ColDef[] = [
//     { field: 'fabric', headerName: 'Fabric', checkboxSelection: true, headerCheckboxSelection: true, filter: true }
//   ];

//   public genderColDefs: ColDef[] = [
//     { field: 'gender', headerName: 'Gender', checkboxSelection: true, headerCheckboxSelection: true, filter: true }
//   ];

//   public colorColDefs: ColDef[] = [
//     { field: 'color', headerName: 'Color', checkboxSelection: true, headerCheckboxSelection: true, filter: true }
//   ];

//   public styleColDefs: ColDef[] = [
//     { field: 'style', headerName: 'Style', checkboxSelection: true, headerCheckboxSelection: true, filter: true }
//   ];

//   public typeColDefs: ColDef[] = [
//     { field: 'type', headerName: 'Type', checkboxSelection: true, headerCheckboxSelection: true, filter: true }
//   ];

//   public themeClass: string = 'ag-theme-quartz';
//   public rowSelection: 'multiple' | 'single' = 'multiple';

//   private gridApis: { [key: string]: GridApi } = {};

//   constructor(private productService: ProductService, private searchService: SearchService) {}

//   // ngOnInit() {
//   //   this.products$ = this.productService.getAllProducts();
//   //   this.applyFilters();
//   // }

//   ngOnInit() {
//     this.products$ = this.productService.getAllProducts();
//     this.filteredProducts$ = this.searchQuery$.pipe(
//       switchMap(query => this.searchService.searchProducts(query))
//     );

//     this.products$.subscribe(products => {
//       this.searchService.setProducts(products);
//     });

//     this.searchService.searchQuery$.subscribe(query => {
//       this.searchQuery$.next(query);
//     });

//     //method filter
//     this.filteredProducts$ = this.filterProducts();
//   }

//   selectedFilters: { [key: string]: string[] } = {
//     fabric: [],
//     gender: [],
//     color: [],
//     style: [],
//     type: []
//   };

//   filtersSubject: BehaviorSubject<{ [key: string]: string[] }> = new BehaviorSubject(this.selectedFilters);

//   onGridReady(params: GridReadyEvent, gridId: string) {
//     this.gridApis[gridId] = params.api;
//     params.api.sizeColumnsToFit();
//   }

//   onFilterChange(filterType: string, selectedValues: string[]) {
//     this.selectedFilters[filterType] = selectedValues;
//     this.filtersSubject.next(this.selectedFilters);
//     this.applyFilters();
//   }

//   applyFilters() {
//     // this.productService.getAllProducts().subscribe(products => {
//     //   this.productsSubject.next(products);
//     this.filterProducts().subscribe(filteredProducts => {
//       this.productsSubject.next(filteredProducts);
//     });
//   }

//   getSelectedValues(gridId: string, filterType: string): string[] {
//     const gridApi = this.gridApis[gridId];
//     if (gridApi) {
//       const selectedNodes = gridApi.getSelectedNodes();
//       return selectedNodes.map(node => node.data[filterType]);
//     }
//     return [];
//   }

//   filterProducts(): Observable<iProduct[]> {
//     return combineLatest([this.searchQuery$, this.products$, this.filtersSubject]).pipe(
//       map(([searchQuery, products, selectedFilters]) => {
//         return products.filter(product => {
//           const title = product.title.toLowerCase();
//           const description = product.description.toLowerCase();
//           const category = product.category.toLowerCase();
  
//           const matchesFabric = selectedFilters['fabric'].length ? selectedFilters['fabric'].some(filter => this.checkMatch(filter, title, description, category)) : true;
//           const matchesGender = selectedFilters['gender'].length ? selectedFilters['gender'].some(filter => this.checkMatch(filter, title, description, category)) : true;
//           const matchesColor = selectedFilters['color'].length ? selectedFilters['color'].some(filter => this.checkMatch(filter, title, description, category)) : true;
//           const matchesStyle = selectedFilters['style'].length ? selectedFilters['style'].some(filter => this.checkMatch(filter, title, description, category)) : true;
//           const matchesType = selectedFilters['type'].length ? selectedFilters['type'].some(filter => this.checkMatch(filter, title, description, category)) : true;
  
//           return matchesFabric && matchesGender && matchesColor && matchesStyle && matchesType;
//         });
//       })
//     );
//   }
  
//   private checkMatch(filter: string, title: string, description: string, category: string): boolean {
//     const regex = new RegExp(`\\b${filter.toLowerCase()}`);
//     const matchInTitle = regex.test(title);
//     const matchInDescription = regex.test(description);
//     const matchInCategory = regex.test(category);
//     return matchInTitle || matchInDescription || matchInCategory;
//   }
  
// }

import { Component, OnInit } from '@angular/core';
import { ColDef, GridReadyEvent, GridApi } from 'ag-grid-community';
import { ProductService } from '../product-listing/services/product.service';
import { iProduct } from '../../shared/models/product.model';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-filter-and-sort',
  templateUrl: './filter-and-sort.component.html',
  styleUrls: ['./filter-and-sort.component.scss']
})
export class FilterAndSortComponent implements OnInit {
  private searchQuerySubject = new BehaviorSubject<string>('');
  searchQuery$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  private productsSubject = new BehaviorSubject<iProduct[]>([]);
  products$ = this.productsSubject.asObservable();

  filteredProducts$!: Observable<iProduct[]>;

  fabricRowData = [
    { fabric: 'Cotton' },
    { fabric: 'Polyester' },
    { fabric: 'Leather' },
    { fabric: 'Fleece' },
    { fabric: 'Polyurethane' },
    { fabric: 'Rayon' },
    { fabric: 'Spandex' },
  ];
  genderRowData = [
    { gender: 'Men' },
    { gender: 'Women' },
  ];
  colorRowData = [
    { color: 'Gold' },
    { color: 'Silver' },
    { color: 'Rose Gold' },
  ];
  styleRowData = [
    { style: 'Slim Fit' },
    { style: 'Casual' },
    { style: 'V-Neck' },
  ];
  typeRowData = [
    { type: 'Long Sleeve' },
    { type: 'Short Sleeve' },
  ];

  public fabricColDefs: ColDef[] = [
    { field: 'fabric', headerName: 'Fabric', checkboxSelection: true, headerCheckboxSelection: true, filter: true }
  ];

  public genderColDefs: ColDef[] = [
    { field: 'gender', headerName: 'Gender', checkboxSelection: true, headerCheckboxSelection: true, filter: true }
  ];

  public colorColDefs: ColDef[] = [
    { field: 'color', headerName: 'Color', checkboxSelection: true, headerCheckboxSelection: true, filter: true }
  ];

  public styleColDefs: ColDef[] = [
    { field: 'style', headerName: 'Style', checkboxSelection: true, headerCheckboxSelection: true, filter: true }
  ];

  public typeColDefs: ColDef[] = [
    { field: 'type', headerName: 'Type', checkboxSelection: true, headerCheckboxSelection: true, filter: true }
  ];

  public themeClass: string = 'ag-theme-quartz';
  public rowSelection: 'multiple' | 'single' = 'multiple';

  private gridApis: { [key: string]: GridApi } = {};

  constructor(private productService: ProductService, private searchService: SearchService) {}

  ngOnInit() {
    // Load products from the service
    this.products$ = this.productService.getAllProducts();

    // Combine search query and filter updates into a single stream
    this.filteredProducts$ = combineLatest([this.products$, this.searchQuery$, this.filtersSubject]).pipe(
      map(([products, searchQuery, selectedFilters]) => {
        return products.filter(product => {
          const title = product.title.toLowerCase();
          const description = product.description.toLowerCase();
          const category = product.category.toLowerCase();
          const search = searchQuery.toLowerCase();

          // Search logic
          const matchesSearch = search ? (title.includes(search) || description.includes(search)) : true;

          // Filter logic
          const matchesFabric = selectedFilters['fabric'].length ? selectedFilters['fabric'].some(filter => this.checkMatch(filter, title, description, category)) : true;
          const matchesGender = selectedFilters['gender'].length ? selectedFilters['gender'].some(filter => this.checkMatch(filter, title, description, category)) : true;
          const matchesColor = selectedFilters['color'].length ? selectedFilters['color'].some(filter => this.checkMatch(filter, title, description, category)) : true;
          const matchesStyle = selectedFilters['style'].length ? selectedFilters['style'].some(filter => this.checkMatch(filter, title, description, category)) : true;
          const matchesType = selectedFilters['type'].length ? selectedFilters['type'].some(filter => this.checkMatch(filter, title, description, category)) : true;

          // Product must match both search query and all active filters
          return matchesSearch && matchesFabric && matchesGender && matchesColor && matchesStyle && matchesType;
        });
      })
    );

    // Subscribe to product data and update search service
    this.products$.subscribe(products => {
      this.searchService.setProducts(products);
    });

    // Listen for search query updates from the search service
    this.searchService.searchQuery$.subscribe(query => {
      this.searchQuery$.next(query);
    });
  }

  selectedFilters: { [key: string]: string[] } = {
    fabric: [],
    gender: [],
    color: [],
    style: [],
    type: []
  };

  filtersSubject: BehaviorSubject<{ [key: string]: string[] }> = new BehaviorSubject(this.selectedFilters);

  onGridReady(params: GridReadyEvent, gridId: string) {
    this.gridApis[gridId] = params.api;
    params.api.sizeColumnsToFit();
  }

  onFilterChange(filterType: string, selectedValues: string[]) {
    this.selectedFilters[filterType] = selectedValues;
    this.filtersSubject.next(this.selectedFilters);
  }

  private checkMatch(filter: string, title: string, description: string, category: string): boolean {
    const regex = new RegExp(`\\b${filter.toLowerCase()}`);
    const matchInTitle = regex.test(title);
    const matchInDescription = regex.test(description);
    const matchInCategory = regex.test(category);
    return matchInTitle || matchInDescription || matchInCategory;
  }

    getSelectedValues(gridId: string, filterType: string): string[] {
    const gridApi = this.gridApis[gridId];
    if (gridApi) {
      const selectedNodes = gridApi.getSelectedNodes();
      return selectedNodes.map(node => node.data[filterType]);
    }
    return [];
  }
}
