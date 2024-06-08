import {
  Popconfirm,
  Space,
  Table,
  TableProps,
  Tooltip,
} from "antd";
import { Link } from "react-router-dom";
import { DeleteFilled, EditOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchUsers } from "../redux/slices/userSlice";
import { deleteUserCall } from "../redux/actions/userActions";
import { DataType, parseDateToReadable, tableDataSourceMapper } from "../utilities";
import { paginationType } from "../requests/user";




const columns: TableProps<DataType>["columns"] = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "eamil",
  },
  {
    title: "createdAt",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (_, record) => {

     return parseDateToReadable(record.createdAt) ;
    },
  },

  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <Tooltip title={"Edit"}>
          <Link to={"/edit/" + record.key}>
            <EditOutlined className="text-green-600" />
          </Link>
        </Tooltip>
        <Popconfirm
          title="Delete the task"
          description="Are you sure to delete this task?"
          onConfirm={() => {
            deleteUserCall(record.key);
          }}
          onCancel={() => {}}
          okText="Yes"
          cancelText="No"
        >
          <DeleteFilled className="text-red-600" />
        </Popconfirm>
      </Space>
    ),
  },
];

const UserListingPage = () => {
  const { users, status,total } = useAppSelector((state) => state.users);
  const [pagination, setPagination] = useState<paginationType>({
    page: 1,
    perPage: 10,
  });

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(fetchUsers({page:pagination.page,perPage:pagination.perPage}));
  }, [pagination]);

  return (
    <div className="container mx-auto p-4">
    <h2 className="text-xl mb-4 font-semibold">Users</h2>
    <Table
      className="border"
      loading={status == "loading"}
      dataSource={tableDataSourceMapper(users,['_id','name','email','createdAt'])}
      pagination={{
        current: pagination.page,
        pageSize: pagination.perPage,
        total: total,
        showSizeChanger:true,
        pageSizeOptions: ['1','10', '20', '50', '100'],
        showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
      }}
      onChange={(pagination)=>{
         setPagination({page:pagination.current,perPage:pagination.pageSize})
      }}
      columns={columns}
    />
   </div>
  );
};

export default UserListingPage;
