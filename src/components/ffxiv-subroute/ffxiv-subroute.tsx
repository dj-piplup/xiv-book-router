import { Component, h, Prop } from '@stencil/core';
const gcList = new Set(['Maelstrom','Flames','Adder']);

@Component({
  tag: 'ffxiv-subroute',
  styleUrl: 'ffxiv-subroute.css',
  shadow: true,
})
export class FfxivSubroute {
  @Prop({mutable:true}) data;
  @Prop({mutable:true}) home;

  get title(){
    if(this.data.map == this.home){
      return `${this.home} (use return)`;
    }
    else{
      return this.data.map
    }
  }

  generateIcon(task){
    let icon = null;
    if(task.type == 'fate'){
      icon = <img class='icon' src='/assets/FATE.png'/>;
    }
    else if(task.type == 'leve'){
      icon= <img class='icon' src='/assets/Leve.png'/>;
    }
    return icon;
  }

  generateGCIcon(task){
    let gcIcon = null;
    if(task['leve-giver'] && gcList.has(task['leve-giver'])){
      let iconSrc = `/assets/${task['leve-giver']}.png`;
      gcIcon= <img class='icon' src={iconSrc}/>;
    }
    return gcIcon;
  }

  render() {
    return (
      <div>
        <h3>{this.title}</h3>
        <hr/>
        <ul>
        {this.data.order.map((task)=>{
          
          return <li>
            <input type="checkbox"></input>{task.name} {this.generateIcon(task)}{this.generateGCIcon(task)}: ({task.x}, {task.y})
          </li>
        })}
        </ul>
      </div>
    );
  }

}
