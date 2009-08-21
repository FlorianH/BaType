

var Config = {

  'fps': 60,
  
  'bats_per_second': 1,
  
  'width': function() { return document.getElementById("canvas").width; },
  
  'height': function() { return document.getElementById("canvas").height; },
  
  'text_field_height': function() { return (document.getElementById("canvas").height/6); },
  
  'playingfield_height': function() { return (Config.height() - Config.text_field_height()); }
  
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
    self.ctx.fillRect (0, Config.playingfield_height(), Config.width(), Config.height());

    self.ctx.fillStyle = "rgb(255, 255, 255)";
    self.ctx.font = "24px 'Arial'";
    self.ctx.textBaseline = 'middle';
    self.ctx.textAlign = 'center';
    self.ctx.fillText(self.text+'_', Config.width()/2, Config.playingfield_height() + Config.text_field_height()/2 );
    
  }, //draw()

  'key_up': function(event) {
  
    switch(event.keyCode) {
    
      case Key.Enter:
        BaType.check_word(self.text);
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
    
  },//init()
  
  
  'draw': function() {

    PlayingField.draw_background();
    
    //draw the bats
    for(i=0; i < self.bats.length; i++)
      PlayingField.draw_bat( self.bats[i] );
    
    
  },//draw()
  
  'draw_background': function() {
  
    var objGradient = self.ctx.createRadialGradient(Config.width()/2, (Config.height()-Config.text_field_height()), 50, Config.width()/2, (Config.height()-Config.text_field_height()), Config.width()/2);
    objGradient.addColorStop(0, '#1C2F5C');
    objGradient.addColorStop(1, '#09152D');
    self.ctx.fillStyle = objGradient;
    self.ctx.fillRect(0, 0, Config.width(), (Config.height()-Config.text_field_height()));
    
  },//draw_background()
  
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
  
  },//draw_bat()


  'add_bat': function(caption) {
    
    self.bats.push({
      'caption': caption.toUpperCase(),
      'x': Math.random()* (Config.width() - bat_image.width),
      'y': Math.random()* (Config.playingfield_height() - bat_image.height)
    });
    
  },//add_bat()
  
  'remove_bat': function(caption) {
  
    for(i=0; i < self.bats.length; i++)
      if (self.bats[i].caption == caption)
        self.bats.splice(i,1);
  
  }//remove_bat()

}//PlayingField








var BaType = {

  'canvas': null,

  'ctx': null, //the canvas context


  'init': function() {
  
      self.canvas = document.getElementById("canvas");
      self.ctx = self.canvas.getContext("2d");
      
      self.canvas.width = window.innerWidth;
      self.canvas.height = window.innerHeight;
      
      Textfield.init(self.ctx);
      PlayingField.init(self.ctx);
      
      
      setInterval( BaType.draw, 1000/Config.fps );
      setInterval( BaType.add_bat, 1000/Config.bats_per_second );
      
  },//init()
  
  
  'check_word': function(word) {

    console.log("Das Wort:" + word);
    PlayingField.remove_bat(word);
  
  },//check_word()
  
  'draw': function() {

      //clear canvas
      self.ctx.clearRect(0,0,self.canvas.width,self.canvas.height); 

      Textfield.draw();
      PlayingField.draw();

    },//draw()
    
    'add_bat': function() {
    
      var index = Math.floor( Math.random() * Wordlist.length );
    
      console.log("ADDED: " +  Wordlist[index] );
    
      PlayingField.add_bat( Wordlist[index] );
    
    }//add_bat()

}

