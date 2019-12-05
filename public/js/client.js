var win;
//var tank; // Just this instance of the tank
let tanks = []; // All tanks in the game 
let shots = []; // All shots in the game
var mytankid;
var myTankIndex = -1;
var testMap;
var isOnWall;
var obsPos;
var obstacle;

var wallPos;
// var wall = [];
var socket;
var oldTankx, oldTanky, oldTankHeading;
var fps = 60; // Frames per second
var PlayerName = "";
var DEBUG = 0;
var map; // 11/21/2019 - Heidi - Map object (which will be transmitted down from the server rather than created here)

// Initial Setup
function setup() {
  //map = new Map(testMap); // 11/21/2019 - Heidi - Map object (which will be transmitted down from the server rather than created here)
  isOnWall = false;
  // Get the Player
  PlayerName = document.getElementById('playerName').value;
  console.log('Player: ' + PlayerName);

  // Set drawing parmameters
  rectMode(CENTER);
  textAlign(CENTER, CENTER);

  // Set window size and push to the main screen
  // Good DEV size
  win = { width: 600, height: 600 };
  // Good PROD size
//  win = { width: 900, height: 700 };
  var canvas = createCanvas(win.width, win.height);
  canvas.parent('sketch-holder');

  map = new Map(); // 11/21/2019 - Heidi - Map object (which will be transmitted down from the server rather than created here)
  console.log(map); // 11/21/2019 - Heidi - Map object (which will be transmitted down from the server rather than created here)
  
  // Set the framerate so everyone is *hopefully* the same
  frameRate(fps); // As low as possible to not tax slow systems

  // Create a socket to the main server
  const server = window.location.hostname + ":" + location.port;
  socket = io.connect(server, {transports: ['polling']});

  // All the socket method handlers
  socket.on('ServerReadyAddNew', ServerReadyAddNew);
  socket.on('ServerNewTankAdd', ServerNewTankAdd);
  socket.on('ServerTankRemove', ServerTankRemove);
  socket.on('ServerMoveTank', ServerMoveTank);
  socket.on('ServerResetAll', ServerResetAll);
  socket.on('ServerMoveShot', ServerMoveShot);
  socket.on('ServerNewShot', ServerNewShot);

  // Join (or start) a new game
  socket.on('connect', function(data) {
    socketID = socket.io.engine.id;
    socket.emit('ClientNewJoin', socketID);
  });
}
  
