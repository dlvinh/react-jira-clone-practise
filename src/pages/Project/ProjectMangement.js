import React, { useState, useEffect, useRef } from 'react'
import { Table, Button, Space, Tag, Popconfirm, message, Avatar, Popover, AutoComplete } from 'antd';
import { EditFilled, DeleteFilled, } from '@ant-design/icons';
import parse from 'html-react-parser';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { ASSIGN_MEMBERS_TO_PROJECT, BINDING_PROJECT_TO_REDUX, DELETE_MEMBER_FORM_PROJECT, DELETE_PROJECT, GET_ALL_CATEGORY_API, GET_ALL_MEMBERS, GET_ALL_PROJECTS, OPEN_DRAWER, OPEN_EDIT_FORM } from '../../Redux/ReduxTypeList/typeList';
import { Tooltip } from 'antd';
import EditProjectForm from '../../components/Form/EditProjectForm';
import { CloseCircleOutlined } from '@ant-design/icons';
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
  }, [])

  //EDIT PROJECT 
  const openEditForm = (project) => {
    dispacth({
      type: OPEN_EDIT_FORM,
      content: <EditProjectForm></EditProjectForm>
    });
    dispacth({
      type: BINDING_PROJECT_TO_REDUX,
      project: project
    });
  }

  const deleteProject = (project) => {
    dispacth({
      type: DELETE_PROJECT,
      project: project
    });
  }


  const data = useSelector(state => state.ProjectManagementStateReducer.projectList);
  const filterList = useSelector(state => state.JiraProjectStateReducer.filterList);
  const autocompleteOptions = useSelector(state => state.UserStateReducer.memberList);
  // Debounce technique for autocomplete
  const wordSearch = useRef(null);

  const [state, setState] = useState({
    filteredInfo: null,
    sortedInfo: null

  });
  const [autocompeteValueState, setautocompeteValueState] = useState("");
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

  // POP CONFIRMATIION

  // AGE SORT FUNCTION
  const setAgeSort = () => {
    this.setState({
      sortedInfo: {
        order: 'descend',
        columnKey: 'age',
      },
    });
  };
  // let sortedInfo = state.sortedInfo || {};
  // let filteredInfo = state.filteredInfo || {};

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
    // ------------- PROJECT MEMBER- --------
    {
      title: 'Members',
      dataIndex: 'members',
      key: 'members',
      render: (text, record, index) => {
        // userId: 1537, name: 'Ngọc Long', avatar: 'https://ui-avatars.com/api/?name=Ngọc Long'
        return <div>
          {record.members?.slice(0, 3).map((member, index) => {
            return <>
              {/* Generate table when hover on the avatar */}
              <Popover key={index} content={
                <div>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Member Id</th>
                        <th>Avatar</th>
                        <th>Name</th>
                      </tr>
                    </thead>
                    <tbody>
                      {record.members.map((item, index) => {
                        return <tr>
                          <td>{item.userId}</td>
                          <td><Avatar src={item.avatar}></Avatar></td>
                          <td>{item.name}</td>
                          <td><button className='btn btn-danger' onClick={() => {
                            dispacth({
                              type: DELETE_MEMBER_FORM_PROJECT,
                              data: {
                                "projectId": record.id,
                                "userId": item.userId
                              }
                            })
                          }}><CloseCircleOutlined /></button></td>
                        </tr>
                      })}
                    </tbody>
                  </table>
                </div>
              }>
                {/* try to put Avatar out of Popover => it wont work */}
                <Avatar src={member.avatar} key={index} />
              </Popover>

            </>
          })}
          {record.members?.length > 3 ? <Avatar>...</Avatar> : ''}
          <Popover key={index} content={
            <div>
              <AutoComplete
                style={{
                  width: 200,
                }}
                // optiion can mang {label, value}[]
                options={
                  autocompleteOptions?.map((option, index) => {
                    return {
                      label: option.name,
                      value: option.userId.toString()
                    }
                  })
                }
                onChange={(editText) => {
                  setautocompeteValueState(editText);
                }}
                onSelect={(value, option) => {
                  setautocompeteValueState(option.label);
                  // ASSIGN_MEMBERS_TO_PROJECT
                  dispacth({
                    type: ASSIGN_MEMBERS_TO_PROJECT,
                    data: {
                      "projectId": record.id,
                      "userId": option.value
                    }
                  })
                }}


                value={autocompeteValueState}
                // Searching Item => Call API to get All members (member list)
                onSearch={(value) => {
                  /**
                   * Ky thuat Debounce search thuong se dde nguoi dung nhap vai 
                   * letter sau do khoangh vai giay sau se disopacth len API
                   * de lam the ta dung setTimeOut and useRef
                   * useRef giup cho react biet duoc gia tri duoc nhap truoc do la gi => biet duoc ngyuoi do co nhpa gia tri moi vao ko>?
                   * setTimeOut => de set thoi gian do viec call API
                   */
                  if (wordSearch.current){
                    // new wordSearch duoc nhap (khac null) thi se clear timeout va run doan code ben duoi
                    clearTimeout(wordSearch.current);
                  }
                  wordSearch.current = setTimeout(dispacth({
                    type: GET_ALL_MEMBERS,
                    keyWords: value
                  }),500)
                  
                }}
                placeholder="input here"
              />
            </div>
          } title="Add Member" trigger="click">
            <Button shape='circle'>+</Button>
          </Popover>

        </div>

      }
    },
    //----------- DESCRIPTION TABLE ---------------
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (text, record, index) => {
        return <>
          <Button className='mr-2' type='primary' icon={<EditFilled />} onClick={() => {
            openEditForm(record);
          }}></Button>

          <Popconfirm
            title="Are you sure to delete this project?"
            onConfirm={() => {
              deleteProject(record)
            }}
            okText="Yes"
            cancelText="No"
          >
            <Button className='ml-2' type='danger' icon={<DeleteFilled />}></Button>
          </Popconfirm>
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
