import axios from "axios";

const urlGlobal="https://disease.sh/v3/covid-19/all";
export const fetchData=async function(country){
    let changeableurl=urlGlobal;
    if(country && country!=="Global"){
        changeableurl="https://disease.sh/v3/covid-19/countries/"+country;
    }
    try {
        const {data:{active,recovered,deaths,updated,todayCases,todayDeaths,todayRecovered}}=await axios.get(changeableurl);
        
        const modifiedData={
            confirmed:active,
            recovered:recovered,
            deaths:deaths,
            lastUpdated:updated,
            todayCases:todayCases,
            todayDeaths:todayDeaths,
            todayRecovered:todayRecovered
        }
        return modifiedData;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const urlDailyGlobal="https://disease.sh/v3/covid-19/historical/all?lastdays=30";
export const fetchDaily=async function(){
    try {
        const {data}=await axios.get(urlDailyGlobal);
        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const urlCountries="https://disease.sh/v3/covid-19/countries";
export const fetchCountries=async function(){
    try {
        const {data}=await axios.get(urlCountries);
        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

const url="https://disease.sh/v3/covid-19/historical";
export const tryFetch=async function(){
    try {
        const {data}=await axios.get(url);
        return data
    } catch (error) {
        console.log(error);
    }
}