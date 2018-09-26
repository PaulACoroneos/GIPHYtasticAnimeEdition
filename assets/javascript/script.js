var objImage;
var topics = ["naruto","kurosaki","inuyasha","kinomoto","yugioh","luffy","Midoriya"];
var global_response;

//function generates a button and appends it to #button-area
function buttonGen(object) {
    var button = $("<button>");
    button.attr("value",object);
    button.addClass('objecty mr-1 ml-1 btn-secondary');
    button.text(object);
    $(".button-area").append(button);
}

//When text field is submitted generate a button! (using built in html5 to prevent submission if field empty)
$(".object-button").on("click", function(e) {
    e.preventDefault(); //DON'T REFRESH PAGE
    var object = $("#button-gen").val();    //get value in text field 
    topics.push(object); //add button to topics array
    console.log(topics);    
    if(object.length >0) {  //is it not empty
        buttonGen(object);
        $("#button-gen").val("");
    }

});

//when card-body is clicked in image-area animate it if it's not animated. Otherwise don't animate it
$(".image-area").on("click",".card-img-top", function(e) {

    var temp = $(this).attr("src");
    console.log("image src on click: "+temp);  

    //let's see if we are displaying animated or still version
    if(temp.includes("_s.gif") ) {   //does img src contain _s.gif

        //replace img src with animated
        console.log("still detected");
        temp = temp.replace("_s.gif", ".gif"); //replace still delimiter with normal delimiter for animated version
        console.log(temp);
        $(this).attr("src",temp);

    }
    else {
        //replace img src with still version
        console.log("animated detected");
        temp =temp.replace(".gif", "_s.gif"); //replace still delimiter with normal delimiter for animated version
        console.log(temp);
        $(this).attr("src",temp);    
    }

});

$(".favorite-area").on("click",".card-img-top", function(e) {

    var temp = $(this).attr("src");
    console.log("image src on click: "+temp);  

    //let's see if we are displaying animated or still version
    if(temp.includes("_s.gif") ) {   //does img src contain _s.gif

        //replace img src with animated
        console.log("still detected");
        temp = temp.replace("_s.gif", ".gif"); //replace still delimiter with normal delimiter for animated version
        console.log(temp);
        $(this).attr("src",temp);

    }
    else {
        //replace img src with still version
        console.log("animated detected");
        temp =temp.replace(".gif", "_s.gif"); //replace still delimiter with normal delimiter for animated version
        console.log(temp);
        $(this).attr("src",temp);    
    }

});

//if favorite button is pressed add the card corresponding to the favorite button to the favorite area
$(".image-area").on("click",".card .favorite", function(e) {
    e.preventDefault();
    var favCard = $("<div>");
    favCard.addClass("card mb-1");  
    favCard.attr("style","width: 18rem");
    var temp = $(this).closest('.card').html();    //capture card info into var
    favCard.append(temp);
    $(".favorite-area").append(favCard);
    stored.push(temp.innerHTML);  //add to favorites array
    console.log(temp.innerHTML);
    localStorage.setItem("favorites", JSON.stringify(stored));   //update keyword with new card added


});

//if download button is pressed download a copy of the photo
$(".image-area").on("click",".card .download", function(e) {
    e.preventDefault();
    //we are going to create an anchor tag and take advantage of download 
    var favCard = $("<div>");
    favCard.addClass("card mb-1");
    favCard.attr("style","width: 18rem");
    console.log("download clicked");
    var temp = $(this).closest('.card-img-top').html();    //capture img data

});

//when generated object button is pressed
$(".button-area").on("click",".objecty", function(e) {
    e.preventDefault(); //DON'T REFRESH PAGE
    var objectName = $(this).val();    //get value in buttons
    console.log(objectName);
    // create URL for get request + field input
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=Z4v8bNQShUGV21HziHzyKa5Xx8fVH8sX&q="+objectName+"&limit=150";
    console.log(queryURL);
    // call to API using stored URL. Only call the API once per feedback of my TA's
    
    $.ajax({
    url: queryURL,
    method: "GET"
    })

    // After the call is complete
    .then(function(response) {
        console.log(response);

        global_response = response; //need to store this globally for animated/non-animated
        for(var i=0; i<10;i++) {

            //rando = Math.floor(Math.random()*99)+1; //generate random result from GET request

            // store URL of cat image into a var
            var imageUrl = response.data[i].images.original_still.url;    //location of gif in giphy with still version
            var imgRating =response.data[i].rating;  //grab rating from JSON 
            var imgTitle = response.data[i].title;

            console.log(imgRating);
            var card = $("<div>");  //div to hold card
            card.addClass("card mb-1");
            card.attr("style","width: 18rem");

            var img = $("<img>");   //hold img
            img.addClass("card-img-top p-1");
            img.attr("src",imageUrl);
            img.attr("alt","giphy photo");

            //gif info as list
            var cardList = $("<ul>");
            cardList.addClass("list-group list-group-flush");

            //create list element for GIF rating
            var rating = $("<li>");
            rating.text("Rating: "+imgRating);
            rating.addClass("list-group-item");

            //create list element for GIF title
            var title = $("<li>");
            title.text("GIF Title: "+imgTitle);
            title.addClass("list-group-item");

            cardList.append(rating);
            cardList.append(title);

            var cardBody = $("<div>");
            cardBody.addClass("card-body");

            //generate favorite and download button 
            var favorite = $("<button>");
            var download = $("<button>");

            favorite.text("favorite");
            favorite.addClass("btn btn-secondary mr-1 mt-1 favorite")
            download.text("download");
            download.addClass("btn btn-secondary mt-1 download");


            //put together final card
            cardBody.append(cardList);
            cardBody.append(favorite);
            cardBody.append(download);
            card.append(img);
            card.append(cardBody);

            // add final card to GIF image area
            $(".image-area").prepend(card);
        }
    });


});

//initialize the topics list buttons
for(var i =0; i<topics.length;i++) {
    buttonGen(topics[i]); //button generate
}

//check localstorage for presence of favorites and import to webpage
var stored = JSON.parse(localStorage.getItem("favorites"));
if(stored) {
    console.log(stored);
    $(".favorite-area").push(stored);
}
else {
    var stored = [];    //create empty array
    localStorage.setItem("favorites", JSON.stringify(stored));
}
