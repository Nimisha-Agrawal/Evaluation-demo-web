import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { debounceTime, distinctUntilChanged, first, mergeAll, tap } from 'rxjs/operators';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Audit, User } from '@/_models';
import { AuditService, AuthenticationService } from '@/_services';


@Component({
    templateUrl: 'audit.component.html',
    styles: [
        `.mat-input-element{
            border:outset;
            background:white;
            padding:2px;
        }
        .hide{
                display:null;
        }
        .mat-footer-row mat-footer-cell{
            justify-content : center;
            font-style: italic;
        }
        tr.mat-row{
            display:flex;
        }
        tr.mat-row, tr.mat-footer-row{
            height:auto;
        }
        th.mat-header-cell:first-of-type, td.mat-cell:first-of-type, td.mat-footer-cell:first-of-type{
            padding:28px 35px;
        }
        th.mat-header-cell, td.mat-cell, td.mat-footer-cell {
            padding: 2px 40px;
            border-bottom-width: 3px;
            border-bottom-style: solid;
        }
        .mat-cell{
            flex: 1;
    display: flex;
    align-items: center;
    overflow: hidden;
    word-wrap: break-word;
    min-height: inherit;
    flex-wrap: wrap;
    word-break: break-all;
    padding: 5px;
        }
        tr.mat-header-row{
            height:auto;
        } 
        body {
            margin: 0;
            padding: 0;
           background-color: #004882;
          }
          .mat-paginator-container
          {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            padding: 10px 10px;
            flex-wrap: wrap-reverse;
            width: 100%;
            margin: 30px 2px;
        }
          .box {
            position: absolute;
            right: 0;
            top: 0;
            transform: translate(+35%, -60%);
          }
          
          .box select {
            background-color: #0563af;
            color: white;
            padding: 12px;
            width: 250px;
            border: none;
            font-size: 20px;
            box-shadow: 0 5px 25px rgba(0, 0, 0, 0.2);
            -webkit-appearance: button;
            appearance: button;
            outline: none;
          }
          
          .box::before {
            content: "\f13a";
            font-family: FontAwesome;
            position: absolute;
            top: 0;
            right: 0;
            width: 20%;
            height: 100%;
            text-align: center;
            font-size: 28px;
            line-height: 45px;
            color: rgba(255, 255, 255, 0.5);
            background-color: rgba(255, 255, 255, 0.1);
            pointer-events: none;
          }
          
          .box:hover::before {
            color: rgba(255, 255, 255, 0.6);
            background-color: rgba(255, 255, 255, 0.2);
          }
          
          .box select option {
            padding: 30px;
          }
          .mat-sort-header-stem{
            height: 10px;
          } 
          .search{
              text-align: center;
          }
         /* .outer{
            border: 1px solid red;
            width:100%;
            display: flex;
            justify-content: center;
          }*/`

    ],
})
export class AuditComponent implements OnInit, AfterViewInit {
    //audits = [];
    datePipe = 'dd/MM/yyyy hh:mm:ss';
    // dataSource : AuditDataSource;
    public displayedColumns = ["id", "user", "loginTime", "logoutTime", "ip"];
    public dataSource = new MatTableDataSource<Audit>();

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild('input', { static: true }) input: ElementRef;
    currentUser: User;


    constructor(
        private authenticationService: AuthenticationService,
        private auditService: AuditService
    ) {
        this.currentUser = this.authenticationService.currentUserValue;
    }

    ngOnInit() {
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

    changeFormat(event) {
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

    private loadAllAudits() {
        this.auditService.getAll()
            //.pipe(first())
            .subscribe(res => { this.dataSource.data = res; console.log(this.dataSource.data) });

    }
}
