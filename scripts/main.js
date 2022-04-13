let count1 = 0;
let count2 = 0;
let chosenCategory = "icons";
let card_length;
let currentCategory = "ICON";

document.querySelector("#buttonStart").addEventListener("click", handleClickButtonStart);
document.querySelector("#buttonChange").addEventListener("click", handleClickChangeButton);

function handleClickCard(e) {

    if(document.querySelectorAll(".card.flip").length >= 2) {
        return;
    }
   
    let target = e.target;

    if(target.nodeName === "I"){
        target = target.parentNode.parentNode;
    }

    if(target.classList.contains("card_front") || target.classList.contains("card_back")) {
        target = target.parentNode;
    }

    target.classList.add("flip"); 
    
    if(document.querySelectorAll(".card.flip").length === 2) { 
        console.log( document.querySelectorAll(".card.flip")[0].children[0].children[0].classList[1] );
        console.log( document.querySelectorAll(".card.flip")[1].children[0].children[0].classList[1] );
        if(document.querySelectorAll(".card.flip")[0].children[0].children[0].classList[1] == document.querySelectorAll(".card.flip")[1].children[0].children[0].classList[1]) {
            setTimeout( () => {
                document.querySelectorAll(".card.flip").forEach( e => e.style.background ="yellowgreen" );
            }, 150 );

            setTimeout( () => {
                if( document.querySelector("#firstPlayer").classList.contains("currentPlayer")){
                    count1 = count1 + 1
                    document.querySelector("#firstScore").innerText = count1;
                }else {
                    count2 = count2 + 1
                    document.querySelector("#secondScore").innerText = count2;
                }

                document.querySelectorAll(".card.flip")[0].style.visibility = "hidden";
                document.querySelectorAll(".card.flip")[1].style.visibility = "hidden";
            }, 1000 );

            setTimeout( () => {
                card_length = card_length - 2;
                document.querySelectorAll(".card.flip").forEach( e => e.style.background ="#229e9e" );
                document.querySelectorAll(".card.flip").forEach( e => e.classList.remove("flip") );
                if(card_length === 0){
                    document.querySelector("#winner-banner").style.visibility = "visible";
                }
                
            }, 1150 );

        }else {
            setTimeout( () => {
                if(document.querySelector("#firstPlayer").classList.contains("currentPlayer")){
                    document.querySelector("#secondPlayer").classList.add("currentPlayer")
                    document.querySelector("#firstPlayer").classList.remove("currentPlayer")
                }else {
                    document.querySelector("#secondPlayer").classList.remove("currentPlayer")
                    document.querySelector("#firstPlayer").classList.add("currentPlayer")
                }
            }, 1000 );

            setTimeout( () => {
                document.querySelectorAll(".card.flip").forEach( e => e.classList.remove("flip") );
            }, 1150 );
        }
    }
}

function handleClickButtonStart() { 
    document.querySelector("#category-container").style.opacity = "0";
   
    count2 = 0;
    count1 = 0;

    document.querySelector("#firstScore").innerText = count1;
    document.querySelector("#secondScore").innerText = count2;

    document.querySelectorAll(".card.flip").forEach( e => e.style.background ="#229e9e" );
    document.querySelectorAll(".card.flip").forEach( e => e.classList.remove("flip") );

    document.querySelector("#playerSection").style.visibility ="visible";

    changePlayer();

    loadCategoryCards();
}

function changePlayer() {
 
    document.querySelector("#firstPlayer").classList.toggle("currentPlayer");

    if(document.querySelector("#firstPlayer").classList.toggle("currentPlayer") == false){
        document.querySelector("#firstPlayer").classList.toggle("currentPlayer")
        document.querySelector("#secondPlayer").classList.remove("currentPlayer")
    }else {
        document.querySelector("#secondPlayer").classList.add("currentPlayer")
        document.querySelector("#firstPlayer").classList.toggle("currentPlayer")
    }
}

function openPopup() {
    document.querySelectorAll(".category").forEach( cate => {
        cate.addEventListener("click", handleClickCategory);
    })
}


function handleClickCategory(e) {
    let target_ = e.target;

    if(target_.nodeName === "DIV") { 
        target_ = target_.children[0].innerText;
    }

    if(target_.nodeName === "SPAN") { 
       target_ = target_.innerText;
    }

    if(target_ === "ICON") {
        chosenCategory = "icons"; 
    }
    
    if(target_ === "HOT"){
        chosenCategory = "images"
    }

    currentCategory = target_;

    markCurrentCategorie();
}

function handleClickChangeButton() {
    document.querySelector("#category-container").style.visibility = "visible";
    markCurrentCategorie();
    openPopup();
}

function markCurrentCategorie() {
    document.querySelectorAll(".category").forEach( categ => {
        //console.log(categ.children[0].innerText)
        categ.classList.remove("current");

        if(categ.children[0].innerText === currentCategory) {
            categ.classList.add("current");
        }
    })
}

function loadCategoryCards() {
    fetch( "/config/cards.json" )
        .then( json => json.json() )
        .then( categories => {
            //über alle cards loopen
            document.querySelector( ".card-grid" ).innerHTML = "";
            categories[chosenCategory].forEach( card_name => {
                // div der card erstellen
                let card = document.createElement( "div" );
                card.classList.add( "card" );

                let card_front = document.createElement( "div" );
                card_front.classList.add( "card_front" );

                let card_back = document.createElement( "div" );
                card_back.classList.add( "card_back" );

                if( chosenCategory === "icons" ) {
                    let icon = document.createElement( "i" );
                    
                    card_name.split(" ").forEach( split_part => {
                        icon.classList.add( split_part );
                    });

                    icon.classList.add( "icon-card" );
                    
                    card_front.appendChild( icon );
                }

                if( chosenCategory === "images" ) {
                    let image = document.createElement( "img" );
                    image.src = card_name;
                    
                    card_front.appendChild( image );
                }

                card.appendChild( card_front );
                card.appendChild( card_back );

                let second_card = card.cloneNode(true);

                card.addEventListener("click", handleClickCard);
                second_card.addEventListener("click", handleClickCard);
                
                document.querySelector( ".card-grid" ).appendChild( card );
                document.querySelector( ".card-grid" ).appendChild( second_card );

            } );

            sortCardsRandom();
        } );
}

function sortCardsRandom() {
    let allCards = [...document.querySelectorAll(".card")]; 

    card_length = allCards.length
    console.log(card_length)

    allCards = allCards.sort(() => 0.5 - Math.random());

    document.querySelector(".card-grid").innerHTML = "";

    allCards.forEach(each => {
        document.querySelector(".card-grid").appendChild( each );
    });

    allCards.forEach( eachCard => {
        eachCard.style.visibility = "visible";
    })
}