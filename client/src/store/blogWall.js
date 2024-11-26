import {makeAutoObservable} from "mobx"

export default class BlogWall{

    constructor (){

        
        this._posts = [
         
        ]

        this._page = 1
        this._totalCount = 9
        this._limit = 3
        

        makeAutoObservable(this)
    }
    
    setPosts(posts) {
        this._posts = posts
    }
    
    setPage(page) {
        this._page = page
    }

    setTotalCount(count) {
        this._totalCount=count
    }

    
        get posts (){
        return this._posts
    }


    get totalCount () {
        return this._totalCount
    }

    get page () {
        return this._page
    }

    get limit (){
        return this._limit
    }
}