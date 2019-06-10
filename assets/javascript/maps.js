
    var queryUrl = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?"
    
    var queryParams = { "key": "AIzaSyAcbZ5RSSMLD-LsEWsG3R-bf-b-6ulyMqw"}
    
    queryParams.location = "37.8087,-122.4098" //specifies location for search (San Francisco in this example)
    
    queryParams.radius = 1500; //1500 meters is just within 1 mile
    
    queryParams.type = "cafe"
    queryParams.keyword = "starbucks,peets,philz"
    
    queryParams.maxprice = 2; //specified 0-4, 4 being most expensive
    
    queryParams.opennow = true; //only shows places currently open
    

    //Location Parameters
    var sanFrancisco = {
        innerRichmond: "37.7799,-122.4647",
        outerRichmond: "37.7777,-122.4953"
    };
    
    console.log(sanFrancisco)
    
    console.log(queryUrl + $.param(queryParams)) //**TAKE THIS STRING AND ENTER IT INTO AN AJAX CALL TO GET JSON OBJ BACK**
    
        //TODO: Take object data and and obtain Place Details (yelp api or google places api) to get a return for the business data to post onto infoWindow in Javascript MAP or onto page. 

    
    $(document).on("click", ".user-select", function (){ //event listener to select query paramaters
        var userSelect = $(this).val()
        //Type of search
        if (userSelect === "bar"){
            queryParams.type = "bar"
            queryParams.keyword = "pub,bar,wine,alcohol"

            console.log(queryUrl + $.param(queryParams))
        } else if (userSelect === "cafe") {
            queryParams.type = "cafe"
            queryParams.keyword = "starbucks,peets,philz"

            console.log(queryUrl + $.param(queryParams))
        }

        //Price Range
        if (userSelect === "price0") {
            queryParams.maxprice = 0;

            console.log(queryUrl + $.param(queryParams))
        } else if (userSelect ==="price1") {
            queryParams.maxprice = 1;

            console.log(queryUrl + $.param(queryParams))
        } else if (userSelect ==="price2") {
            queryParams.maxprice = 2;

            console.log(queryUrl + $.param(queryParams))
        } else if (userSelect ==="price3") {
            queryParams.maxprice = 3;

            console.log(queryUrl + $.param(queryParams))
        } else if (userSelect ==="price4") {
            queryParams.maxprice = 4;

            console.log(queryUrl + $.param(queryParams))
        }

        //Location Filter
        if (userSelect === "inner-richmond") {
            queryParams.location = sanFrancisco.innerRichmond;

            console.log(queryUrl + $.param(queryParams))
        } 
    })
    

    




    /////////////////////////////////////////////////////////////////////////////////////////////
    //  -- INITIALIZE GOOGLE MAP API AND CREATE MARKERS --
    //////////////////////////////////////////////////////////////////////////////////////////////
    myLocation = {lat:37.8087, lng:-122.4098} // Ideally this variable becomes dynamically generated by user (or set pre-determined coordinates per neighboorhood in san francisco)

    function initMap(){
        var options = { // Variable for google maps options
            zoom: 16, // Zoom preferabble for seeing all streets and businesses
            center: myLocation // map centered at variable location (for app, should be user's location)
        }
        // Creates new map object
        var map = new google.maps.Map(document.getElementById("map"), options)


        //Array of Markers
        var markers = [
            {
            coords:{lat:37.8015, lng:-122.3975},
            content: "Exploratorium"
            },
            {
            coords:{lat:37.8087, lng:-122.4098},
            iconImage:"https://img.icons8.com/cotton/64/000000/cafe.png",
            content: "<h1>PIER 39</h1>"
            }
        ];

        // Loop through markers
        for (var i = 0; i < markers.length; i++) {
            addMarker(markers[i])
        }


        // Add Marker Function
        function addMarker(props){
            var marker = new google.maps.Marker({
                position: props.coords, // position of the marker
                map: map, // links which map this marker is placed on (#map)
                // icon: props.iconImage // link to marker img
            });

            //Check for customIcon, otherwise sets to default
            if(props.iconImage){
                // Set icon image
                marker.setIcon(props.iconImage);
            }

            //Checks content for infoWindow
            if(props.content){
                var infoWindow = new google.maps.InfoWindow({
                content:props.content
                });
            }

            var infoWindow = new google.maps.InfoWindow({
            content:props.content
            });
        
            marker.addListener("click", function () {
                infoWindow.open(map, marker);
            })
        }
    }