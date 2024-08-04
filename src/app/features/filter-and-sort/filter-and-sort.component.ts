import { Component, OnInit } from '@angular/core';
import { ColDef, GridOptions, GridReadyEvent } from 'ag-grid-community';
import { HttpClient } from '@angular/common/http';
import { ProductService } from '../product-listing/services/product.service';
import { Product } from '../../product.model';

@Component({
  selector: 'app-filter-and-sort',
  templateUrl: './filter-and-sort.component.html',
  styleUrls: ['./filter-and-sort.component.scss']
})
export class FilterAndSortComponent {
  rowData: Product[] = [];

  fabricRowData = [
    {fabric: 'Cotton'},
    {fabric: 'Polyester'},
    {fabric: 'Leather'},
    {fabric: 'Fleece'},
    {fabric: 'Polyurethane'},
    {fabric: 'Rayon'},
    {fabric: 'Spandex'},
  ];
  genderRowData= [
    {gender: 'Male'},
    {gender: 'Female'},
  ];
  colorRowData= [
    {color: 'Gold'},
    {color: 'Silver'},
    {color: 'Rose Gold'},  
  ];
  styleRowData= [
    {style: 'Slim Fit'},
    {style: 'Casual'},
    {style: 'V-Neck'},
  ];
  typeRowData= [
    {type: 'Long Sleeve'},
    {type: 'Short Sleeve'},
  ];

  public fabricColDefs: ColDef[] = [
    { field: 'fabric', 
      headerName: 'Fabric', 
      checkboxSelection: true,
      headerCheckboxSelection: true,
      filter: 'agSetColumnFilter'
    }
  ];

  public genderColDefs: ColDef[] = [
    { field: 'gender', 
      headerName: 'Gender',
      checkboxSelection: true,
      headerCheckboxSelection: true,
      filter: 'agSetColumnFilter' }
  ];

  public colorColDefs: ColDef[] = [
    { field: 'color', 
      headerName: 'Color', 
      checkboxSelection: true,
      headerCheckboxSelection: true,
      filter: 'agSetColumnFilter' }
  ];

  public styleColDefs: ColDef[] = [
    { field: 'style', 
      headerName: 'Style', 
      checkboxSelection: true,
      headerCheckboxSelection: true,
      filter: 'agSetColumnFilter' }
  ];

  public typeColDefs: ColDef[] = [
    { field: 'type', 
      headerName: 'Type', 
      checkboxSelection: true,
      headerCheckboxSelection: true,
      filter: 'agSetColumnFilter' }
  ];

  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 150,
    filter: true,
    floatingFilter: true
  };

  public themeClass: string = 'ag-theme-quartz';
  public rowSelection: 'multiple' | 'single' = 'multiple';

  constructor(private http: HttpClient) {}

  

  onGridReady(params: GridReadyEvent) {
    params.api.sizeColumnsToFit();
  }
}

