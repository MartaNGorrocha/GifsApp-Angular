
import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'shared-lazy-image',
    templateUrl: 'lazy-image.component.html',
})
export class LazyImageComponent implements OnInit {
    // @Input() es un decorador para pasar datos del padre AL HIJO
    @Input()
    public url!: string;

    @Input()
    public title: string= "";

    public hasLoaded:boolean = false;

    ngOnInit(): void {
        if ( !this.url ) throw new Error('URL property is required')
    }

    onLoad(){
        setTimeout(() => {
            this.hasLoaded = true;
        }, 1000);

    }
}
