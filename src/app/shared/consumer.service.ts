import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable()
export class ConsumerService {
    private _dataSource = new Subject<any>();
    _data$ = this._dataSource.asObservable();
    shareData(data: any) {
        this._dataSource.next(data);
    }
}