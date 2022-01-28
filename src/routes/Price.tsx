import { useQueries, useQuery } from "react-query";
import { useParams } from "react-router";
import { fetchCoinHistory, fetchCoinInfo, fetchCoinTickers } from "./api";
import ApexChart from "react-apexcharts";
import ReactApexChart from "react-apexcharts";
import styled from "styled-components";
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
interface InfoData{
    id : string;
    name : string;
    symbol : string;
    rank : number;
    is_new : boolean;
    is_active : boolean;
    type : string;
    description : string;
    message : string;
    open_source : boolean;
    started_at : string;
    development_status : string;
    hardware_wallet : boolean;
    proof_type : string;
    org_structure : string;
    hash_algorithm : string;
    first_data_at : string;
    last_data_at : string;
}
interface PriceData{
    id : string;
    name : string;
    symbol : string;
    rank : number;
    circulating_supply : number;
    total_supply : number;
    max_supply : number;
    beta_value : number;
    first_data_at : string;
    last_updated : string;
    quotes : {
      USD: {
        ath_date: string;
    ath_price:number;
    market_cap:number
    market_cap_change_24h:number;
    percent_change_1h:number;
    percent_change_1y:number;
    percent_change_6h:number;
    percent_change_7d:number;
    percent_change_12h:number;
    percent_change_15m:number
    percent_change_24h:number;
    percent_change_30d:number;
    percent_change_30m:number;
    percent_from_price_ath:number;
    price:number;
    volume_24h:number;
    volume_24h_change_24h:number;
      }
    };
}
interface CharProps{
    coinId:string;
}
const Accent = styled.div`
color:${props => props.theme.accentColor};
font-size:20px;
`;
function Price({coinId}:CharProps ){
    const {isLoading:infoLoading,data:infoData}=useQuery<InfoData>(
        ["info",coinId], ()=>fetchCoinInfo(coinId));
    const {isLoading: tickersLoading,data:tickersData}=useQuery<PriceData>(
        ["tickers",coinId], ()=>fetchCoinTickers(coinId));
    const present = tickersData?.quotes.USD.price.toFixed(3);
    return (
        <>
    <Accent>More Info</Accent>
    <h2>Price : {present}</h2>
    <h2>first data at : {infoData?.first_data_at} </h2>
    <h2>last updated : {infoData?.last_data_at}</h2>
    <br></br>
    <Accent>Price</Accent>
    <h2>percent change 15m : {tickersData?.quotes.USD.percent_change_15m}</h2>
    <h2>percent change 1h : {tickersData?.quotes.USD.percent_change_1h}</h2>
    <h2>percent change 6h : {tickersData?.quotes.USD.percent_change_6h}</h2>
    <h2>percent change 12h : {tickersData?.quotes.USD.percent_change_12h}</h2>
        
    </>
    )
}
export default Price;