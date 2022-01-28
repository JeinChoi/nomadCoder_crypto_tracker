import { useQueries, useQuery } from "react-query";
import { useParams } from "react-router";
import { fetchCoinHistory } from "./api";
import ApexChart from "react-apexcharts";
import ReactApexChart from "react-apexcharts";
interface IHistorical {
    time_open: string;
time_close: string;
high:number;
open:number; 
low: number;
close: number;
volume:number;
market_cap:number;
}

interface CharProps{
    coinId:string;
}
function Chart({coinId}:CharProps){
    const {isLoading,data} = useQuery<IHistorical[]>(
    ["ohlcv",coinId],
     () => fetchCoinHistory(coinId),
     {
         refetchInterval: 10000,
     }
     );
    return(<div>{isLoading ? "Loading char...": <ReactApexChart type="candlestick" 
    series={[
        {
             data:data?.map((price)=>({
                    x:price.time_close,
                    y:[price.open.toFixed(2), 
                    price.high.toFixed(2),
                     price.low.toFixed(2),
                    price.close.toFixed(2)],
                })) 
        }
    ]}
    options={{
        theme:{
            mode:"dark"
        },
        chart:{ 
            type:"candlestick",
            height:300,
            width:300,
        toolbar:{
            show:true,
        },  
        background:"transparent",
      },
     
       grid:{
            show:true,
        },
    yaxis:{
       show:false,
        tooltip: {
            enabled: true
          }
        
    },
    xaxis:{
        labels:{show:true},
        axisTicks:{show:true},
        axisBorder:{show:true},
         type:"datetime",
         categories: data?.map(price=>price.time_close),
       
    },
   
    tooltip:{
        y: {
            formatter: (value) => `$ ${value.toFixed(2)}`,
        }
    }
    }}
   />
   }</div>);
   
}
export default Chart;
