import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export abstract class ComponentDestroy implements OnDestroy {
    protected componentDestroy = new Subject();
    protected formInitialized = new Subject();
    protected actionEvent = new Subject();

    ngOnDestroy(): void {
        this.componentDestroy.next();
        this.componentDestroy.complete();
        this.formInitialized.complete();
        this.actionEvent.complete();
    }

}