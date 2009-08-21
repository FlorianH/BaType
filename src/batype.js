

var Config = {

  'fps': 60,
  'width': 640,
  'height': 480,
  'text_field_height': 80,
  'bat_per_seconds': 1

}

var Wordlist = [
  "HASE",
  "AUTO",
  "KATZE"
]

var Key = {
  'Backspace': 8,
  'Enter': 13
}



var Textfield = {
  
  
  'ctx': null, //the canvas context
  
  'text': null, //The text that the user entered


  'init': function(ctx) {
  
    self.ctx = ctx;
    self.text = '';
  
    document.onkeyup = Textfield.key_up;   
  
  }, //init()
  
  
  'draw': function() {

    self.ctx.fillStyle = "rgb(9,21,45)";
    self.ctx.fillRect (0, (Config.height-Config.text_field_height), Config.width, Config.height);

    self.ctx.fillStyle = "rgb(255, 255, 255)";
    self.ctx.font = "24px 'Arial'";
    self.ctx.textBaseline = 'middle';
    self.ctx.textAlign = 'center';
    self.ctx.fillText(self.text+'_', Config.width/2, (Config.height-(Config.text_field_height/2)));
    
  }, //draw()


  'key_up': function(event) {
  
    switch(event.keyCode) {
    
      case Key.Enter:
        Spielsteuerung.check_word(self.text);
        self.text = '';
        break;
        
      case Key.Backspace:
        self.text = self.text.slice(0,-1);
        break;
        
      default:
        self.text += String.fromCharCode(event.keyCode);
    }//switch
  
  }//key_up()


}//Textfield



var PlayingField = {

  'bats': null,
  
  'bat_image': null,

  'init': function(ctx){
  
    self.ctx = ctx;
    self.bats = [];
    
    self.bat_image = new Image(); 
    self.bat_image.src="bat.png";
    
  },
  
  
  'draw': function() {
      
    
    PlayingField.draw_background();
    
    //draw the bats
    for(i=0; i < self.bats.length; i++) {
      PlayingField.draw_bat( self.bats[i] );
    }
    
  },
  
  'draw_background': function() {
  
    var objGradient = self.ctx.createRadialGradient(Config.width/2, (Config.height-Config.text_field_height), 50, Config.width/2, (Config.height-Config.text_field_height), Config.width/2);
    objGradient.addColorStop(0, '#1C2F5C');
    objGradient.addColorStop(1, '#09152D');
    self.ctx.fillStyle = objGradient;
    self.ctx.fillRect(0, 0, Config.width, (Config.height-Config.text_field_height));
    
  },
  
  'draw_bat': function(bat) {

      //draw the bat image      
      self.ctx.drawImage(self.bat_image,bat.x, bat.y); 

      //draw the bat's text
      self.ctx.font = "18px 'Arial'";
      self.ctx.textAlign = 'center';
      
      self.ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
      self.ctx.fillText(bat.caption, 1 + bat.x + bat_image.width/2, 1 + bat.y + bat_image.height);
      
      self.ctx.fillStyle = "rgb(255, 255, 255)";
      self.ctx.fillText(bat.caption, bat.x + bat_image.width/2, bat.y + bat_image.height);
  
  },


  'add_bat': function(caption) {
    
    self.bats.push({
      'caption': caption.toUpperCase(),
      'x': Math.random()* (640 - bat_image.width),
      'y': Math.random()* (400 - bat_image.height)
    });
  },
  
  'remove_bat': function(caption) {
  
    for(i=0; i < self.bats.length; i++)
      if (self.bats[i].caption == caption)
        self.bats.splice(i,1);
  
  }

}//PlayingField








var Spielsteuerung = {

  'canvas': null,

  'ctx': null, //the canvas context

  

  'init': function() {
  
      self.canvas = document.getElementById("canvas");
      self.ctx = self.canvas.getContext("2d");
      
      console.log("INIT");
      console.log(self.ctx);
      
      Textfield.init(self.ctx);
      PlayingField.init(self.ctx);
      
  },
  
  
  'check_word': function(word) {

    console.log("Das Wort:" + word);
    PlayingField.remove_bat(word);
  
  },
  
  'draw': function() {

      //clear canvas
      self.ctx.clearRect(0,0,self.canvas.width,self.canvas.height); 

      Textfield.draw();
      PlayingField.draw();

    },
    
    'add_bat': function() {
    
      var index = Math.floor( Math.random() * Wordlist.length );
    
      console.log("ADDED: " +  Wordlist[index] );
    
      PlayingField.add_bat( Wordlist[index] );
    
    }

}


function init() {

  Spielsteuerung.init();
  
  setInterval( Spielsteuerung.draw, 1000/Config.fps );
  setInterval( Spielsteuerung.add_bat, 1000/Config.bat_per_seconds );
     
}
