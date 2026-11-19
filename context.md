## Base Condition

- ~~if the col is out of right side then return. No need to generate because we have found the path (I doubt it now. But will work on this)~~
- If no direction to visit remains then return. Means all directions exhausted then return.

## Cell becomes invalid in conditions:

- If cell is already visited
- If cell has >= 2 neighbors
- has reached out of bounds
  _In all above conditions do backtracking_

## Visited array

- maintain a currIdx of visited array.
- While backtracking call a function with visited[currIdx - 1];
- While pushing push next to currIdx and increment currIdx
- This makes sure elements are in good order.

## What data will be in visited array:

- it can have [{row, col}, {row, col}] This is good way
- we will store directions array in function itself. Its value is preserved. 

## What problems might happen:

- The end condition might not be good. We can figure out further good if possible in future.
- What I was thinking is right. Dont backtrack if we encounter the visited array. Instead before calling check if next cell is visited. If it is visited then regenreate random direction and check again until we find a cell not visited. for each cell we somehow need to maintain an array of possible directions.

## Data

- mazeGrid
- mazeWidth
- mazeHeight
- visited Array
- currIdx for visited array

## functions:

- initializeMaze => initialize maze
- isVisited => search in visited array
- isCrossedRightScreen => base condition
- isOutOfMazeBounds => true if given cell is out of maze bounds
- isSurroundedByTooManyNeighbors => for >= 2 condition
- getRandomDirection => to get random direction in vector format
- getRandom => to generate random number till limit

## How to perform backtracking:

- ~~I think backtracking can be done by simply doing another function call but passing visited[currIdx - 1]. Also in that function call we need to update currIdx = currIdx - 1;~~
- Return specific values to previous function and in the previous function decide the what path to take based on the return value. Basically it is not another call stack but a deliberate return. It is way simpler than thought.


## flow:

### older:
- first if base condition is true, then return.
- If any of the three condition is true then call: fn(mazeGrid, visited[currIdx-1][0], visited[currIdx-1][1], visited, currIdx-1);
- update mazeGrid[row][col] = 1;
- mark entry in visited array and update currIdx to currIdx + 1 in next call.
- generate random direction.
- call the function

### new: 
- if all directions exhausted. Means directions.length === 0 return "exhausted" this will let below function know that all calls have been exhausted. 
- 