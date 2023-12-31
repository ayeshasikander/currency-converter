let rate1=document.querySelector('.rate1');
let rate2=document.querySelector('.rate2');
let resultBtn=document.querySelector('.converts');
let selects=document.querySelectorAll('.options select');
let sel1=selects[0];
let sel2=selects[1];
let inputs=document.querySelectorAll('.input input');
let inpt1=inputs[0];
let inpt2=inputs[1];
let rates={};
let reuqestURL="http://data.fixer.io/api/latest?access_key=6d313a1928a839cc2e9979729db813e0";

fetchRates();
async function fetchRates(){
    let res=await fetch(reuqestURL);
    res=await res.json();
    rates=res.rates;
    populateOptions();
}
function populateOptions(){
    let val="";
    Object.keys(rates).forEach(code=>{
        let str=`<option value="${code}">${code}</option>`;
        val+=str;
    })
    selects.forEach( (s)=>(s.innerHTML=val));
}

function convert(val,fromCurrency,toCurrency){
   let v=(val/rates[fromCurrency])*rates[toCurrency];
   let v1=v.toFixed(3);
   return v1=0.0 ? v.toFixed(5):v1;
}

function displatRate(){
    let v1=sel1.value;
    let v2=sel2.value;
    let val=convert(1,v1,v2);
    rate1.innerHTML=`1 ${v1} equals`;
    rate2.innerHTML=`${val} ${v2}`;
}

resultBtn.addEventListener('click',()=>{
    let fromCurr=sel1.value;
    let fromVal=inpt1.value;
    let toCurr=sel2.value;
    if(isNaN(fromVal)){
        alert('Please enter a number');
    }
    else{
        let cVal=convert(fromVal,fromCurr,toCurr);
        inpt2.value=cVal;
    }
   
});

selects.forEach(s=>s.addEventListener('change',displatRate));
document.querySelector(".swapping").addEventListener("click",()=>{
    let temp1=inpt1.value;
    let temp2=inpt2.value;
    let op1=sel1.value;
    let op2=sel2.value;
    inpt1.value=temp2;
    inpt2.value=temp1;

    sel2.value=op1;
    sel1.value=op2;
    displatRate();
});