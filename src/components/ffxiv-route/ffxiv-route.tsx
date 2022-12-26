import { Component, Prop, h, State, Listen, Host, Element } from '@stencil/core';
import { FFRouter } from '../../utils/routing';


@Component({
  tag: 'ffxiv-route',
  styleUrl: 'ffxiv-route.css',
  shadow: true,
})
export class FFBookRouter {
  @Prop({mutable:true}) favorites: string[];
  @Prop({mutable:true}) freeDest: string;
  @Prop({mutable:true}) home: string;
  @State() data;
  @State() router: FFRouter;
  @State() bookList: string[];
  @State() currentBook: string;
  @Element() el: HTMLElement;

  @Listen('input')
  selectData(e){
    let inputElement = e.path[0];
    if(inputElement.id=='bookSelect'){
      this.currentBook = inputElement.value;
      return;
    }
    else if(inputElement.id=='freeSelect'){
      if(this.freeDest == inputElement.value) return;
      this.freeDest = inputElement.value;
      window.localStorage.setItem('freeDest',this.freeDest)
    }
    else if(inputElement.id=='homeSelect'){
      if(this.home == inputElement.value) return;
      this.home = inputElement.value;
      window.localStorage.setItem('homeDest',this.home)
    }
    else if(inputElement.classList.contains('favoriteSelect')){
      const elements = inputElement.parentElement.querySelectorAll('.favoriteSelect');
      let changed = false;
      let newFavorites = [];
      elements.forEach((input:HTMLSelectElement) =>{
        if(!this.favoriteSet.has(input.value)){
          changed = true;
        }
        newFavorites.push(input.value);
      });
      if(!changed){
        return;
      }
      this.favorites = newFavorites;
      window.localStorage.setItem('favorites',this.favorites.join('|'));
    }
    else{
      return;
    }

    //If we got to this point, something has changed in the router params
    this.router = new FFRouter(this.data,this.favorites,this.freeDest,this.home)
  }

  get favoriteSet(){
    return new Set(this.favorites);
  }
  
  constructor(){
    this.currentBook = 'Skyfire I'
    this.freeDest = this.freeDest ?? '';
    this.favorites = this.favorites ?? [];
    this.home = this.home ?? '';
    fetch('/assets/data.json')
      .then((response)=>response.json())
      .then((data)=> {this.data = data})
      .then(()=> {this.router = new FFRouter(this.data,this.favorites,this.freeDest,this.home)})
      .then(()=> {this.bookList = Object.keys(this.data.bookLocations)});

  }

  render() {
    if(this.data){
      return <Host>
        <div class='box-column'>
          <div class = 'inputs'>
            <div>
              <strong>Book:</strong><br/>
              <select id='bookSelect'>
                {this.bookList?.map((bookId)=>{
                  if(bookId == this.currentBook){
                    return <option value={bookId} selected>Book of {bookId}</option>
                  }
                  return <option value={bookId}>Book of {bookId}</option>
                })}
              </select>
            </div>
            <div><strong>Free Location:</strong>
            <select id='freeSelect'>
              {this.data?.allLocations.map((location)=>{
                if(location == this.freeDest){
                  return <option value={location} selected>{location}</option>
                }
                return <option value={location}>{location}</option>
              })}
            </select></div>
            <div><strong>Home Location:</strong>
            <select id='homeSelect'>
              {this.data?.allLocations.map((location)=>{
                if(location == this.home){
                  return <option value={location} selected>{location}</option>
                }
                return <option value={location}>{location}</option>
              })}
            </select></div>
            <div><strong>Favorites:</strong>
            <select class='favoriteSelect'>
              {this.data?.allLocations.map((location)=>{
                if(this.favorites[0] == location){
                  return <option value={location} selected>{location}</option>
                }
                return <option value={location}>{location}</option>
              })}
            </select>
            <select class='favoriteSelect'>
              {this.data?.allLocations.map((location)=>{
                if(this.favorites[1] == location){
                  return <option value={location} selected>{location}</option>
                }
                return <option value={location}>{location}</option>
              })}
            </select>
            <select class='favoriteSelect'>
              {this.data?.allLocations.map((location)=>{
                if(this.favorites[2] == location){
                  return <option value={location} selected>{location}</option>
                }
                return <option value={location}>{location}</option>
              })}
            </select>
            <select class='favoriteSelect'>
              {this.data?.allLocations.map((location)=>{
                if(this.favorites[3] == location){
                  return <option value={location} selected>{location}</option>
                }
                return <option value={location}>{location}</option>
              })}
            </select></div>
          </div>
          <div class = 'inputs'>
            <dungeon-list dungeons={this.data?.dungeons[this.currentBook]}></dungeon-list>
          </div>
        </div>
        <div class='output'>
          <h2>
            Book of {this.currentBook}  
          </h2>
          <hr/>
          <div class='subrouteContainer'>
            {this.router?.route(this.currentBook ?? 'Skyfire I').map((location)=>
              {if(this.currentBook){
                return <ffxiv-subroute key={this.currentBook+location} home={this.home} data={this.router.listTasks(location,this.data?.bookLocations[this.currentBook][location])}></ffxiv-subroute>
              }}
            )}
          </div>
        </div>
        </Host>;
    }
    else{
      return <div></div>
    }
  }
}
