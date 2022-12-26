export class FFRouter{
    bestCost = 1000000;

    constructor(data,favorites,free = undefined,home=undefined){
        if(!!favorites){
            this.favorites = new Set(favorites);
        }
        else{
            this.favorites = new Set();
        }

        this.free = free;
        this.home = home;
       
        this.data = data;
        this.tpc = data.teleportCosts
    }

    route(bookId){
        if(this.data){
            const bookData = this.data.bookLocations[bookId];
            const startLocation = "Mor Dhona";
            const remaining = Object.keys(bookData).filter((map)=>map!=startLocation);
            const path = this.exploreGraph(startLocation,remaining,0);
            this.bestCost = 1000000;
            return path;
        }
        else{
            return ['No data found.']
        }
    }

    exploreGraph(location,remaining,cost){
        let next;
        let path = false;
        for(let i = 0; i < remaining.length; i++){
            next = remaining[i];
            const nextCost = (this.free == next || this.home == next) ? 0 : (
                    this.favorites.has(next)
                        ? Math.floor(this.tpc[location][next]/2)
                        : this.tpc[location][next]
                );
            const newTotal = cost + nextCost;
            if(newTotal > this.bestCost){
                continue;
            }
            else if(remaining.length == 1){
                //If the cost is still under the best cost while we're checking the last map
                //Then we found a new best and the beginning of a valid path. Mark it and continue
                this.bestCost = newTotal;
                path = [next];
                continue;
            }

            //If we're successful but *not* at the bottom, continue exploring
            const newRemaining = remaining.filter((map)=>map!=next);
            const newPath = this.exploreGraph(next,newRemaining,newTotal);
            if(newPath){
                //If we found a path that made it through all maps without breaching the best cost, we have a new viable path to pass up
                path = newPath;
            }
        }
        //If we found something, return the viable path back up, including this node of the search
        if(path){
            return [location,...path];
        }
        //Otherwise, indicate the failure
        else{
            return false;
        }
    }

    listTasks(map,tasks){
        let returnData = {
            map,
            order:[]
        }

        for(let key in tasks){
            returnData.order.push(
                {
                    name:key,
                    ...tasks[key]
                }
            );
        }

        return returnData;
    }
}

