import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, shareReplay } from "rxjs";

@Injectable({
    providedIn: "root",
})
export class TitleService {
    url = "/assets/title.json";
    constructor(private _http: HttpClient) {}

    private titleData$!: Observable<any>;

    getTitleFormJSON() {
        this.titleData$ = this._http.get(this.url).pipe(shareReplay(1));
        return this.titleData$;
    }

    public geteachPageTitle(type: string): Observable<any> {
        return new Observable((observer) => {
            if (!this.titleData$) {
                this.getTitleFormJSON().subscribe((rightMenuData) => {
                    console.log(rightMenuData);
                    observer.next(rightMenuData[type]);
                    observer.complete();
                });
            } else {
                this.titleData$.subscribe((data) => {
                    observer.next(data[type]);
                    observer.complete();
                });
            }
        });
    }
}
