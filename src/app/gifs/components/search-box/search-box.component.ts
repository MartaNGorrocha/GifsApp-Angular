import { GifsService } from './../../services/gifs.service';
import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
    selector: 'gifs-search-box',
    template:`
    <label>Buscar:</label>
    <input
        type="text"
        class="form-control"
        placeholder="Buscar gifs"
        (keyup.enter)="searchTag()"
        #txtTagInput
    >
    `
})

export class SearchBoxComponent {
    //@ViewChild: Nos sirve para poder tomar una referencia local del HTML
    @ViewChild("txtTagInput")
    public tagInput!: ElementRef<HTMLInputElement>;

    //Para usar un servicio se mete en el constructor
    constructor( private gifsService:GifsService ){}

    // searchTag(newTag:string){
    searchTag(){
        const newTag= this.tagInput.nativeElement.value;

        this.gifsService.searchTag(newTag);

        this.tagInput.nativeElement.value="";
    }
}
