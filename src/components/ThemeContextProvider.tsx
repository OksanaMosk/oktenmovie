import {createContext} from "react";

type Theme = "dark" | "light";
type ContextTypeValue = {
    theme: Theme;
    changeTheme: (theme: Theme) => void;
}
const defaultValue: ContextTypeValue= {
    theme:'dark',
    changeTheme: (theme: string)=>{
    console.log(theme)
}}
export const MyContext =createContext<ContextTypeValue>(defaultValue)

