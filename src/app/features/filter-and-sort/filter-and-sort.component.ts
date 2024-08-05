import { Component, OnInit } from '@angular/core';
import { ColDef, GridReadyEvent, GridApi } from 'ag-grid-community';
import { ProductService } from '../product-listing/services/product.service';
import { Product } from '../../product.model';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { SearchService } from '../../search.service';

@Component({
  selector: 'app-filter-and-sort',
  templateUrl: './filter-and-sort.component.html',
  styleUrls: ['./filter-and-sort.component.scss']
})
export class FilterAndSortComponent implements OnInit {
  private searchQuerySubject = new BehaviorSubject<string>('');
  searchQuery$ = this.searchQuerySubject.asObservable();

  private productsSubject = new BehaviorSubject<Product[]>([]);
  products$ = this.productsSubject.asObservable();

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
    { field: 'fabric', headerName: 'Fabric', checkboxSelection: true, headerCheckboxSelection: true }
  ];

  public genderColDefs: ColDef[] = [
    { field: 'gender', headerName: 'Gender', checkboxSelection: true, headerCheckboxSelection: true }
  ];

  public colorColDefs: ColDef[] = [
    { field: 'color', headerName: 'Color', checkboxSelection: true, headerCheckboxSelection: true }
  ];

  public styleColDefs: ColDef[] = [
    { field: 'style', headerName: 'Style', checkboxSelection: true, headerCheckboxSelection: true }
  ];

  public typeColDefs: ColDef[] = [
    { field: 'type', headerName: 'Type', checkboxSelection: true, headerCheckboxSelection: true }
  ];

  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 150,
    filter: true,
    floatingFilter: true
  };

  public themeClass: string = 'ag-theme-quartz';
  public rowSelection: 'multiple' | 'single' = 'multiple';

  private gridApis: { [key: string]: GridApi } = {};

  constructor(private productService: ProductService, private searchService: SearchService) {}

  ngOnInit() {
    this.applyFilters();
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
    this.applyFilters();
  }

  applyFilters() {
    this.productService.getAllProducts().subscribe(products => {
      this.productsSubject.next(products);
    });
  }

  getSelectedValues(gridId: string, filterType: string): string[] {
    const gridApi = this.gridApis[gridId];
    if (gridApi) {
      const selectedNodes = gridApi.getSelectedNodes();
      return selectedNodes.map(node => node.data[filterType]);
    }
    return [];
  }

  filterProducts(query: string): Observable<Product[]> {
    this.searchQuerySubject.next(query);
    return combineLatest([this.searchQuery$, this.products$, this.filtersSubject]).pipe(
      map(([searchQuery, products, selectedFilters]) => {
        return products.filter(product => {
          const title = product.title.toLowerCase();
          const description = product.description.toLowerCase();
          const category = product.category.toLowerCase();
  
          const matchesFabric = selectedFilters['fabric'].length ? selectedFilters['fabric'].some(filter => this.checkMatch(filter, title, description, category)) : true;
          const matchesGender = selectedFilters['gender'].length ? selectedFilters['gender'].some(filter => this.checkMatch(filter, title, description, category)) : true;
          const matchesColor = selectedFilters['color'].length ? selectedFilters['color'].some(filter => this.checkMatch(filter, title, description, category)) : true;
          const matchesStyle = selectedFilters['style'].length ? selectedFilters['style'].some(filter => this.checkMatch(filter, title, description, category)) : true;
          const matchesType = selectedFilters['type'].length ? selectedFilters['type'].some(filter => this.checkMatch(filter, title, description, category)) : true;
  
          return matchesFabric && matchesGender && matchesColor && matchesStyle && matchesType;
        });
      })
    );
  }
  
  private checkMatch(filter: string, title: string, description: string, category: string): boolean {
    const regex = new RegExp(`\\b${filter.toLowerCase()}`);
    const matchInTitle = regex.test(title);
    const matchInDescription = regex.test(description);
    const matchInCategory = regex.test(category);
    return matchInTitle || matchInDescription || matchInCategory;
  }
  
  
}
