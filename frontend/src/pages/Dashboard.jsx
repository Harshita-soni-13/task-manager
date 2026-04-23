import { useEffect, useState } from "react";
import API from "../services/api";
import { FaTrash, FaEdit, FaTasks, FaSignOutAlt } from "react-icons/fa";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [editId, setEditId] = useState(null);
  const [user, setUser] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [toast, setToast] = useState("");

  const fetchTasks = async () => {
    const res = await API.get("/tasks/get-all");
    setTasks(res.data.data);
  };

  const addTask = async () => {
    if (!title.trim()) return;

    if (editId) {
      await API.put(`/tasks/${editId}`, { title });
      setEditId(null);
    } else {
      await API.post("/tasks/create", { title });
    }

    setTitle("");
    fetchTasks();
  };

  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowConfirm(true);
  };

  const deleteTask = async () => {
    await API.delete(`/tasks/${deleteId}`);
    setShowConfirm(false);
    fetchTasks();

    setToast("Task deleted successfully ✅");
    setTimeout(() => setToast(""), 2000);
  };

  const handleEdit = (task) => {
    setTitle(task.title);
    setEditId(task._id);
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  useEffect(() => {
    fetchTasks();
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#2563eb] text-white">

      {/* SIDEBAR */}
      <div className="w-64 bg-white/10 backdrop-blur-lg border-r border-white/20 p-6 hidden md:block">
        <h2 className="text-2xl font-bold mb-10">TaskFlow 🚀</h2>

        <div className="space-y-4">
          <div className="flex items-center gap-3 text-blue-300">
            <FaTasks />
            <span>Dashboard</span>
          </div>

          <button
            onClick={logout}
            className="flex items-center gap-3 text-red-400 hover:text-red-500 mt-10"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </div>

      {/* MAIN */}
      <div className="flex-1 p-6">

        {/* TOP BAR */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>

          <div className="flex items-center gap-3">
            <div className="bg-blue-500 w-10 h-10 flex items-center justify-center rounded-full font-bold">
              {user?.name?.charAt(0)}
            </div>
            <div>
              <p className="font-semibold">{user?.name}</p>
              <p className="text-xs text-blue-200">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* ADD TASK */}
        <div className="bg-white/10 p-4 rounded-xl flex gap-3 mb-6 backdrop-blur-lg border border-white/20">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="✨ Enter your task..."
            className="flex-1 p-3 rounded-lg bg-white/20 outline-none border border-white/30"
          />
          <button
            onClick={addTask}
            className="bg-blue-500 px-6 rounded-lg hover:bg-blue-600 transition"
          >
            {editId ? "Update" : "Add"}
          </button>
        </div>

        {/* TASK LIST */}
        <div className="grid gap-4">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="bg-white/10 backdrop-blur-lg border border-white/20 p-4 rounded-xl flex justify-between items-center hover:scale-[1.01] transition"
            >
              <span className="text-lg">{task.title}</span>

              <div className="flex gap-4 text-lg">
                <FaEdit
                  className="cursor-pointer text-blue-300 hover:scale-125"
                  onClick={() => handleEdit(task)}
                />
                <FaTrash
                  className="cursor-pointer text-red-400 hover:scale-125"
                  onClick={() => confirmDelete(task._id)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* DELETE CONFIRM MODAL */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white text-black p-6 rounded-xl text-center">
            <p className="mb-4 font-semibold">
              Are you sure you want to delete?
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={deleteTask}
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Yes
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="bg-gray-300 px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TOAST */}
      {toast && (
        <div className="fixed bottom-5 right-5 bg-green-500 px-4 py-2 rounded-lg shadow-lg">
          {toast}
        </div>
      )}
    </div>
  );
}

export default Dashboard;