// Draw the screen and process the position updates
function draw() {
    background(0);

    map.render(); // 11/21/2019 - Heidi - Renders the map object (and any children of the map object)

    // Process shots
    for (var i = shots.length - 1; i >= 0; i--) {
      shots[i].render();
      shots[i].update();
      let curr = shots[i];
      map.features.forEach(wall => {
        if(wall.getsHitBy(curr)) {
          shots.splice(i,1);
        }
      });
        if(curr.offscreen()){
          shots.splice(i, 1);
        }else {
          let shotData = { x: curr.pos.x, y: curr.pos.y, 
            shotid: curr.shotid };
          socket.emit('ClientMoveShot', shotData);
        }
   
    }
    // Process all the tanks by iterating through the tanks array
    if(tanks && tanks.length > 0) {
      for (var t = 0; t < tanks.length; t++) {
        if(tanks[t].tankid==mytankid) {
          tanks[t].render();
          tanks[t].turn();
          tanks[t].update();
          tanks[t].turn();
          tanks[t].stayOnScreen(); //replaces the check for if they are beyond any of the boundaries
          
          map.features.forEach(wall => { // 11/21/2019 - Heidi - Handles the collision 
            wall.collision(tanks[t]);
           // console.log(collision);
          });

          
          
            
        }
        else {  
            tanks[t].render();
        }
      }
    }

      // To keep this program from being too chatty => Only send server info if something has changed
      if(tanks && tanks.length > 0 && myTankIndex > -1
        && (oldTankx!=tanks[myTankIndex].pos.x || oldTanky!=tanks[myTankIndex].pos.y || oldTankHeading!=tanks[myTankIndex].heading)) {
        let newTank = { x: tanks[myTankIndex].pos.x, y: tanks[myTankIndex].pos.y, 
          heading: tanks[myTankIndex].heading, tankColor: tanks[myTankIndex].tankColor, 
          tankid: tanks[myTankIndex].tankid };
        socket.emit('ClientMoveTank', newTank);
        oldTankx = tanks[myTankIndex].pos.x;
        oldTanky = tanks[myTankIndex].pos.y;
        oldTankHeading = tanks[myTankIndex].heading;
      }
    }
    

  // Handling pressing a Keys
  function keyPressed() {

    if(!tanks || myTankIndex < 0)
      return;

    // Can not be a destroyed tank!
    if (tanks[myTankIndex].destroyed)
      return;

    
    if (key == ' ') {                       // Fire Shell
      const shotid = random(0, 50000);
      shots.push(new Shot(shotid, tanks[myTankIndex].tankid, tanks[myTankIndex].pos, 
        tanks[myTankIndex].heading, tanks[myTankIndex].tankColor));
      let newShot = { x: tanks[myTankIndex].pos.x, y: tanks[myTankIndex].pos.y, heading: tanks[myTankIndex].heading, 
        tankColor: tanks[myTankIndex].tankColor, shotid: shotid, tankid: tanks[myTankIndex].tankid };
      socket.emit('ClientNewShot', newShot);
      return;
    } else if (keyCode == RIGHT_ARROW) {  // Move Right
      tanks[myTankIndex].setRotation(0.1);
    } else if (keyCode == LEFT_ARROW) {   // Move Left
      tanks[myTankIndex].setRotation(-0.1);
    } else if (keyCode == UP_ARROW) { 
      tanks[myTankIndex].moveForward(1.0);
    } else if (keyCode == DOWN_ARROW) {   // Move Back
      tanks[myTankIndex].moveForward(-1.0);
    }


  }

  // Release Key
  function keyReleased() {
    if(!tanks || myTankIndex < 0)
      return;

    //    if(keyCode == RIGHT_ARROW || keyCode == LEFT_ARROW)
    tanks[myTankIndex].setRotation(0.0);
//    if(keyCode == UP_ARROW || keyCode == DOWN_ARROW)
    tanks[myTankIndex].stopMotion();
  }

  
  //  ***** Socket communication handlers ******

  function ServerReadyAddNew(data) {

    // Reset the tanks
    tanks = [];
    mytankid = undefined;
    myTankIndex = -1;

    // Create the new tank
    // Make sure it's starting position is at least 20 pixels from the border of all walls
    let startPos = createVector(Math.floor(Math.random()*(win.width-40)+20), Math.floor(Math.random()*(win.height-40)+20));
    let startColor = color(Math.floor(Math.random()*255), Math.floor(Math.random()*255), Math.floor(Math.random()*255));
    let newTank = { x: startPos.x, y: startPos.y, heading: 0, tankColor: startColor, tankid: socketID, playername: PlayerName };


    // Create the new tank and add it to the array
    mytankid = socketID;
    myTankIndex = tanks.length;
    var newTankObj = new Tank(startPos, startColor, mytankid, PlayerName)
    tanks.push(newTankObj);

    // Send this new tank to the server to add to the list
    socket.emit('ClientNewTank', newTank);
  }

    // Server got new tank -- add it to the list
    function ServerNewTankAdd(data) {
      console.log('New Tank: ' + data);
      
      // Add any tanks not yet in our tank array
      var tankFound = false;
      if(tanks !== undefined) {
        for(var d=0; d < data.length; d++) {
          var foundIndex = -1;
          for(var t=0; t < tanks.length; t++) {
            // If found a match, then stop looking
            if(tanks[t].tankid == data[d].tankid) {
              tankFound = true;
              foundIndex = t;
              break;
            }
          }
          if(!tankFound && foundIndex < 0)
          {
            // Add this tank to the end of the array
            let startPos = createVector(Number(data[d].x), Number(data[d].y));
            let c = color(data[d].tankColor.levels[0], data[d].tankColor.levels[1], data[d].tankColor.levels[2]);
            let newTankObj = new Tank(startPos, c, data[d].tankid, data[d].playername);
            tanks.push(newTankObj);
          }
          tankFound = false;
        }
      }
  
    }

    function ServerTankRemove(socketid) {
//      console.log('Remove Tank: ' + socketid);

      if(!tanks || myTankIndex < 0)
      return;

      for (var i = tanks.length - 1; i >= 0; i--) {
        if(tanks[i].tankid == socketid) {
          tanks[i].destroyed = true;
          return;
        }
      }
    }

    function ServerMoveTank(data) {

      if(!tanks || !tanks[myTankIndex] || !data || !data.tankid || tanks[myTankIndex].tankid == data.tankid)
        return;

      for (var i = tanks.length - 1; i >= 0; i--) {
        if(tanks[i].tankid == data.tankid) {
            tanks[i].pos.x = Number(data.x);
            tanks[i].pos.y = Number(data.y);
            tanks[i].heading = Number(data.heading);
            break;
          }
      }
    }

    function ServerNewShot(data) {
      // First check if this shot is already in our list
      if(shots !== undefined) {
        for(var i=0; i < shots.length; i++) {
          if(shots[i].shotid == data.shotid) {
            return; // dont add it
          }
        }
      }
  
      // Add this shot to the end of the array
      let c = color(data.tankColor.levels[0], data.tankColor.levels[1], data.tankColor.levels[2]);
      shots.push(new Shot(data.shotid, data.tankid, createVector(data.x, data.y), data.heading, c));
    }

    function ServerMoveShot(data) {

      if(DEBUG && DEBUG==1)
        console.log('Move Shot: ' + data);

      for (var i = shots.length - 1; i >= 0; i--) {
        if(shots[i].shotid == data.shotid) {
          shots[i].pos.x = Number(data.x);
          shots[i].pos.y = Number(data.y);
          break;
        }
      }
    }

    // Handle a restart command
    function Restart() {
      socket.emit('ClientResetAll');
    }

    // The call to reload all pages
    function ServerResetAll(data) {
      console.log('Reset System');
      document.forms[0].submit();
//      location.reload();
    }
