

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
  
  'init': function(ctx) {
  
    self.ctx = ctx;
    self.text = 'k';
  
    document.onkeydown = Textfield.key_up;   
  
  }, //init()
  
  'draw': function() {

    ctx.fillStyle = "rgb(9,21,45)";
    ctx.fillRect (0, Config.playingfield_height(), Config.width(), Config.height());

    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.font = "24px bold 'Arial'";
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.fillText(text+'_', Config.width()/2, Config.playingfield_height() + Config.text_field_height()/2 );
    
  }, //draw()

  'key_up': function(event) {
  
    switch(event.keyCode) {
    
      case Key.Enter:
        BaType.check_word(text);
        text = '';
        break;
        
      case Key.Backspace:
        text = text.slice(0,-1);
        window.event.cancelBubble = true;
        window.event.returnValue = false;
        break;
        
      default:
        text += String.fromCharCode(event.keyCode);
        
    }//switch
  
    return false;
  
  }//key_up()


}//Textfield



var PlayingField = {

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
  
    var objGradient = ctx.createRadialGradient(Config.width()/2, (Config.height()-Config.text_field_height()), 50, Config.width()/2, Config.playingfield_height(), Config.width()/2);
    objGradient.addColorStop(0, '#1C2F5C');
    objGradient.addColorStop(1, '#09152D');
    ctx.fillStyle = objGradient;
    ctx.fillRect(0, 0, Config.width(), (Config.height()-Config.text_field_height()));
    
  },//draw_background()
  
  'draw_bat': function(bat) {

      //draw the bat image      
      ctx.drawImage(bat_image,bat.x, bat.y); 

      //draw the bat's text
      ctx.font = "18px 'Arial'";
      ctx.textAlign = 'center';
      
      ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
      ctx.fillText(bat.caption, 1 + bat.x + bat_image.width/2, 1 + bat.y + bat_image.height);
      
      ctx.fillStyle = "rgb(255, 255, 255)";
      ctx.fillText(bat.caption, bat.x + bat_image.width/2, bat.y + bat_image.height);
  
  },//draw_bat()


  'add_bat': function(caption) {
    
    bats.push({
      'caption': caption.toUpperCase(),
      'x': Math.random()* (Config.width() - bat_image.width),
      'y': Math.random()* (Config.playingfield_height() - bat_image.height)
    });
    
  },//add_bat()
  
  'remove_bat': function(caption) {
  
    for(i=0; i < bats.length; i++)
      if (bats[i].caption == caption)
        bats.splice(i,1);
  
  }//remove_bat()

}//PlayingField








var BaType = {

  'init': function() {
  
      self.canvas = document.getElementById("canvas");
      BaType.ctx = canvas.getContext("2d");
      
      //maximize in window
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      Textfield.init(BaType.ctx);
      PlayingField.init(BaType.ctx);
      
      setInterval( BaType.draw, 1000/Config.fps );
      setInterval( BaType.add_bat, 1000/Config.bats_per_second );
      
  },//init()
  
  
  'check_word': function(word) {

    PlayingField.remove_bat(word);
  
  },//check_word()
  
  
  'draw': function() {

      //clear canvas
      BaType.ctx.clearRect(0,0,canvas.width,canvas.height); 

      Textfield.draw();
      PlayingField.draw();

    },//draw()
    
    'add_bat': function() {
    
      var index = Math.floor( Math.random() * Wordlist.length );
      PlayingField.add_bat( Wordlist[index] );
    
    }//add_bat()


}//BaType