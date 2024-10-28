import { Component } from '@angular/core';
import { GifsService } from '../../../gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
    //injecta aqui el servicio de gifs y in un ngFor muestralo en el html,
    //el servicio sera privado por lo que habra que gestionar un metodo public que pueda usarlo
    constructor( private gifsService:GifsService ){

    }

    public searchHistory() :string[] {
       return this.gifsService.tagsHistory
    }

    searchTag(tag:string): void{
        this.gifsService.searchTag(tag);
    }
}
