import React from 'react'
import { Form, message, Select, Modal, Input } from "antd";
import axios from "axios";
function AddEditTransactions({setshowtr , selectedItemForEdit , showtr , gettransactions ,setLoading ,setSelectedItemForEdit}) {
    const [form] = Form.useForm();
    const onFinish = async (values)=>{
        try {
          const user = JSON.parse(localStorage.getItem('checkSpense'));
          setLoading(true);
          if(selectedItemForEdit === null){
          await axios.post('api/transactions/add-transaction',{...values , userid : user._id});
          form.resetFields();
          gettransactions();
          message.success('Transactions added successfully');
          }
          else{
            await axios.post('api/transactions/edit-transaction',{...values , userid : user._id , _id : selectedItemForEdit._id});
            form.resetFields();
            gettransactions();
            message.success('Transactions Updated successfully');
          }
          setSelectedItemForEdit(null);
          form.resetFields();
          setshowtr(false);
          setLoading(false);
      } catch (error) {
          message.error('Something went wrong');
          setLoading(false);
      }
      }
    const modalcontrol = ()=>{
        setSelectedItemForEdit(null);
        form.resetFields();
        setshowtr(false);
     }
  return (
<Modal title={selectedItemForEdit === null ? "Add Transaction" : "Edit Transaction"} visible={showtr} onCancel={()=>modalcontrol()} footer={false}>
           <Form layout="vertical" className="trform" onFinish={onFinish} initialValues={selectedItemForEdit} >
                <Form.Item label="Amount" name="amount">
                  <Input  type="text" className='input'/>
                </Form.Item>
                <Form.Item label="Type" name="type">
                  <Select> 
                  <Select.Option value="income">Income</Select.Option>
                  <Select.Option value="expence">Expense</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item label="Category" name="category">
                  <Select>
                  <Select.Option value="salary">Salary</Select.Option>
                  <Select.Option value="food">Food</Select.Option>
                  <Select.Option value="clothes">Clothes</Select.Option>
                  <Select.Option value="groceries">groceries</Select.Option>
                  <Select.Option value="medicines">medicines</Select.Option>
                  <Select.Option value="emi">EMI</Select.Option>
                  <Select.Option value="rent">Rent</Select.Option>
                  <Select.Option value="tax">Tax</Select.Option>
                  <Select.Option value="travel">Travel</Select.Option>
                  <Select.Option value="education">Education</Select.Option>
                  <Select.Option value="investment">Investment</Select.Option>
                  <Select.Option value="entertainment">Entertainment</Select.Option>
                  <Select.Option value="freelance">Freelance</Select.Option>
                  <Select.Option value="others">Others</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item label="Date" name="date">
                <Input  type ="date" className="w" label="Date picker" required/>
                </Form.Item>
                <Form.Item label="Reference" name="refernce">
                  <Input  type="text"/>
                </Form.Item>
                <Form.Item label="Description" name="description">
                  <Input  type="text"/>
                </Form.Item>
                 <div className="submit">
                   <button className="primary" type="submit">SAVE</button>
                 </div>
           </Form>
        </Modal>
  )
}

export default AddEditTransactions