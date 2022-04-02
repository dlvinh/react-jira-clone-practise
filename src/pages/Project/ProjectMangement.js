import React, { useState, useEffect } from 'react'
import { Table, Input, Button, Space, Tag } from 'antd';
import { EditFilled, DeleteFilled, } from '@ant-design/icons';
import parse from 'html-react-parser';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { GET_ALL_CATEGORY_API, GET_ALL_PROJECTS } from '../../Redux/ReduxTypeList/typeList';
import { filter } from 'htmlparser2/node_modules/domutils';
import { Tooltip } from 'antd';

// const data = [
//   // {
//   //   key: '1',
//   //   name: 'John Brown',
//   //   age: 32,
//   //   address: 'New York No. 1 Lake Park',
//   // },
//   // {
//   //   key: '2',
//   //   name: 'Joe Black',
//   //   age: 42,
//   //   address: 'London No. 1 Lake Park',
//   // },
//   // {
//   //   key: '3',
//   //   name: 'Jim Green',
//   //   age: 32,
//   //   address: 'Sidney No. 1 Lake Park',
//   // },
//   // {
//   //   key: '4',
//   //   name: 'Jim Red',
//   //   age: 32,
//   //   address: 'London No. 2 Lake Park',
//   // },
//   {
//     "id": 3915,
//     "projectName": "newProject",
//     "description": "<p>Project assign user</p>",
//     "categoryId": 3,
//     "categoryName": "Dự án di động",
//     "alias": "newproject",
//     "deleted": false
//   },
//   {
//     "id": 3916,
//     "projectName": "Task 1",
//     "description": "<p>Nội dung task 1</p>",
//     "categoryId": 1,
//     "categoryName": "Dự án web",
//     "alias": "task-1",
//     "deleted": false
//   }
// ];

export default function ProjectMangement() {
  // CALL API to get all projects when it first load
  const dispacth = useDispatch();
  useEffect(() => {
    // Call API first with saga action
    let action = { "type": GET_ALL_PROJECTS }
    dispacth(action)
  }, [])

  useEffect(() => {
    let action = {
      type: GET_ALL_CATEGORY_API
    }
    dispacth(action);
  })

  const data = useSelector(state => state.ProjectManagementStateReducer.projectList);
  const filterList = useSelector(state => state.JiraProjectStateReducer.filterList);


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
    //----------- PROJECT ID TABLE ---------------
    {
      title: 'Project ID',
      dataIndex: 'id',
      key: 'id',
      sorter: (item1, item2) => {
        return item1.id - item2.id
      },
      sortDirections: ['descend'], // short theo 1 kieu
      ellipsis: true,
    },
    // -------------- PROJECT NAME --------------
    {
      title: 'Project Name',
      dataIndex: 'projectName',
      key: 'projectName',
      sorter: (item1, item2) => {
        let project1 = item1.projectName?.trim().toLowerCase();
        let project2 = item2.projectName?.trim().toLowerCase();
        if (project1 < project2) {
          return -1;
        }
        if (project1 > project2) {
          return 1;
        }
        return 0
      },

      render: (text, record, index) => {
        return <>{text ? text : "Unknow"}</>
      },
      ellipsis: true,
    },
    //----------- PROJECT CATEGORY ---------------
    {
      title: 'Category',
      dataIndex: 'categoryName',
      key: 'categoryName',
      filters: filterList,
      onFilter: (value, record) => {
        console.log({
          "value": value,
          "record": record
        })

        return record.categoryName.startsWith(value)
      },
      ellipsis: true,
    },
    //----------- DESCRIPTION TABLE ---------------
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      sorter: (a, b) => {
        return a.description.length - b.description.length
      },
      ellipsis: {
        showTitle: false,
      },
      // ellipsis: true,
      // due to the descriptions are returned in HTML tag syntax, => render() function of ant design help to sovle the problem
      render: (text, record, index) => {
        // uncomment to see the meaning of text, record andn index 
        //console.log({
        //   "text": text,
        //   "record": record,
        //   "index": index
        // })
        let convertHtmlContent = parse(text);
        return <>
          <Tooltip placement="topLeft" title={convertHtmlContent}>{convertHtmlContent}</Tooltip>
        </>
      },

    },
    //------------- PROJECT CREATOR ------------
    {
      title: 'Creator',
      dataIndex: 'name',
      key: 'name',
      render: (text, record, index) => {
        return <>
          {/* record.creator?.name goi la optional chaining*/}
          <Tag color="lime">{record.creator?.name}</Tag>
        </>
      }
    },
    //----------- DESCRIPTION TABLE ---------------
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (text, record, index) => {
        return <>
          <Button className='mr-2' type='primary' icon={<EditFilled />}></Button>
          <Button className='ml-2' type='danger' icon={<DeleteFilled />}></Button>
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
