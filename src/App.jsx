import React,{useState,useEffect} from "react";
import Cards from "./components/cards/cards.jsx";
import Chart from "./components/chart/chart";
import CountryPicker from "./components/countrypicker/countrypicker";
import {fetchData,fetchCountries} from "./api/index.js";
import styles from "./App.module.css";
import coronaimage from "./images/image.png";
import Table from "./components/table/table";
import Grid from '@mui/material/Grid';

function App(){
    const [data,setData]=useState({});
    const [country,setCountry]=useState("Global");
    const [countries,setCountries]=useState([]);
    const [sorted,setSorted]=useState([]);
    const [all,setAll]=useState([]);

    useEffect(
        function(){
            const fetchAPI=async function(){
                const local=await fetchCountries();
                setCountries(await local.map(function(item){
                    return ({
                        country:item.country,
                        flag:item.countryInfo.flag
                    });
                }));
                setAll(local);
                const temp=local.sort(function(a,b){
                    if(a.active-b.active<0){
                        return 1;
                    }
                    return -1;
                });
                for(var i=0;i<5;i++){
                    setSorted(function(prev){
                        return [...prev,{country:temp[i].country,val:temp[i].active}];
                    });
                }
            }
            fetchAPI();
        },[])

    useEffect(
        function(){
            const fetchAPI=async function(){
                setData(await fetchData());
            }
            fetchAPI();
        },[]);

        const handleCountryChange=async function(curr){
            setData(await fetchData(curr));
            setCountry(curr);
        }

    function handletypeChange(type){
        let so="active";
        if(type==="active cases"){
            so="active";
        }
        if(type==="total cases"){
            so="cases";
        }
        if(type==="today cases"){
            so="todayCases";
        }
        if(type==="recoveries"){
            so="recovered";
        }
        if(type==="recoveries today"){
            so="todayRecovered";
        }
        if(type==="deaths"){
            so="deaths";
        }
        if(type==="deaths today"){
            so="todayDeaths";
        }  
        const d=[];
        const temp=all.sort(function(a,b){
            if(a[so]-b[so]<0){
                return 1;
            }
            return -1;
        });
        for(var i=0;i<5;i++){
            d.push({country:temp[i].country,val:temp[i][so]});
        }
        setSorted(d);
    }

    return(
        <div className={styles.container}>
        <img src={coronaimage} className={styles.image} alt="COVID-19"/>
        <CountryPicker handleCountryChange={handleCountryChange} countries={countries}/>
        <Grid container className={styles.container}>
            <Grid item xs={12} md={9} lg={8} className={styles.card}>
                <Cards data={data} />
            </Grid>
            <Grid item xs={8} md={3} lg={4} className={styles.table}>
                <Table data={sorted} handletypeChange={handletypeChange}/> 
            </Grid>
        </Grid>
        <Chart country={country}/>
        </div>
    );
    
}

export default App;
