import axios from 'axios';


export const getLoans= async()=>{
   return await axios.get("https://api.cfc-kw.com/customers/584657/loans");
}

export const getLoanHistory=async(account_no:string)=>{
   return await axios.get(`https://api.cfc-kw.com/customers/584657/loans/${account_no}/history`)
}