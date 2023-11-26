import React,{useState} from "react"
import { Modal,Form,Button,DatePicker,Select,Input ,InputNumber} from "antd";
const AddIncome=({isIncomeModalVisible,handleIncomeModal,onFinish,setShowIncomePie,showIncomePie,setTypeFilter})=>{
    const[form]=Form.useForm();

      
    return(
        <div>
            <Modal style={{ fontWeight: "600" }}
                title="Add Income"
                visible={isIncomeModalVisible}
                onCancel={handleIncomeModal}
                footer={null}
                
            >
                <Form
                form={form}
                layout="vertical"
                 onFinish={(values)=>{
                      onFinish(values,"income")
                    form.resetFields();
                    setTypeFilter("");
                    handleIncomeModal();
                    setShowIncomePie(true)
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
                        <DatePicker  />
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
                            <Select.Option value="salary">Salary</Select.Option>
                            <Select.Option value="freelance">Freelance</Select.Option>
                            <Select.Option value="investment">Investment</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item  >
                        <Button type="primary" htmlType="submit">Add Income</Button>
                    </Form.Item>
                </Form>

            </Modal>
        </div>
    )
}
export default AddIncome;