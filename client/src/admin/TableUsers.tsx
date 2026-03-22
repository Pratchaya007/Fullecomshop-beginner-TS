import { changUserRole, changUserStatus, getlistAllUser } from "@/api/admin";
import { useEcomStore } from "@/stores/ecom-store";
import { useEffect, useState } from "react";

interface user {
  id: number;
  role: string;
  enabled: boolean;
  email: string;
}

const TableUsers = () => {
  const token = useEcomStore((state) => state.token);
  const [users, setUsers] = useState<user[]>([]);

  const handleGetUser = (token: string) => {
    getlistAllUser(token!)
      .then((res) => {
        setUsers(res.data.date);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleOcChangeUserStatus = (userId: number, userStatus: boolean) => {
    console.log(userId, userStatus);
    const value = {
      id: userId,
      enabled: !userStatus,
    };
    changUserStatus(token!, value)
      .then((res) => {
        console.log(res);
        handleGetUser(token!); //เรียกข้อมูลใหม่ด้วย
      })
      .catch((err) => console.log(err));
  };
  const handleOcChangeRole = (userId: number, userRole: string) => {
    console.log(userId, userRole);
    const value = {
      id: userId,
      role: userRole,
    };
    changUserRole(token!, value)
      .then((res) => {
        console.log(res);
        handleGetUser(token!); //เรียกข้อมูลใหม่ด้วย
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (token) {
      handleGetUser(token);
    }
  }, [token]);

  console.log(users);

  return (
    // <div className="bg-gray-100 p-4 rounded-md border shadow-md space-x-4 ">
    //   <table>
    //     <thead>
    //       <tr>
    //         <th>ลำดับ</th>
    //         <th>Email</th>
    //         {/* <th>Update Time</th> */}
    //         <th>สิทธิ์</th>
    //         <th>สถานะ</th>
    //       </tr>
    //     </thead>

    //     <tbody>
    //       {users?.map((item, index) => (
    //         <tr key={index}>
    //           <td>{index + 1}</td>
    //           <td>{item.email}</td>
    //           {/* <td>{item.updatedAt}</td> */}
    //           <td>
    //             <select onChange={(e) => handleOcChangeRole(item.id ,e.target.value )}
    //               value={item.role}
    //               >
    //               <option >USER</option>
    //               <option >ADMIN</option>
    //             </select>

    //           </td>
    //           <td>{`${item.enabled ? 'Active':'Inactive'}`}</td>
    //           <td>
    //             <button onClick={() => handleOcChangeUserStatus(item.id , item.enabled)}>
    //               {item.enabled ? 'Disable' : 'Enable'}
    //             </button>
    //           </td>
    //         </tr>
    //       ))}
    //     </tbody>
    //   </table>
    // </div>
    <div className="bg-white p-6 rounded-2xl shadow-lg border">
      <h2 className="text-xl font-semibold mb-4">User Management</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-700 uppercase text-xs">
              <th className="px-4 py-3">ลำดับ</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">สิทธิ์</th>
              <th className="px-4 py-3">สถานะ</th>
              <th className="px-4 py-3 text-center">จัดการ</th>
            </tr>
          </thead>

          <tbody>
            {users?.map((item, index) => (
              <tr key={index} className="border-b hover:bg-gray-50 transition">
                <td className="px-4 py-3">{index + 1}</td>

                <td className="px-4 py-3 font-medium text-gray-800">
                  {item.email}
                </td>

                <td className="px-4 py-3">
                  <select
                    onChange={(e) =>
                      handleOcChangeRole(item.id, e.target.value)
                    }
                    value={item.role}
                    className="border rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    <option value="USER">USER</option>
                    <option value="ADMIN">ADMIN</option>
                  </select>
                </td>

                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.enabled
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {item.enabled ? "Active" : "Inactive"}
                  </span>
                </td>

                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() =>
                      handleOcChangeUserStatus(item.id, item.enabled)
                    }
                    className={`px-3 py-1 rounded-lg text-white text-xs font-medium transition ${
                      item.enabled
                        ? "bg-red-500 hover:bg-red-600"
                        : "bg-green-500 hover:bg-green-600"
                    }`}
                  >
                    {item.enabled ? "Disable" : "Enable"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default TableUsers;
