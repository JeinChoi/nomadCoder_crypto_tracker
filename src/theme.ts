import { DefaultTheme } from "styled-components";
import { isWhiteSpaceLike } from "typescript";

export const darkTheme:DefaultTheme = {
    textColor:"#ecf0f1",
    bgColor:"#353b48",
    accentColor:"#009432",
    boxColor:"#2f3640",
}
export const lightTheme:DefaultTheme = {
    textColor:"#353b48", 
    bgColor:"#f1f2f6",
    accentColor:"#009432",
    boxColor:"#dfe4ea",
}
//dark 버전: 배경 남색, 글씨 남색, 박스 : 하얀색
//light 버전 : 배경 흰색, 글씨 흰색 , 박스 : 남색