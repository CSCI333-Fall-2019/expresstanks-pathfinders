/* # # # # # # # # # # Documentation # # # # # # # # # # */
// Author:  Des
// Date:    11/14/2019
// Purpose: Generates a map for the tanks to move around on
/* # # # # # # # # # # # # # # # # # # # # # # # # # # # */

/* # # # # # # # # # # Documentation # # # # # # # # # # */
class Map {
   // Takes a text file and interprets the characters in it to create an array of the various spaces
      constructor() {
      // Set up starting zone arrays
      this.sz_t1 = [];
      this.sz_t2 = [];
      this.sz_t3 = [];
      this.sz_t4 = [];
      this.sz_t5 = [];
      this.sz_t6 = [];
      this.sz_t7 = [];
      this.sz_t8 = [];
      this.sz_t9 = [];

      // Set up wall/obstacle array
      this.features = [];
      this.dropZone = [];
      this.buzzSpawn = [];
      this.nukeSpawn = [];

      // Load the map
      // TODO: LOAD TXT FILE INTO ARRAY OF ROW ARRAYS HOLDING COLUMNS
      // To set up a map, look at the MapSetupAndLegend.txt in the maps folder

      // For now, just have a string:
      var testMap = [];
      var row0 = ['1', '_', '_', '_', '_', '_', '_', '_', '_', '4'];

      var row1 = ['1', '_', '_', '_', '_', '_', '_', '_', '_', '4'];

      var row2 = ['1', '_', 'O', '_', '_', '_', '_', '_', '_', '4'];

      var row3 = ['1', '_', '_', '_', 'W', '_', '_', 'O', '_', '4'];

      var row4 = ['1', '_', '_', '_', 'W', '_', '_', '_', '_', '4'];

      var row5 = ['W', 'W', 'W', '_', 'W', '_', '_', 'W', 'W', 'W'];

      var row6 = ['3', 'O', '_', '_', 'W', '_', '_', '_', '_', '2'];

      var row7 = ['3', '_', '_', '_', 'W', '_', 'O', '_', '_', '2'];

      var row8 = ['3', '_', '_', '_', '_', '_', '_', '_', '_', '2'];

      var row9 = ['3', '_', '_', '_', '_', '_', '_', '_', '_', '2'];

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

      // let finalMap = mapText;
      let finalMap = testMap;

      // Set up map dimensions
      this.colCount = finalMap.length;
      this.rowCount = finalMap[0].length;

      // Create the objects
      for (let r = 0 ; r < finalMap.length ; r++) {
         for (let c = 0; c < finalMap[r].length ; c++) {
            // Translate the indexes to x, y coordinates
            let x = c * win.height;
            let y = r * win.width;
            let w = win.width / this.colCount;
            let h = win.height / this.rowCount;

            let packet = [x, y, w, h];

            if (0) // Keep alphabetized...
               return;
            else if (finalMap[r][c] == '1')
               this.sz_t1.push(packet);
            else if (finalMap[r][c] == '2')
               this.sz_t2.push(packet);
            else if (finalMap[r][c] == '3')
               this.sz_t3.push(packet);
            else if (finalMap[r][c] == '4')
               this.sz_t4.push(packet);
            else if (finalMap[r][c] == '5')
               this.sz_t5.push(packet);
            else if (finalMap[r][c] == '6')
               this.sz_t6.push(packet);
            else if (finalMap[r][c] == '7')
               this.sz_t7.push(packet);
            else if (finalMap[r][c] == '8')
               this.sz_t8.push(packet);
            else if (finalMap[r][c] == '9')
               this.sz_t9.push(packet);
            else if (finalMap[r][c] == 'W')
               this.features.push(new Wall(createVector(x, y)));
            else if (finalMap[r][c] == 'O')
               this.features.push(new Obstacle(createVector(x, y)));
            else if (finalMap[r][c] == 'D')
               this.dropZone.push(packet);
            else if (finalMap[r][c] = 'B')
               this.buzzSpawn.push(packet);
            else if (finalMap[r][c] = 'N')
               this.nukeSpawn.push(packet);
         }
      }
   }

   render() {
      // calls the render of each of its sub-objects
      this.features.forEach(feature => {
         feature.render();
      });
   }
}