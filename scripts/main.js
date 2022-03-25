let count1 = 0;
let count2 = 0;

document.querySelector("#buttonStart").addEventListener("click", handleClickButtonStart);

document.querySelectorAll(".card").forEach( eachCard => {
    eachCard.addEventListener("click", handleClickCard);
});

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
                document.querySelectorAll(".card.flip").forEach( e => e.style.background ="#229e9e" );
                document.querySelectorAll(".card.flip").forEach( e => e.classList.remove("flip") );
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
    count2 = 0;
    count1 = 0;
    document.querySelector("#firstScore").innerText = count1;
    document.querySelector("#secondScore").innerText = count2;

    document.querySelectorAll(".card.flip").forEach( e => e.style.background ="#229e9e" );
    document.querySelectorAll(".card.flip").forEach( e => e.classList.remove("flip") );

    changePlayer();

    let allCards = [...document.querySelectorAll(".card")]; 

    allCards = allCards.sort(() => 0.5 - Math.random());

    document.querySelector(".card-grid").innerHTML = "";

    allCards.forEach(each => {
        document.querySelector(".card-grid").appendChild( each );
    })

    allCards.forEach( eachCard => {
        eachCard.style.visibility = "visible";
    })

    
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