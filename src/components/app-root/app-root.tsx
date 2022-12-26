import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
  shadow: true,
})
export class AppRoot {

  defaultFavorites = [];
  defaultFree = '';
  defaultHome = '';

  favorites = window.localStorage.getItem('favorites')?.split('|') || [];
  free = window.localStorage.getItem('freeDest') || '';
  home = window.localStorage.getItem('homeDest') || '';

  render() {
    return (
      <Host>
        <ffxiv-route favorites={this.favorites} freeDest={this.free} home={this.home}></ffxiv-route>
      </Host>
    );
  }

}
