import React,{useEffect, useState,useRef} from "react";
import "./styles.css"
import Button from "../ButtonComponent/Button";
import { Table,Select, Radio } from "antd";
import magnifyingGlass from"../../images/magnifyingGlass.svg"
import { unparse ,parse} from "papaparse";
import { toast } from "react-toastify";

const TransactionTable=({transactions,addTransaction,fetchTransactions,setShowIncomePie,typeFilter,setTypeFilter})=>{
    const[searchName,setSearchName]=useState("");
    // const[selectedOption,setSelectedOption]=useState("All")
  
   const[sortKey,setSortKey]=useState("");
   
    const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Amount',
          dataIndex: 'amount',
          key: 'amount',
        },
        {
          title: 'Date',
          dataIndex: 'date',
          key: 'date',
        },
        {
          title: 'Mode',
          dataIndex: 'mode',
          key: 'mode',
        },
        {
          title: 'Tag',
          dataIndex: 'tag',
          key: 'tag',
        },
        {
          title: 'Type',
          dataIndex: 'type',
          key: 'type',
        },
      ];

      let FilteredTransaction=transactions.filter((item)=>{
       return item.name.toLowerCase().includes(searchName.toLowerCase()) && item.type.includes(typeFilter);
      })

       let sortedTransactions=FilteredTransaction.sort((a,b)=>{
        if(sortKey=="date"){
            return new Date(a.date)-new Date(b.date)
        }else if(sortKey=="amount"){
            return a.amount-b.amount;
        }else if(sortKey=="amount-high"){
           return b.amount-a.amount;
        }else{
          return;
        }
       })
FilteredTransaction=sortedTransactions
    // function handleSelectedOption(e){
    //     setSelectedOption(e.target.value)
    //      console.log(selectedOption)
    //   }
 
    function exportCSV(){
       var csv=unparse({
        fields:["name","type","tag","date","mode","amount"],
        data:transactions
       })
      var data = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      var csvURL = window.URL.createObjectURL(data);
      var link = document.createElement('a');
      link.href = csvURL;
      link.download="transactions.csv"
      document.body.appendChild(link)
      link.click();
      document.body.removeChild(link)
      // tempLink.setAttribute('download', 'transactions.csv');
      // tempLink.click();
    }

    function importFromCsv(event){      
      event.preventDefault();
      try{
         parse(event.target.files[0],{
          header:true,
          complete:async function(results){
            for(const transaction of results.data){
              console.log("Transactions:",transaction)
              const newTransaction={
                ...transaction,
                amount:parseFloat(transaction.amount)
              }
              await addTransaction(newTransaction,true)
            }
          }
         })
         toast.success("All Transactions Added")
         fetchTransactions();
         event.target.files=null;
      }catch(error){
 toast.error(error.message)
      }
    }
    if(typeFilter=="income"){
      setShowIncomePie(true)
    }else if(typeFilter=="expense"){
      setShowIncomePie(false)
    }
    return(
        <div>
            <div className="table-filter-section">
            <img src={magnifyingGlass} width="20" className="search-icon" />
                <input placeholder="Search by Name"
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                    className="search-input"
                   
                   />
         
                <Select className="select-input"
                    onChange={(value) => setTypeFilter(value)}
                    value={typeFilter}
                >
                    <Select.Option value="">All</Select.Option>
                    <Select.Option value="income">Income</Select.Option>
                    <Select.Option value="expense" >Expense</Select.Option>
                </Select>

            </div>
            <div className="transaction-heading">
               
               <h4>My Transactions</h4>
               
          
           
           <Radio.Group className="input-radio"
                         onChange={(e)=>setSortKey(e.target.value)}         
                            value={sortKey}      >
                <Radio.Button value="">No Sort</Radio.Button>
                <Radio.Button value="date">Sort By Date</Radio.Button>
                <Radio.Button value="amount">Sort By Amount(low to high)</Radio.Button>
                <Radio.Button value="amount-high">Sort By Amount(high to low)</Radio.Button>
            </Radio.Group>
           <div className="export-btns">
           <Button text="Export to CSV" onClick={exportCSV} blue={false} className="export-btn1" />
           <label for="file-csv" className="btn btn-blue label-btn" >Import from CSV</label>
           <input type="file"
           id="file-csv"
           accept=".csv"
           required
           onChange={importFromCsv}
           style={{display:"none"}}/>
           </div>
           </div>
         <Table dataSource={FilteredTransaction} columns={columns} style={{width:"100%"}} />
        </div>
    )
}
export default TransactionTable;