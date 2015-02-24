(function(){
  var MODE;

  window.onload = function(){
    init();
  };
  
  function init(){
    console.log("start");
    
    checkMode();
    
    var leftbtn = document.getElementById("leftbtn");
    leftbtn.addEventListener("click",function(){
      console.log("btn click");
      send("http://lantern.local:3001/left/");
    });
    var rightbtn = document.getElementById("rightbtn");
    rightbtn.addEventListener("click",function(){
      console.log("btn click");
      send("http://lantern.local:3001/right/");
    });
    var autobtn = document.getElementById("autobtn");
    autobtn.addEventListener("click",function(){
      console.log("btn click");
      send("http://lantern.local:3001/auto/");
      MODE = "play";
      document.getElementById("play").style.visibility = "visible";
      document.getElementById("auto").style.visibility = "hidden";
    });
  }
  
  function send(url){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function(){
      if (xhr.readyState === 4 && xhr.status === 200){
        console.log(xhr.responseText);
      }
    };
    xhr.send(null);
  }
  
  function checkMode(){
    var url = "http://lantern.local:3001/checkmode/";
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function(){
      if (xhr.readyState === 4 && xhr.status === 200){
        var result = JSON.parse(xhr.responseText);
        MODE = result.mode;
        console.log(MODE);
        if(MODE == "play"){
          document.getElementById("play").style.visibility = "visible";
          document.getElementById("auto").style.visibility = "hidden";
        }else if(MODE == "auto"){
          document.getElementById("play").style.visibility = "hidden";
          document.getElementById("auto").style.visibility = "visible";
        }
      }
    };
    xhr.send(null);
  
  }
  
})();
