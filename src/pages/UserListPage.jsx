import React, { useEffect, useState } from 'react';
import { API_BASE_URL, API } from '../lib/api';
import { toast } from 'react-hot-toast';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize] = useState(10); 


  const [editUserId, setEditUserId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    userName: "",
    email: "",
    fullName: "",
    bio: "",
    phone: "",
    avatarUrl: ""
  });

  const fetchUsers = async (page) => {
    setLoading(true);
    try {
        const queryParams = new URLSearchParams({
            pageNumber: page,
            pageSize: pageSize
        }).toString();

        const response = await fetch(`${API_BASE_URL}${API.USERS.LIST}?${queryParams}`);
        
        if (!response.ok) {
            const error = await response.text()
            let errorMessage = "ユーザーリストの取得に失敗しました"

            try {
                errorMessage = JSON.parse(error).message || "ユーザーリストの取得に失敗しました"
            } catch {
                errorMessage = error || "ユーザーリストの取得に失敗しました"
            }

            throw new Error(errorMessage)
        }
        
        const jsonResponse = await response.json();
        
        setUsers(jsonResponse.data || []);
        
        setTotalPages(jsonResponse.totalPages || 1); 

    } catch (err) {
        console.error("Fetch error:", err);
        toast.error("ユーザーリストの取得に失敗しました");
    } finally {
        setLoading(false);
    }
  }

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]); 

  const handleEditClick = (event, user) => {
    event.preventDefault();
    setEditUserId(user.id);
    setEditFormData({
        userName: user.userName || "",
        email: user.email || "",
        fullName: user.fullName || "",
        bio: user.bio || "",
        phone: user.phone || "",
        avatarUrl: user.avatarUrl || ""
    });
  };

  const handleEditFormChange = (event) => {
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;
    setEditFormData(prev => ({ ...prev, [fieldName]: fieldValue }));
  };

  const handleCancelClick = () => {
    setEditUserId(null);
  };

  const handleSaveClick = async (userId) => {
    try {
        const response = await fetch(`${API_BASE_URL}${API.USERS.USER(userId)}`, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(editFormData),
        });

        if (!response.ok) {
            const error = await response.text()
            let errorMessage = "ユーザーの更新に失敗しました"

            try {
                errorMessage = JSON.parse(error).message || "ユーザーの更新に失敗しました"
            } catch {
                errorMessage = error || "ユーザーの更新に失敗しました"
            }

            throw new Error(errorMessage)
        }

        const updatedUsers = users.map((user) => 
            user.id === userId ? { ...user, ...editFormData } : user
        );
        setUsers(updatedUsers);
        setEditUserId(null);
        toast.success("ユーザーの更新に成功しました");

    } catch (error) {
        console.log("Update error:", error);
        toast.error("ユーザーの更新に失敗しました");
    }
  };

  const handleDeleteClick = async (userId) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa?")) return;
    try {
        const response = await fetch(`${API_BASE_URL}${API.USERS.USER(userId)}`, {
            method: "DELETE",
        });
        if (!response.ok) {
            const error = await response.text()
            let errorMessage = "ユーザーの削除に失敗しました"

            try {
                errorMessage = JSON.parse(error).message || "ユーザーの削除に失敗しました"
            } catch {
                errorMessage = error || "ユーザーの削除に失敗しました"
            }

            throw new Error(errorMessage)
        }

        toast.success("ユーザーの削除に成功しました");
        
        fetchUsers(currentPage); 
        
    } catch (error) {
        console.log("Delete error:", error);
        toast.error("ユーザーの削除に失敗しました");
    }
  }

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
        setCurrentPage(newPage);
    }
  };

  const renderPagination = () => {

    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }

    return (
        <div className="flex justify-center mt-6">
            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm bg-white" aria-label="Pagination">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`relative inline-flex items-center rounded-l-md px-3 py-2 text-blue-500 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${currentPage === 1 ? 'cursor-not-allowed text-gray-300' : ''}`}
                >
                    <span className="sr-only">Previous</span>
                    &laquo;
                </button>

                {pages.map((page) => (
                    <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0 
                        ${currentPage === page 
                            ? 'z-10 bg-blue-50 text-blue-600'
                            : 'text-blue-500 hover:bg-gray-50' 
                        }`}
                    >
                        {page}
                    </button>
                ))}

                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`relative inline-flex items-center rounded-r-md px-3 py-2 text-blue-500 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${currentPage === totalPages ? 'cursor-not-allowed text-gray-300' : ''}`}
                >
                    <span className="sr-only">Next</span>
                    &raquo;
                </button>
            </nav>
        </div>
    );
  };

  if (loading && users.length === 0) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="p-10 bg-white max-h-screen font-sans">
      <div className="w-full max-w-7xl mx-auto">    
        <form> 
          <table className="w-full border-collapse mb-6">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="py-3 px-4 text-left text-xs font-bold text-gray-600 uppercase w-1/3">User Name</th>
                <th className="py-3 px-4 text-left text-xs font-bold text-gray-600 uppercase w-1/3">Email</th>
                <th className="py-3 px-4 text-center text-xs font-bold text-gray-600 uppercase w-1/3">Actions</th>
              </tr>
            </thead>
            
            <tbody>
              {users.map((user) => (
                <React.Fragment key={user.id}>
                  {editUserId === user.id ? (
                    // --- EDIT MODE ---
                    <tr className="bg-blue-50">
                      <td className="py-4 px-4">
                        <input
                          type="text" required name="userName"
                          value={editFormData.userName} onChange={handleEditFormChange}
                          className="w-full px-2 py-1 border border-blue-300 rounded text-sm"
                        />
                      </td>
                      <td className="py-4 px-4">
                        <input
                          type="email" required name="email"
                          value={editFormData.email} onChange={handleEditFormChange}
                          className="w-full px-2 py-1 border border-blue-300 rounded text-sm"
                        />
                      </td>
                      <td className="py-4 px-4 text-center">
                        <div className="flex justify-center gap-2">
                            <button type="button" onClick={() => handleSaveClick(user.id)} className="bg-green-600 text-white text-xs px-3 py-1.5 rounded">Save</button>
                            <button type="button" onClick={handleCancelClick} className="bg-gray-400 text-white text-xs px-3 py-1.5 rounded">Cancel</button>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    // --- VIEW MODE ---
                    <tr className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4 text-sm font-medium text-gray-800">
                        {user.userName || <span className="text-gray-400 italic">No Name</span>}
                      </td>
                      <td className="py-4 px-4 text-sm text-gray-600">{user.email}</td>
                      <td className="py-4 px-4 text-center">
                        <div className="flex justify-center gap-3">
                          <button type="button" onClick={(e) => handleEditClick(e, user)} className="bg-blue-600 hover:bg-blue-700 text-white text-xs py-1.5 px-4 rounded">Edit</button>
                          <button type="button" onClick={() => handleDeleteClick(user.id)} className="bg-red-700 hover:bg-red-800 text-white text-xs py-1.5 px-4 rounded">Delete</button>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </form>

        {/* --- PAGINATION CONTROLS --- */}
        {renderPagination()}

      </div>
    </div>
  );
};

export default UserList;