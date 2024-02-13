const baseFlagLink = `https://flagsapi.com/`
const baseCurrencyLink ="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/eur.json"
const form = document.querySelector("form");
const flag = document.querySelectorAll("img");
const country = document.querySelectorAll("select");
const exchangeIcon = document.querySelector("#exchange-icon");
const result = document.querySelector(".exchange-rate");
const inputValue = document.querySelector("#amount-input")
import { countryList } from "./codes";
let exchangeRateWRTEuro;

let dataFetch = false;
form.addEventListener("submit",async (evnt)=>{
    evnt.preventDefault();
    if(!dataFetch){
        let currenciesBaseEuro = (await fetch(baseCurrencyLink)).json();
        await currenciesBaseEuro.then((res)=>{exchangeRateWRTEuro =(res.eur);console.log(res.eur["inr"])});
        await console.log(exchangeRateWRTEuro);
        dataFetch = true;
    }
    let from ;
    let to;
    (country[0].childNodes.forEach((v)=>{if(v.value ==country[0].value)from = v.innerText}));
    (country[1].childNodes.forEach((v)=>{if(v.value ==country[1].value)to = (v.innerText)}));
    console.log(to , exchangeRateWRTEuro[to.toLowerCase()])
    result.innerText = await`${inputValue.value} ${from} = ${((exchangeRateWRTEuro[to.toLowerCase()]/exchangeRateWRTEuro[from.toLowerCase()])*inputValue.value).toFixed(2)} ${to}`;
});

for(code in countryList){
    let ele = document.createElement("option");
    ele.setAttribute("value", `${countryList[code]}`);
    ele.appendChild(document.createTextNode(`${code}`));
    if(code==="USD"){
        ele.selected = "selected";
    }
    let ele2 = document.createElement("option");
    ele2.setAttribute("value", `${countryList[code]}`);
    ele2.appendChild(document.createTextNode(`${code}`));
    if(code==="INR"){
        ele2.selected = "selected";
    }
    country[0].appendChild(ele);
    country[1].appendChild(ele2);
}


country[0].addEventListener("change",()=>{
    flag[0].setAttribute("src", `${baseFlagLink}${country[0].value}/flat/64.png`);
})
country[1].addEventListener("change",()=>{
    flag[1].setAttribute("src", `${baseFlagLink}${country[1].value}/flat/64.png`);
})

exchangeIcon.addEventListener("click",()=>{
    let flag1 = country[0].value;
    country[0].value = country[1].value;
    flag[0].setAttribute("src", `${baseFlagLink}${country[0].value}/flat/64.png`);
    country[1].value = flag1;
    flag[1].setAttribute("src", `${baseFlagLink}${country[1].value}/flat/64.png`);
})
