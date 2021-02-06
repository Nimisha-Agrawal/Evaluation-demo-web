/*import { Audit } from "@/_models";
import { AuditService } from "@/_services";
//import { MatTableDataSource } from '@angular/material/table';
import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import { BehaviorSubject, Observable, of } from "rxjs";
import { catchError, finalize } from "rxjs/operators";

export class AuditDataSource implements DataSource<Audit> {
    audits = [];

    private auditUser = new BehaviorSubject<Audit[]>([]);
    private loadingUser = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingUser.asObservable();

    constructor(private auditService: AuditService) {}

    connect(collectionViewer: CollectionViewer): Observable<Audit[]> {
        return this.auditUser.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.auditUser.complete();
        this.loadingUser.complete();
    }

    loadLessons(filter = '',
                sortDirection = 'asc', pageIndex = 0, pageSize = 3) {

        this.loadingUser.next(true);

        this.auditService.getAll(filter, sortDirection,
            pageIndex, pageSize).pipe(
            catchError(() => of([])),
            finalize(() => this.loadingUser.next(false))
        )
        .subscribe(audits => {this.auditUser.next(audits);
            this.audits = audits;});
    }    
}

*/