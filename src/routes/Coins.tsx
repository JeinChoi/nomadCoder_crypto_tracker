import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { useSetRecoilState,RecoilRoot } from "recoil";
import styled from "styled-components";
import { isPropertySignature } from "typescript";
import { selectTheme } from "../selectThem";
import { lightTheme } from "../theme";
import { fetchCoins } from "./api";
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

const CoinsList = styled.ul``;

const Coin = styled.li`
    background-color:${(props) => props.theme.boxColor};
    color:${(props) => props.theme.textColor};
    
    margin-bottom:10px;
    border-radius:15px;
   
    a{
          display:flex;
          align-items:center;
      padding:20px;
        transition:color 0.2s ease-in;
      
    }
    &:hover{
        a{
            color:${(props)=>props.theme.accentColor};
        }
    }
`;

const Title = styled.h1`
    color:${props => props.theme.accentColor};
`;
const Setting=styled.button`
    position:absolute;
    right:25px;
    font-size:25px;
`;
function changeTheme(){
  //  setTheme((prev)=> !prev);
    console.log(selectTheme);
    //return chanTheme;
    
} 
const Loader = styled.span`
    text-align:center;
    display:block;

`;
const Img = styled.img`
    width:35px;
    height:35px;
    margin-right:10px;
`;
interface ICoin {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
    }
function Coins(){
    
    const setTheme = useSetRecoilState(selectTheme);
    const toggleTheme = ()=> (setTheme((prev)=> !prev));
    const { isLoading, data } = useQuery<ICoin[]>("allCoins",fetchCoins)
    // const [coins,setCoins]=useState<CoinInterface[]>([]);
    // const [loading,setLoading] = useState(true);
    // useEffect(()=>{
    //     (async()=>{
    //         const response = await fetch("https://api.coinpaprika.com/v1/coins");
    //         const json = await response.json();
    //         setCoins(json.slice(0,100));
    //         setLoading(false);
    //     })();
    // },[]);
    return (    
    <Container>
         <Helmet>
        <title>
         코인
        </title>
      </Helmet>
        <Header>
            <Title>코인</Title>
            <Setting onClick={toggleTheme}>🎨</Setting>
        </Header>
        { isLoading ? (
          <Loader>Loading...</Loader>
          ) : (  
          <CoinsList>
            {data?.slice(0,100).map((coin)=>(
            <Coin key={coin.id}>
                <Link to={{
                    pathname:`/${coin.id}`,
                    state:{name:coin.name},
                    }}>
                    <Img src={`https://cryptoicon-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} />
                    {coin.name} &rarr;
                   </Link>
            </Coin>
            ))}            
        </CoinsList>
    )}
    </Container>);
}
export default Coins;