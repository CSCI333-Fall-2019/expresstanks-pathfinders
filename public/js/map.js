/* # # # # # # # # # # Documentation # # # # # # # # # # */
// Author:  Des
// Date:    11/14/2019
// Purpose: Generates a map for the tanks to move around on
/* # # # # # # # # # # # # # # # # # # # # # # # # # # # */

// To set up a map, look at the MapSetupAndLegend.txt in the maps folder

// For now, just have a string:
var testMap = [];
var row0 = ['1', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '4'];
var row1 = ['1', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '4'];
var row2 = ['1', ' ', 'O', ' ', ' ', ' ', ' ', ' ', ' ', '4'];
var row3 = ['1', ' ', ' ', ' ', 'W', ' ', ' ', 'O', ' ', '4'];
var row4 = ['1', ' ', ' ', ' ', 'W', ' ', ' ', ' ', ' ', '4'];
var row5 = ['W', 'W', 'W', ' ', 'W', ' ', ' ', 'W', 'W', 'W'];
var row6 = ['3', 'O', ' ', ' ', 'W', ' ', ' ', ' ', ' ', '2'];
var row7 = ['3', ' ', ' ', ' ', 'W', ' ', 'O', ' ', ' ', '2'];
var row8 = ['3', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '2'];
var row9 = ['3', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '2'];

testMap.push(row0);
testMap.push(row1);
testMap.push(row2);
testMap.push(row3);
testMap.push(row4);
testMap.push(row5);
testMap.push(row6);
testMap.push(row7);
testMap.push(row8);
testMap.push(row9);

/* # # # # # # # # # # Documentation # # # # # # # # # # */
class Map {
   // Takes a text file and interprets the characters in it to create an array of the various spaces
   constructor(mapText) {
      testMap.forEach(row => {
         row.forEach(cell => {
            console.log(cell);
         });
      });
      testMap;
   }
}