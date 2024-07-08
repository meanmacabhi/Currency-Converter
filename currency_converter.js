const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdown = document.querySelectorAll(".dropdown select");
const button= document.querySelector("form button");
const from = document.querySelector(".from select");
const curr_to = document.querySelector(".to select");
const msg = document.querySelector(".msg");


for (let select of dropdown){
    for(code in countryList){
        let newoption = document.createElement("option");//the keys in the countrylist object is accesesd and then options are created with the key names ans thgen appended in the select.
        newoption.innerText = code;
        newoption.value = code;
        if(select.name === "from" && code=="USD"){ //from select is setting its value as usd temorarily
        newoption.selected ="selected"; 
        }
        else if(select.name === "To" && code=="INR"){//to select is setting its value as ind temporarily
        newoption.selected ="selected"; 
        }
        select.append(newoption);

    }
    select.addEventListener("change",(evt)=>{//when the useer will click and change the select country then the target select will be [assed as element in the changeflag function
        updateflag(evt.target);
    })
}
const updateflag=(element)=>{ //flag changing function will acesss the img in taht select where the user has chagned and change the img src link 
    let code = element.value;
    let countrycode = countryList[code];
    let newsrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
    img =element.parentElement.querySelector("img");
    img.src=newsrc;
    
}

button.addEventListener("click",async (evt)=>{
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtval = amount.value;
    if(amtval === "" || amtval <0){
    amtval = 1;
    amount.value = "1";
    }
    console.log(amtval);

    const URL = `${BASE_URL}/${from.value.toLowerCase()}/${curr_to.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let total_amtval=amtval * data[curr_to.value.toLowerCase()]
    msg.innerText=` ${amtval} ${from.value} = ${total_amtval} ${curr_to.value}`;

})

