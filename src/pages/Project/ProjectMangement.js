import React, { useState } from 'react'
import { Table, Input, Button, Space } from 'antd';
import { SearchOutlined ,EditFilled,DeleteFilled} from '@ant-design/icons';
import parse from 'html-react-parser';

const data = [
  // {
  //   key: '1',
  //   name: 'John Brown',
  //   age: 32,
  //   address: 'New York No. 1 Lake Park',
  // },
  // {
  //   key: '2',
  //   name: 'Joe Black',
  //   age: 42,
  //   address: 'London No. 1 Lake Park',
  // },
  // {
  //   key: '3',
  //   name: 'Jim Green',
  //   age: 32,
  //   address: 'Sidney No. 1 Lake Park',
  // },
  // {
  //   key: '4',
  //   name: 'Jim Red',
  //   age: 32,
  //   address: 'London No. 2 Lake Park',
  // },
  {
    "id": 3915,
    "projectName": "newProject",
    "description": "<p>Project assign user</p>",
    "categoryId": 3,
    "categoryName": "Dự án di động",
    "alias": "newproject",
    "deleted": false
  },
  {
    "id": 3916,
    "projectName": "Task 1",
    "description": "<p>Nội dung task 1</p>",
    "categoryId": 1,
    "categoryName": "Dự án web",
    "alias": "task-1",
    "deleted": false
  }
];

export default function ProjectMangement() {
  const [state, setState] = useState({
    filteredInfo: null,
    sortedInfo: null

  });
  const handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };
  const clearFilters = () => {
    setState({ filteredInfo: null });
  };

  const clearAll = () => {
    setState({
      filteredInfo: null,
      sortedInfo: null,
    });
  };

  // AGE SORT FUNCTION
  const setAgeSort = () => {
    this.setState({
      sortedInfo: {
        order: 'descend',
        columnKey: 'age',
      },
    });
  };

  // 
  let sortedInfo = state.sortedInfo || {};
  let filteredInfo = state.filteredInfo || {};
  const columns = [
    // RENDER BY ORDER OF ARRAY
    // dataIndex and key should be corresponding to properties of object
    {
      title: 'Project ID',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.id - b.id,
      sortOrder: sortedInfo.columnKey === 'id' && sortedInfo.order,
      ellipsis: true,
    },
    {
      title: 'Project Name',
      dataIndex: 'projectName',
      key: 'projectName',
      filters: [
        { text: 'Joe', value: 'Joe' },
        { text: 'Jim', value: 'Jim' },
      ],
      filteredValue: filteredInfo.projectName || null,
      onFilter: (value, record) => record.projectName.includes(value),
      sorter: (a, b) => a.projectName.length - b.projectName.length,
      sortOrder: sortedInfo.columnKey === 'projectname' && sortedInfo.order,
      ellipsis: true,
    },
  
    {
      
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      filters: [
        { text: 'London', value: 'London' },
        { text: 'New York', value: 'New York' },
      ],
      filteredValue: filteredInfo.description || null,
      onFilter: (value, record) => record.description.includes(value),
      sorter: (a, b) => a.description.length - b.description.length,
      sortOrder: sortedInfo.columnKey === 'description' && sortedInfo.order,
      ellipsis: true,
      // due to the descriptions are returned in HTML tag syntax, => render() function of ant design help to sovle the problem
      render: (text, record, index)=>{
        // uncomment to see the meaning of text, record andn index 
        //console.log({
        //   "text": text,
        //   "record": record,
        //   "index": index
        // })
        let convertHtmlContent =  parse(text);
        console.log();
        return <>
            {convertHtmlContent}
        </>
      }
    },
    {
      title: 'Action',
      dataIndex: 'id',
      key: 'id',
      render:(text, record, index)=>{
        return <>
            <Button className='mr-2' type='primary' icon={<EditFilled/>}></Button> 
            <Button className='ml-2' type='danger'  icon={<DeleteFilled />}></Button> 
        </>
      }
    }
  ];


  return (
    <div className='container-fluid mt-5'>
      <h3>Project Management</h3>
      <Space style={{ marginBottom: 16 }}>
        {/* <Button onClick={setAgeSort}>Sort age</Button>
        <Button onClick={clearFilters}>Clear filters</Button>
        <Button onClick={clearAll}>Clear filters and sorters</Button> */}
      </Space>
      <Table columns={columns} dataSource={data} onChange={handleChange} />
    </div>
  )
}
