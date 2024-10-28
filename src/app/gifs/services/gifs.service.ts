import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interface';

@Injectable({providedIn: 'root'})
export class GifsService {


    public gifList: Gif[] = [];

    private _tagsHistory: string[] = [];
    private apiKey: string = "yXaqmFCGudGM6MUOuUMO8vGFmV9FcV2U";
    private serviceUrl= 'http://api.giphy.com/v1/gifs';

    constructor(  private  http: HttpClient) {
        this.loadLocalStorage();
    }

    get tagsHistory(){
        return [...this._tagsHistory];
    }
    private organiceHistory(tag: string){
        tag= tag.toLowerCase()

        //con esto borro el tag anterior si estaba ya almacenado
        if( this._tagsHistory.includes(tag) ) {
            this._tagsHistory = this._tagsHistory.filter( (oldtag) => oldtag != tag )
        }

        this._tagsHistory.unshift(tag);
        //asi acortamos el arrary a 10 elementos
        this._tagsHistory = this._tagsHistory.slice(0, 10);
        this.saveLocalStorage();
    }

    private saveLocalStorage(): void{
        localStorage.setItem('history', JSON.stringify(this._tagsHistory))
    }

    private loadLocalStorage(): void{
        if(!localStorage.getItem('history')) return
        //ponemos ! al final para asegurarnos de que no va a ser nulo localStorage.getItem('history')
        this._tagsHistory =JSON.parse( localStorage.getItem('history')! );
        this.searchTag( this._tagsHistory[0]);

    }

    public searchTag( tag: string) {
        if (tag.length==0) return;
        this.organiceHistory(tag);

        const params = new HttpParams()
            .set('api_key', this.apiKey)
            .set('limit','10')
            .set('q',tag)

            //estao es un observable
        this.http.get<SearchResponse>(`${this.serviceUrl}/search`,{params})
            .subscribe( resp => {;
                this.gifList= resp.data;
                // console.log(this.gifList)
            })


    }


}
