import { useEffect, useState } from "react";
import { Route, Switch, useLocation, useParams, useRouteMatch } from "react-router";
import styled from "styled-components";
import Router from "../Router";
import Price from "./Price";
import Chart from "./Chart";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchCoinInfo, fetchCoinTickers } from "./api";
import {Helmet} from "react-helmet";
import { useSetRecoilState } from "recoil";
import { selectTheme } from "../selectThem";

const Title = styled.h1`
    color:${props => props.theme.accentColor};
`;
const Setting=styled.button`
    position:absolute;
    right:25px;
    font-size:25px;
`;
const Loader = styled.span`
    text-align:center;
    display:block;

`;

const Container = styled.div`
    padding: 0px 20px;
    max-width:480px;
    margin:0 auto;
`;

const Header = styled.div`
    height:10vh;
    display:flex;
    justify-content:center;
    align-items:center;
    position:relative;

    `;
const BackButton = styled.div`
  width:50px;
  height:40px;
  position:absolute;
  left:10px;
  bottom:20px;
  font-size:15px;
  color:${props => props.theme.accentColor};
`;
const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${props => props.theme.boxColor};
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
`;
const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color:  ${props => props.theme.boxColor};;
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
  }
`;

interface RouterParams{
    coinId:string;
}
interface RouterState{
    name:string;
}
interface ITag{
    coin_counter: number;
    ico_counter: number;
    id: string;
    name: string;
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
function Coin(){
  const setTheme = useSetRecoilState(selectTheme);
  const toggleTheme = ()=> (setTheme((prev)=> !prev));
    const { coinId } = useParams<RouterParams>();
    const {state} = useLocation<RouterState>();
  
    const priceMatch = useRouteMatch("/:coinId/price");
    const chartMatch = useRouteMatch("/:coinId/chart");
    const {isLoading:infoLoading,data:infoData}=useQuery<InfoData>(
      ["info",coinId], ()=>fetchCoinInfo(coinId));
    const {isLoading: tickersLoading,data:tickersData}=useQuery<PriceData>(
      ["tickers",coinId], ()=>fetchCoinTickers(coinId)
      ,{
        refetchInterval: 5000,
      }
      );
  
    const loading = infoLoading || tickersLoading;
    return (
    <Container>
      <Helmet>
        <title>
        {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
        </title>
      </Helmet>

    <Header>
    <BackButton>
        <Link to={`/`}>&lt; back</Link>
            </BackButton>
            
        <Title>{state?.name ? state.name : loading ? "Loading..." : infoData?.name}</Title>
        <Setting onClick={toggleTheme}>🎨</Setting>
    </Header>
    { loading ?  (
        <Loader>Loading...</Loader>
      ) :  (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>${infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Price:</span>
              <span>${tickersData?.quotes.USD.price.toFixed(3)} </span>
            </OverviewItem>
          </Overview>
          <Description>{infoData?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{tickersData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{tickersData?.max_supply}</span>
            </OverviewItem>
          </Overview>
          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`}>Chart</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>Price</Link>
            </Tab>
          </Tabs>

        
          <Switch>
            <Route path={`/${coinId}/price`}>
                <Price coinId={coinId}/>
            </Route>
            <Route path={`/${coinId}/chart`}>              
                <Chart coinId={coinId} />
            </Route>
          </Switch>
        </>
      )
      }   
       </Container>
      );
}
export default Coin;