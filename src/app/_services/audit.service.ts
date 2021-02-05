import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Audit } from '@/_models';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuditService
{
    constructor(private http: HttpClient) { }
    
    getAll(
        filter = '', sortOrder = 'asc',
        pageNumber = 0, pageSize = 3):  Observable<Audit[]> {

        return this.http.get<Audit[]>(`${ config.apiUrl }/audits`,{
            params: new HttpParams()
                .set('filter', filter)
                .set('sortOrder', sortOrder)
                .set('pageNumber', pageNumber.toString())
                .set('pageSize', pageSize.toString())
        }).pipe(
            map(res =>  res["payload"])
        );
    }

    /*getAll(){
        return this.http.get<Audit[]>(`${ config.apiUrl }/audits`);
    }*/

    create(Audit: Audit)
    {
        return this.http.post(`${ config.apiUrl }/audits`, Audit);
    }

    delete(id: number)
    {
        return this.http.delete(`${ config.apiUrl }/audits/${ id }`);
    }
}