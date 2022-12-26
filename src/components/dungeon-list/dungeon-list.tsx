import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'dungeon-list',
  styleUrl: 'dungeon-list.css',
  shadow: true,
})
export class DungeonList {
  @Prop() dungeons;

  render() {
    return (
      <Host>
        <h2>Dungeons</h2>
        <ul>
        {this.dungeons.map((name)=>
          <li><input type='checkbox'></input> {name}</li>
        )}
        </ul>
      </Host>
    );
  }

}
