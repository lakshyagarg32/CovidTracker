import React,{useState,useEffect, useDebugValue} from "react";
import {fetchDaily,tryFetch} from "../../api/index.js" 
import styles from "./chart.module.css"
import {Line} from "react-chartjs-2";
import Chart from 'chart.js/auto'
import { Typography } from "@mui/material";

function Charta({country}){
    const [dates,setDates]=useState([]);
    const [cases,setCases]=useState([]);
    const [death,setDeath]=useState([]);
    const [all,setAll]=useState([]);
    const [world,setWorld]=useState({});
    const [initial,setInitial]=useState(true);

    useEffect(function(){
      const fetchAPI=async function(){
        setAll(await tryFetch());
        const local=await fetchDaily();
        setWorld(local);
        setDates(local?Object.keys(local.cases):null);
        setCases(function(){
          return local?Object.values(local.cases).map(function(item){
            return item/10;
          }):null
        });
        setDeath(local?Object.values(local.deaths):null);
      }
      fetchAPI();
    },[])

    useEffect(function(){
        if(initial===true){
          setInitial(false);
        }
        else{
          if(country==="Global"){
            setDates(world?Object.keys(world.cases):null);
            setCases(function(){
              return world?Object.values(world.cases).map(function(item){
                return item/10;
              }):null
            });
            setDeath(world?Object.values(world.deaths):null);
          }
          else{
            let temp=all.find(function(item){
              return item.country===country;
            })
            if(temp){
              temp=temp.timeline;
              setDates(temp?Object.keys(temp.cases):null);
              setCases(function(){
              return temp?Object.values(temp.cases).map(function(item){
                return item/10;
              }):null
            });
            setDeath(temp?Object.values(temp.deaths):null);
            }
            else{
              setDates(null);
              setCases(null);
              setDeath(null);
            }
          }
        }
    },[country]);

    const lineChart = (
        cases ? (
          <Line
            data={{
              labels: dates,
              datasets: [{
                data: cases,
                label: 'Total cases / 10',
                borderColor: '#3333ff',
                fill: true,
              }, {
                data: death,
                label: 'Total deaths',
                borderColor: 'red',
                backgroundColor: 'rgba(255, 0, 0, 0.5)',
                fill: true,
              }]
            }}
            options={{
              plugins:{
                title:{display:true,text:country+" last 30 days data"}
              },
              maintainAspectRatio:false
            }}
          />
        ) : <Typography color="textSecondary">Data not available</Typography>
      );

    return(
        <div className={styles.container}>
          {lineChart}
        </div>
    );
}

export default Charta;