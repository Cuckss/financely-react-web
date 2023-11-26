import React from "react";
import { Line } from "@ant-design/charts";
import "./styles.css";
import { Pie } from "@ant-design/charts";

const Chart=({sortedTransactions,handleExpenseModal,handleIncomeModal,showIncomePie})=>{

    const data=sortedTransactions.map((item)=>{
        return{date:item.date,amount:item.amount}
    })
    const spendingData=sortedTransactions.filter((item)=>{
        if(item.type=="expense"){
            return{tag:item.tag,amount:item.amount}
        }
    })
    const incomeData=sortedTransactions.filter((item)=>{
      if(item.type=="income"){
        return{tag:item.tag,amount:item.amount}
      }
    })
      const config = {
        data:data,
        width: 500,
        
        autoFit: true,
        xField: 'date',
        yField: 'amount',
        
        label: {
          style: {
            fill: '#aaa',
          },
        },
      };
    let newSpending = [{ tag: "movie", amount: 0 },
    { tag: "food", amount: 0 },
    { tag: "others", amount: 0 }]

    spendingData.forEach((item)=>{
        if(item.tag=="movie"){
            newSpending[0].amount+=item.amount;
        }else if(item.tag=="others"){
            newSpending[2].amount+=item.amount;
        }else{
            newSpending[1].amount+=item.amount;
        }
    })

      const spendingConfig = {
        data:newSpending,
        width: 400,
        angleField:"amount",
        colorField:"tag",
      };
    
      let chart;
      let pieChart;

      let newIncome = [{ tag: "job", amount: 0 },
      { tag: "freelance", amount: 0 },
      { tag: "investment", amount: 0 }]
  
      incomeData.forEach((item)=>{
          if(item.tag=="job"){
            newIncome[0].amount+=item.amount;
          }else if(item.tag=="freelance"){
            newIncome[1].amount+=item.amount;
          }else{
            newIncome[2].amount+=item.amount;
          }
      })
      const incomeConfig = {
        data:newIncome,
        width: 400,
        angleField:"amount",
        colorField:"tag",
      };
    
      
       let pieChart2;
   return(
    
    <div className="chart-wrapper">
        <div>
        <h2>Overall Analytics</h2>
      <Line {...config} onReady={(chartInstance) => (chart = chartInstance)} />
        </div>
       
        
      {
         showIncomePie == false ? (

           <div>
             <h2>Your Spendings</h2>
             <Pie {...spendingConfig} onReady={(chartInstance) => (pieChart = chartInstance)} />
           </div>

         ) : (
           <div>
             <h2>Your Income</h2>
             <Pie {...incomeConfig} onReady={(chartInstance) => (pieChart2 = chartInstance)} />
           </div>

         )
       }
 
    </div>
   ) 
}
export default Chart;