import React,{useState,useEffect} from "react";
import Header from "../HeaderComponent/Header";
import Cards from "../CardsComponent/Cards";
import { Modal } from "antd";
import AddIncome from "../../Modals/AddIncome";
import AddExpense from "../../Modals/AddExpense";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import Chart from "../chartsComponent/Chart";
import { collection, query } from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../../firebase";
import { addDoc,getDocs ,deleteDoc,doc,getDoc} from "firebase/firestore";
import noTransaction from "../../images/noTransaction.svg"
import TransactionTable from "../TransactionTableComponent/TransactionTable";
const Dashboard=()=>{
    const[user]=useAuthState(auth);
    const[isExpenseModalVisible,setIsExpenseModalVisible]=useState(false);
    const[isIncomeModalVisible,setIsIncomeModalVisible]=useState(false);
    const[transactions,setTransactions]=useState([]);
    const[isLoading,setIsLoading]=useState(false);
    const[income,setIncome]=useState(0);
    const[expense,setExpense]=useState(0);
    const[totalBalance,setTotalBalance]=useState(0);
    const[showIncomePie,setShowIncomePie]=useState(false);
    const[typeFilter,setTypeFilter]=useState("");
    const showExpenseModal=()=>{
        setIsExpenseModalVisible(true);
    }
    const showIncomeModal=()=>{
        setIsIncomeModalVisible(true);
    }
    const handleExpenseModal=()=>{
        setIsExpenseModalVisible(false);
    }
    const handleIncomeModal=()=>{
        setIsIncomeModalVisible(false);
    }
    const onFinish=(values,type)=>{
      const newTransaction={
        type:type,
        name:values.name,
        date:values.date.format("YYYY-MM-DD"),
        tag:values.tag,
        amount:parseFloat(values.amount),
        mode:values.mode,
      }
      console.log(newTransaction)
      addTransaction(newTransaction);
    }
    async function addTransaction(transaction,many){
        try{
           const docRef=await addDoc(collection(db,`users/${user.uid}/transaction`),
            transaction
           )
         
           
          if(!many)toast.success("Transaction added successfully")
          let newArray=transactions;
          newArray.push(transaction);
          setTransactions(newArray);
          calculateBalance()

        }catch(error){
        console.log("Error adding Document: ", error);
        toast.error("Couldn't able to  add transaction!")
        }
    }
   
  console.log(transactions)
    useEffect(()=>{
        fetchTransactions();
    },[user])

    useEffect(()=>{ 
    calculateBalance();
    },[transactions])

   function calculateBalance(){
    let totalIncome=0;
    let totalExpense=0;
    transactions.forEach((transaction)=>{
        if(transaction.type=="income"){
            totalIncome+=transaction.amount
        }else{
            totalExpense+=transaction.amount;
        }
    })
    setIncome(totalIncome)
    console.log(income)
    setExpense(totalExpense)
    console.log(expense)
    setTotalBalance(totalIncome-totalExpense);
    console.log(totalBalance)
   }

    async function fetchTransactions() {
        setIsLoading(true);
        if(user){
            const q=query(collection(db,`users/${user.uid}/transaction`))
            const querySnapShot=await getDocs(q);
            let transactionsArray=[];
            querySnapShot.forEach((doc)=>{
                console.log(doc.data())
                transactionsArray.push(doc.data())
            })
            setTransactions(transactionsArray);
            toast.success("Transaction fetched successfully..")
            console.log(transactions);
        }
        setIsLoading(false);
    }
    let sortedTransactions=transactions.sort((a,b)=>{
        return new Date(a.date)-new Date(b.date);
    })

    async function resetAllTransactions(){
    
        await deleteDoc(doc(db, "transaction", "pbGk20oqg0xN0U5IQIm6"));
       
       console.log("doc deleted!!")

    }
    return(
        <div>
            <Header />
            {
                isLoading?(<>Loading....</>):
            (
            <div>
                <Cards showExpenseModal={showExpenseModal} showIncomeModal={showIncomeModal} income={income} expense={expense} totalBalance={totalBalance}  resetAllTransactions={resetAllTransactions}/>
            <AddIncome isIncomeModalVisible={isIncomeModalVisible}
                handleIncomeModal={handleIncomeModal}
                onFinish={onFinish}
                setShowIncomePie={setShowIncomePie}
                showIncomePie={showIncomePie}
                setTypeFilter={setTypeFilter}
            />
            <AddExpense isExpenseModalVisible={isExpenseModalVisible}
                handleExpenseModal={handleExpenseModal}
                onFinish={onFinish}
                setShowIncomePie={setShowIncomePie}
                setTypeFilter={setTypeFilter}
            /> 
                </div>
            )
            }
           {
            transactions.length==0?(
                <div className="noTransaction-div">
                <img src={noTransaction} className="transaction-img"/>
                <h4 className="no-transaction">No Transactions Till Now..</h4>
                </div>
            ):(
               <Chart sortedTransactions={sortedTransactions}  showIncomePie={showIncomePie} /> 
            )
           }
            <TransactionTable transactions={transactions} addTransaction={addTransaction} fetchTransactions={fetchTransactions}
                              handleExpenseModal={handleExpenseModal}
                              handleIncomeModal={handleIncomeModal}
                              setShowIncomePie={setShowIncomePie}
                              typeFilter={typeFilter}
                              setTypeFilter={setTypeFilter}
                             />
        </div>
    )
}
export default Dashboard;






















{/* <Modal visible={isIncomeModalVisible}
                onCancel={handleIncomeModal}
                title="Income"
                footer={null}
            >Income</Modal>
            <Modal visible={isExpenseModalVisible}
                onCancel={handleExpenseModal}
                title="Add Expense"
                footer={null}
            >Expense</Modal> */}