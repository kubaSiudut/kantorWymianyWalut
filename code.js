window.onload = function(){
    rates.init();

    rates.loadData();
    
    document.getElementById("result").innerHTML= "Tu będzie wynik"
    rates.amoutOfCuurenc.value ="";
    

}


class ExchangeRates {

    url = "http://api.nbp.pl/api/exchangerates/tables/a/last?format=json";
    selectNeededCurrency  ;
    amoutOfCuurenc 
    resultOfExchange
    selectCurrencyOwned
    
// przeliczniki walut waluty potrzebnej i posiadanej
    exhangeRatMidOfNeededCurency = 1
    exhangeRatMidOfOwnedCurency = 1

    init(){
        

        this.amoutOfCuurenc = document.getElementById("amoutOfCurrency");
        this.resultOfExchange = document.getElementById("result");
        this.selectNeededCurrency = document.getElementById("currencyNeeded");
        this.selectCurrencyOwned = document.getElementById("currencyOwned");
       // this.exhangeRatMidOfNeededCurency = this.selectNeededCurrency.options[0].firstElementChild.dataset.midvalue;
// podpięcia zdarzeni

// przycisk do testów 
        document.getElementById("spr").addEventListener("click",() =>{
            console.log("kurs waluty potrzenej: "+this.exhangeRatMidOfNeededCurency );
            console.log("kurs waluty posiadanej: "+this.exhangeRatMidOfOwnedCurency );
        })


      // zmiana pola takstowego z ilością gotówki-waluty 
        this.amoutOfCuurenc.addEventListener("input",(e) =>{
                        if(this.exhangeRatMidOfNeededCurency ==this.exhangeRatMidOfOwnedCurency) {
                            this.resultOfExchange.innerHTML = e.target.value;
                        }else{
                            let result =  (e.target.value*100000 * this.exhangeRatMidOfOwnedCurency*100000)/ (this.exhangeRatMidOfNeededCurency *100000*100000);
                    
                            console.log("Obliczam wynik wymiany: ");
                            console.log(e.target.value);
                            console.log("dzielę przez ");
                            console.log(this.exhangeRatMidOfNeededCurency);
                            console.log(result);
                            this.resultOfExchange.innerHTML = result
                        }

                            //
        });
           // wybór waluty potrzebnej 
        this.selectNeededCurrency.addEventListener("change", (e) => {
                            console.log("Stary kurs wymiany waluty potrzebnej  to " + this.exhangeRatMidOfNeededCurency);
                            if(e.target.options[e.target.selectedIndex].firstElementChild == null)
                            { this.exhangeRatMidOfNeededCurency = 1;
                                console.log("Nowy kurs wymiany waluty posiadanej to " + this.exhangeRatMidOfNeededCurency);
                            }else{
                        
                            this.exhangeRatMidOfNeededCurency = e.target.options[e.target.selectedIndex].firstElementChild.dataset.midvalue;

                            console.log(e.target);
                            console.log("Nowy kurs wymiany waluty potrzebnej  to " + this.exhangeRatMidOfNeededCurency);

                            this.resultOfExchange.innerHTML = this.calculate(this.exhangeRatMidOfNeededCurency,this.exhangeRatMidOfOwnedCurency,this.amoutOfCuurenc.value)

                      
                
                
                            }   
            })
            // wybór waluty posiadanej
            this.selectCurrencyOwned.addEventListener("change", (e) => {
                console.log("Stary kurs wymiany waluty posiadanej to " + this.exhangeRatMidOfOwnedCurency);
                if(e.target.options[e.target.selectedIndex].firstElementChild == null)
                { this.exhangeRatMidOfOwnedCurency = 1;
                    console.log("Nowy kurs wymiany waluty posiadanej to " + this.exhangeRatMidOfOwnedCurency);
                }else{
            
                this.exhangeRatMidOfOwnedCurency = e.target.options[e.target.selectedIndex].firstElementChild.dataset.midvalue;

                console.log(e.target);
                console.log("Nowy kurs wymiany waluty posiadanej to " + this.exhangeRatMidOfOwnedCurency);
                }

                this.resultOfExchange.innerHTML = this.calculate(this.exhangeRatMidOfNeededCurency,this.exhangeRatMidOfOwnedCurency,this.amoutOfCuurenc.value)

               //  let result =  (e.target.value*100000)/ (this.exhangeRatMidOfNeededCurency *100000);
            })


            // przycisk swapu walut potrzebnej i posiadanej 
            document.getElementById("swap-currency").addEventListener("click",() =>{
                console.log("Zamianka walut");
                let temp = this.selectNeededCurrency.selectedIndex;
                this.selectNeededCurrency.selectedIndex = this.selectCurrencyOwned.selectedIndex;
                this.selectCurrencyOwned.selectedIndex = temp;

                let tempRate = this.exhangeRatMidOfNeededCurency;
                this.exhangeRatMidOfNeededCurency= this.exhangeRatMidOfOwnedCurency;
                this.exhangeRatMidOfOwnedCurency = tempRate;

                this.resultOfExchange.innerHTML = this.calculate(this.exhangeRatMidOfNeededCurency,this.exhangeRatMidOfOwnedCurency,this.amoutOfCuurenc.value)




                
            })

    
    
     

            
            this.resultOfExchange.innerHTML = "Tu będzie wynik";
    
    
        

        
        


    }



    calculate(exhangeRatMidOfNeededCurency,exhangeRatMidOfOwnedCurency,value){
        if(exhangeRatMidOfNeededCurency ==exhangeRatMidOfOwnedCurency) {
            return value;
        }else{
            let result =  (value*100000 * exhangeRatMidOfOwnedCurency*100000)/ (exhangeRatMidOfNeededCurency *100000*100000);
    
            console.log("Obliczam wynik wymiany: ");
            console.log(value);
            console.log("dzielę przez ");
            console.log(exhangeRatMidOfNeededCurency);
            console.log(result);
            return result;
        }
    }

    
    



    loadData(){
        fetch(this.url)
        .then((response) =>{
            
            response.json().then( (data) => {
                this.parseData(data);
            })

        });

    }



    parseData(data){
        data = data[0];
        console.log(data);
        this.data = data.tabele;
        this.date = data.effectiveDate;
        this.no= data.no;
        this.rates= data.rates;
       

      

        for( let v in data.rates){
            this.addRateToSelect(data.rates[v]);
            console.log("dodaje do listy nową walutę " + data.rates[v].code)

        }

    }
    addRateToSelect(el){
        console.log(el);
        // tworzenie listy walut potrzebnych
        let optionNeededCurrency = document.createElement("option");

        optionNeededCurrency.innerHTML = `
            <option data-midvalue ="${el.mid}" >${el.code} ${el.currency} </option>
            `;

            console.log("Mid waluty potrzebnej  to " + el.mid)
            this.selectNeededCurrency.appendChild(optionNeededCurrency);


                    // tworzenie listy walut posiadanych
        let optionOwnedCurrency = document.createElement("option");

        optionOwnedCurrency.innerHTML = `
            <option data-midvalue ="${el.mid}" >${el.code} ${el.currency} </option>
            `;

            console.log("Mid waluty potrzebnej  to " + el.mid)
            this.selectCurrencyOwned.appendChild(optionOwnedCurrency);

        
        
        

        
               
       

        
         

    }


  
}

const rates = new ExchangeRates();
//rates.init();