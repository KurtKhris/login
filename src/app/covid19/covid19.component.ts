import { Component, OnInit,ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CountryReports } from 'src/countryReports';
import { ApiServicesService } from '../api-services.service'
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-covid19',
  templateUrl: './covid19.component.html',
  styleUrls: ['./covid19.component.less']
})
export class Covid19Component implements OnInit {
  ELEMENT_DATA! : CountryReports[];
  displayedColumns: string[] = ['country', 'cases', 'todayCases', 'deaths', 'todayDeaths', 'recovered', 'active', 'critical', 'casesPerOneMillion', 'deathsPerOneMillion', 'tests', 'testsPerOneMillion' ];
  dataSource = new MatTableDataSource<CountryReports>(this.ELEMENT_DATA);
  fileName='Covid19_Country_Reports.xlsx';
  pdffileName='Covid19_Country_Reports.pdf';


   //Pagination
   @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
   @ViewChild(MatSort, {static: true}) sort!: MatSort;
  constructor(private service: ApiServicesService) { }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getAllReports();
  }

  public getAllReports(){
    let res=this.service.covid19Reports();
    res.subscribe(report=>this.dataSource.data=report as CountryReports[]);
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  exportexcel(): void{
    /* table id is passed over here */
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }


}
