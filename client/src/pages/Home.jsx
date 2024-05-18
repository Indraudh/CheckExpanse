import Defaultlayout from "../components/Defaultlayout"
import { useState ,useEffect } from "react";
import '../resources/home.scss';
import { message, Select, Table, } from "antd";
import axios from "axios";
import Spinner from '../components/Spinner';
import moment from 'moment';
import { DatePicker } from 'antd';
import Analytics from "../components/Analytics";
import AddEditTransactions from "../components/AddEditTransactions";
import {
  UnorderedListOutlined,
  AreaChartOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
export default function Home() {
  const { RangePicker } = DatePicker;
  const [showtr,setshowtr]= useState(false);
  const [loading,setLoading]=useState(false);
  const [trdata , settrdata]=useState([]);
  const [frequency , setfrequency]=useState('365');
  const [selectedrange, setselectedrange]=useState([]);
  const [viewType, setViewType] = useState("table");
  const [Type , setType]=useState('all');
  const [selectedItemForEdit, setSelectedItemForEdit] = useState(null);
  const gettransactions = async ()=>{
    try {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem('checkSpense'));
      const response=await axios.post('/api/transactions/get-all-transactions',{userid : user._id , frequency : frequency , ...(frequency === 'custom' && {range : selectedrange}) , Type : Type});
      settrdata(response.data);
      setSelectedItemForEdit(null);
      setLoading(false);
  } catch (error) {
      setLoading(false);
      message.error('Something went wrong');
  }
  }
  const deleteTransaction = async (record) => {
    try {
      setLoading(true);
      await axios.post("/api/transactions/delete-transaction", {
        transactionId: record._id,
      });
      message.success("Transaction deleted successfully");
      gettransactions();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      message.error("Something went wrong");
    }
  };
  useEffect(() => {
     gettransactions();
  }, [frequency , selectedrange , Type ]);
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Type",
      dataIndex: "type",
      render: (text) => <span>{ text === "expence" ?"Expense" : "Income"}</span>
    },
    {
      title: "Reference",
      dataIndex: "refernce",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => {
        return (
          <div>
            <EditOutlined className="edit"
              onClick={() => {
                console.log(record);
                setSelectedItemForEdit(record);
                setshowtr(true);
              }}
            />
            <DeleteOutlined onClick={()=>deleteTransaction(record)}/>
          </div>
        );
      },
    },
  ];
  return (
    <Defaultlayout>
      {loading && <Spinner/>}
        <div className="filter">
          <div className="left">
              <div className="column">
                 <h5>Select Frequency</h5>
                 <Select value={frequency} onChange={(value)=> setfrequency(value)} className="select">
                  <Select.Option value='7'>Last 1 Week</Select.Option>
                  <Select.Option value='30'>Last 1 Month</Select.Option>
                  <Select.Option value='365'>Last 1 Year</Select.Option>
                  <Select.Option value='custom'>Custom</Select.Option> 
                 </Select>
                 {frequency ==='custom' && (
                    <div className="range">
                    <RangePicker value ={selectedrange} onChange={(value)=>setselectedrange(value)} className="select"/>
                    </div>
                 )}
              </div>
              <div className="column">
              <h5>Select Type</h5>
                 <Select value={Type} onChange={(value)=> setType(value)} className="select">
                  <Select.Option value='all'>All</Select.Option>
                  <Select.Option value='expence'>Expense</Select.Option>
                  <Select.Option value='income'>Income</Select.Option>
                 </Select>
              </div>
          </div>
          <div className="right">
             <div className="charts">
             <UnorderedListOutlined
                className={`object ${
                  viewType === "table" ? "active-icon" : "inactive-icon"
                } `}
                onClick={() => setViewType("table")}
                size={30}
              />
              <AreaChartOutlined
                className={`object ${
                  viewType === "analytics" ? "active-icon" : "inactive-icon"
                } `}
                onClick={() => setViewType("analytics")}
                size={30}
              />
             </div>
             <button className="primary add" onClick={()=> setshowtr(true)}>ADD NEW</button>
          </div>
        </div>
        <div className="table-analytics">
          { viewType === "table" 
          ? 
            <div className="table">
            <Table columns={columns} dataSource={trdata} pagination={{ pageSize: 5 }}/>
            </div>
          :
            <div className="analytics">
            <Analytics transactions={trdata} />
            </div> 
          }
        </div>
        <AddEditTransactions setshowtr={setshowtr} showtr={showtr} gettransactions={gettransactions} selectedItemForEdit={selectedItemForEdit} setSelectedItemForEdit={setSelectedItemForEdit} setLoading={setLoading}/> 
      {loading && <Spinner/>}
    </Defaultlayout>
  )
}
