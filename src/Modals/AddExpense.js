import React from "react"
import { Modal,Form,Button,DatePicker,Select,Input ,InputNumber} from "antd";
import { deleteDoc } from "firebase/firestore";
const AddExpense=({isExpenseModalVisible, handleExpenseModal,onFinish, setShowIncomePie,setTypeFilter})=>{
    const[form]=Form.useForm();
    return(
        <div>
       <Modal style={{ fontWeight: "600" }}
                title="Add Expense"
                visible={isExpenseModalVisible}
                onCancel={handleExpenseModal}
                footer={null}
            >
                <Form
                form={form}
                layout="vertical"
                 onFinish={(values)=>{
                      onFinish(values,"expense")
                    form.resetFields();
                    setTypeFilter("")
                    handleExpenseModal();
                    setShowIncomePie(false);
                }}>
                    <Form.Item label="Name"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: "please input the name of the transaction"
                            }
                        ]} >
                        <Input type="text"/>
                    </Form.Item>
                    <Form.Item label="Amount"
                        name="amount"
                        rules={[
                            {
                                required: true,
                                message: "please input the income amount!"
                            }
                        ]} >
                        <InputNumber type="number" />
                    </Form.Item>
                    <Form.Item label="Mode"
                           name="mode"
                           rules={[
                            {
                                required: true,
                                message: "please select the valid mode of transaction!"
                            }
                        ]}
                        >
                        <Select>
                            <Select.Option value="cash">Cash</Select.Option>
                            <Select.Option value="upi">UPI</Select.Option>
                            <Select.Option value="credit card">Credit Card</Select.Option>
                            <Select.Option value="debit card">Debit Card</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Date" 
                               name="date"
                               rules={[
                                {
                                    required: true,
                                    message: "please input the Date!"
                                }
                            ]}
                             >
                        <DatePicker   />
                    </Form.Item>
                    <Form.Item label="Tag"
                           name="tag"
                           rules={[
                            {
                                required: true,
                                message: "please select the valid tag!"
                            }
                        ]}
                        >
                        <Select>
                            <Select.Option value="food">Food</Select.Option>
                            <Select.Option value="movie">Movie</Select.Option>
                            <Select.Option value="others">Others</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item  >
                        <Button type="primary" htmlType="submit">Add Expense</Button>
                    </Form.Item>
                </Form>

            </Modal>
        </div>
    )
}
export default AddExpense;