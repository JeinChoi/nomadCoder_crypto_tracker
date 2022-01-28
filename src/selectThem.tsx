import { atom } from "recoil";
import { ThemeProvider } from "styled-components";


export const selectTheme = atom({
   key: 'theme',
    default:false,
});