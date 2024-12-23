import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class PostService{
    getPosts(){
        return Promise.resolve(['1','2','3'])
    }
}