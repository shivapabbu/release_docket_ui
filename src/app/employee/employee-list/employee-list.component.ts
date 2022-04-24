import { RepositoryService } from '../../shared/repository.service';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Employee } from '../../_interface/employee.model';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator'
import { ErrorHandlerService } from '../../shared/error-handler.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpEventType, HttpResponse } from '@angular/common/http';
@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit, AfterViewInit {
 
  selectedFiles?: FileList;
  progressInfos: any[] = [];
  message: string[] = [];

  fileInfos?: Observable<any>;

  public displayedColumns = ['sapId', 'fresherOrLateral', 'empName', 
  'projectName', 'details', 'update', 'delete'];
  public dataSource = new MatTableDataSource<Employee>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
 
  constructor(private repoService: RepositoryService, private errorService: ErrorHandlerService, private router: Router) { }
 
  ngOnInit() {
    this.getAllEmployees();
    // this.fileInfos = this.repoService.getFiles();
  }
 
  public getAllEmployees = () => {
    this.repoService.getData('employees')
    .subscribe(res => {
      this.dataSource.data = res as Employee[];
    },
    (error) => {
      this.errorService.handleError(error);
    })
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public customSort = (event) => {
    console.log(event);
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
 
  public redirectToDetails = (sapId: string) => {
    let url: string = `/employee/details/${sapId}`;
    this.router.navigate([url]);
  }
 
  public redirectToUpdate = (sapId: string) => {
    let url: string = `/employee/update/${sapId}`;
    this.router.navigate([url]);
  }

  public redirectToDelete = (sapId: string) => {
    let url: string = `/employee/delete/${sapId}`;
    this.router.navigate([url]);
  }

  public selectFiles(event: any): void {
    this.message = [];
    this.progressInfos = [];
    this.selectedFiles = event.target.files;
  }

  public upload(idx: number, file: File): void {
    this.progressInfos[idx] = { value: 0, fileName: file.name };

    if (file) {
      this.repoService.upload(file).subscribe(
        (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progressInfos[idx].value = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {
            const msg = 'Uploaded the file successfully: ' + file.name;
            this.message.push(msg);
            this.fileInfos = this.repoService.getFiles();
          }
        },
        (err: any) => {
          this.progressInfos[idx].value = 0;
          const msg = 'Could not upload the file: ' + file.name;
          this.message.push(msg);
          this.fileInfos = this.repoService.getFiles();
        });
    }
  }

  public uploadFiles(): void {
    this.message = [];

    if (this.selectedFiles) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.upload(i, this.selectedFiles[i]);
      }
    }
  }
 
}
