import React from "react";
import "./styles.css"
import { Row ,Col} from "antd";
import { Card } from 'antd';
import Button from "../ButtonComponent/Button";
const Cards=({showExpenseModal,showIncomeModal,income,expense,totalBalance,resetAllTransactions})=>{
    console.log("the income is",income,"the totalBalance is",totalBalance,"the expense is",expense)
    return(
        <div>
      <Row  className="cards-row">
   
      <Card className="my-card"  title="Current Balance" bordered={false}>
     
     <p>₹{totalBalance}</p>
      <Button text="Reset" blue={true} onClick={resetAllTransactions}/>
      </Card>
    
   
      <Card className="my-card" title="Total Income" bordered={false}>
      <p>₹{income}</p>
      <Button text="Add Income" blue={true} onClick={showIncomeModal}/>
      </Card>
    
    
      <Card className="my-card" title="Total Expenses" bordered={false}>
      <p>₹{expense}</p>
      <Button text="Add Expense" blue={true} onClick={showExpenseModal}/>
      </Card>
    
  </Row>
        </div>
    )
}
export default Cards;