import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { debounceTime, distinctUntilChanged, first, mergeAll, tap } from 'rxjs/operators';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Audit } from '@/_models';
import { AuditService, AuthenticationService } from '@/_services';
import { AuditDataSource } from './auditDataSource';
import { merge ,fromEvent, scheduled } from 'rxjs';


@Component({ templateUrl: 'audit.component.html' })
export class AuditComponent implements OnInit,AfterViewInit
{
    //audits = [];
    datePipe = 'hh:mm:ss';
    dataSource : AuditDataSource;
    displayedColumns= ["id","user","loginTime","logoutTime","ip"];

    @ViewChild('MatPaginator',{static: true}) paginator: MatPaginator;
    @ViewChild('MatSort',{static:true}) sort: MatSort;

    @ViewChild('input',{static: true}) input: ElementRef;
    
    
    constructor(
        private authenticationService: AuthenticationService,
        private auditService: AuditService
    ){}

    ngOnInit()
    {
       // this.loadAllAudits();
        this.dataSource = new AuditDataSource(this.auditService);
        //this.dataSource.loadLessons(1);
        this.dataSource.loadLessons('', 'asc', 0, 3);
    }

    changeFormat(event){
        this.datePipe = event.target.value;
    }

    ngAfterViewInit() {
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
    }

    /*private loadAllAudits()
    {
        this.auditService.getAll()
            .pipe(first())
            .subscribe(res => this.dataSource.data = res as Audit[]);
    }*/
}