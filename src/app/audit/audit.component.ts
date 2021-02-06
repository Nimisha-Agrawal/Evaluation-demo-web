import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { debounceTime, distinctUntilChanged, first, mergeAll, tap } from 'rxjs/operators';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Audit, User } from '@/_models';
import { AuditService, AuthenticationService } from '@/_services';


@Component({ 
    templateUrl: 'audit.component.html',
    styles : [
       `
        table {
            width: 100%;
            overflow-x: auto;
            overflow-y: hidden;
            min-width: 800px;
        }
        
        th.mat-header-cell {
            text-align: left;
            display:absolute;
            max-width: 500px;
        }`
    ],
})
export class AuditComponent implements OnInit,AfterViewInit
{
    //audits = [];
    datePipe = 'hh:mm:ss';
   // dataSource : AuditDataSource;
    public displayedColumns= ["id","user","loginTime","logoutTime","ip"];
    public dataSource = new MatTableDataSource<Audit>();

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    @ViewChild('input',{static: true}) input: ElementRef;
    currentUser: User;
    
    
    constructor(
        private authenticationService: AuthenticationService,
        private auditService: AuditService
    ){
        this.currentUser = this.authenticationService.currentUserValue;
    }

    ngOnInit()
    {
       this.loadAllAudits();
        //this.dataSource = new AuditDataSource(this.auditService);
        //this.dataSource.loadLessons(1);
        //this.dataSource.loadLessons('', 'asc', 0, 3);
    }

    ngAfterViewInit(): void {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }

      public doFilter = (value: string) => {
        this.dataSource.filter = value.trim().toLocaleLowerCase();
      }

    changeFormat(event){
        this.datePipe = event.target.value;
    }

    /*ngAfterViewInit() {
        fromEvent(this.input.nativeElement,'keyup')
            .pipe(
                debounceTime(150),
                distinctUntilChanged(),
                tap(() => {
                    this.paginator.pageIndex = 0;
                    this.loadLessonsPage();
                })
            )
            .subscribe();

        this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
        
        merge(this.sort.sortChange, this.paginator.page)
            .pipe(
                tap(() => this.loadLessonsPage())
            )
            .subscribe();
    }

    loadLessonsPage() {
        this.dataSource.loadLessons(
            this.input.nativeElement.value,  this.sort.direction, 
            this.paginator.pageIndex, this.paginator.pageSize);
    }*/

    public loadAllAudits()
    {
        this.auditService.getAll()
            .pipe(first())
            .subscribe(res => {this.dataSource.data = res;console.log(this.dataSource.data)});
    }
}