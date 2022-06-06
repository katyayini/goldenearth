
var searchEl = document.querySelector('#search-term');
var clickBtnEl = document.querySelector('#search-btn');
var historyEl = document.querySelector('#search-history');
var container= document.querySelector('#info-container');
var container1El= document.createElement('div')
var container2El= document.createElement('div')
var container3El= document.createElement('div')
var containerp= document.createElement('p')
var image1El=document.createElement('img');
var image2El=document.createElement('img');
var image3El=document.createElement('img');
var arr= [];
var items=[];



function clickedSearch() {
  
  var searchString = searchEl.value;
  

  if (searchString) {
    arr.push(searchString);
    localStorage.setItem("search", JSON.stringify(arr))
    var termSearchedLi = document.createElement("li");
    var termSearchedBtn=document.createElement("button");
    termSearchedBtn.textContent=searchString;
    termSearchedBtn.style.backgroundColor="#6C0986";
    termSearchedBtn.style.borderRadius="4px";
    termSearchedBtn.style.padding="4px 6px 4px 6px";
    termSearchedBtn.style.margin="2px";
    termSearchedBtn.style.color="white";
    termSearchedBtn.style.fontWeight="bold";
    termSearchedLi.appendChild(termSearchedBtn);
    historyEl.appendChild(termSearchedLi);
    getSearchData(searchString);  

  }
  
}


function getSearchData(sstring) {
  fetch("https://gateway.marvel.com/v1/public/comics?ts=1654105758&apikey=24921baf892e0ed42e2d60ca5d5deade&hash=49cb118bcbcd4dee237d7ce1d0a8921a&limit=100&offset=1100")
  .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          console.log(data);
            displaySearchInfo(data, sstring);

         });
      }});
    }

 function displaySearchInfo(sData, sstring) {
  var j=0;
  
  for (var i=0; i<100; i++)
  {
  if((sData['data']['results'][i]['title'].includes(sstring)||sData['data']['results'][i]['title'].toLowerCase().includes(sstring))&& j<3) 
  {
    if(j===0)
    {   
    container1El.innerHTML=sData['data']['results'][i]['title'];
    container1El.style.backgroundColor= "#DBC7E1";
    container1El.style.marginRight= "4px";
    container1El.style.fontWeight= "bold";
    container1El.style.padding= "4px";
    container1El.style.border= "black solid 4px";
    image1El.src= sData['data']['results'][i]['thumbnail']['path']+"/standard_large.jpg";
    image1El.style.margin="auto";
    container1El.appendChild(image1El);
    container.appendChild(container1El);
    
    }
    else if(j===1)
    {
    container2El.innerHTML=sData['data']['results'][i]['title'];
    container2El.style.backgroundColor= "#DBC7E1";
    container2El.style.marginRight= "4px";
    container2El.style.fontWeight= "bold";
    container2El.style.padding= "4px";
    container2El.style.border= "black solid 4px";
    image2El.src= sData['data']['results'][i]['thumbnail']['path']+"/standard_large.jpg";
    image2El.style.margin="auto";
    container2El.appendChild(image2El);
    container.appendChild(container2El);
    }
    
    else if(j===2)
    {
    
    container3El.innerHTML=sData['data']['results'][i]['title'];
    container3El.style.backgroundColor= "#DBC7E1";
    container3El.style.border= "black solid 4px";
    container3El.style.fontWeight= "bold";
    container3El.style.padding= "4px";
    image3El.src= sData['data']['results'][i]['thumbnail']['path']+"/standard_large.jpg";
    image3El.style.margin="auto";
    container3El.appendChild(image3El);
    container.appendChild(container3El);

    }
    j=j+1;
  } 

  }
  
  } 

  function clickedHistoryBtn(event)
  {
   var btnText=event.target.innerHTML;
   getSearchData(btnText); 

  }
  
  function init(){
    items =JSON.parse(localStorage.getItem("search"));
    for(var i=0; i<items.length; i++)
     {
      var termSearchedLi = document.createElement("li");
      var termSearchedBtn=document.createElement("button");
      termSearchedBtn.textContent=items[i];
      termSearchedBtn.style.backgroundColor="#6C0986";
      termSearchedBtn.style.borderRadius="4px";
      termSearchedBtn.style.padding="4px 6px 4px 6px";
      termSearchedBtn.style.margin="2px";
      termSearchedBtn.style.color="white";
      termSearchedBtn.style.fontWeight="bold";
      termSearchedLi.appendChild(termSearchedBtn);
      historyEl.appendChild(termSearchedLi);
     }
  }
    
    
  clickBtnEl.addEventListener('click', clickedSearch)
  historyEl.addEventListener('click', clickedHistoryBtn)
  init();

    