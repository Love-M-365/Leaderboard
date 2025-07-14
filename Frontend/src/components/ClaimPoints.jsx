import { useEffect, useState } from "react";
import confetti from "canvas-confetti";

export default function LeaderboardWithClaimPoints({ refresh, onClaimRefresh }) {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [popup, setPopup] = useState(null);
  const [loading, setLoading] = useState(false); // 👈 new loading state

  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/users");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error("Error fetching users", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [refresh]);

  useEffect(() => {
    if (popup) {
      const timeout = setTimeout(() => setPopup(null), 3000);
      return () => clearTimeout(timeout);
    }
  }, [popup]);

  const filteredUsers = users
    .filter((u) => u.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => b.points - a.points);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleClaimPoints = async () => {
    if (!selectedUser) return;

    const randomPoints = Math.floor(Math.random() * 10) + 1;
    setLoading(true); // 👈 start loading

    try {
      const res = await fetch(
        `http://localhost:5000/api/users/${selectedUser._id}/increase`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ pointsToAdd: randomPoints }),
        }
      );

      const updatedUser = await res.json();

      setUsers((prevUsers) =>
        prevUsers.map((u) =>
          u._id === updatedUser._id ? updatedUser : u
        )
      );

      setSelectedUser(updatedUser);
      setPopup(`${updatedUser.name} gained ${randomPoints} points! 🎉`);
      confetti();

      if (onClaimRefresh) {
        onClaimRefresh(updatedUser, randomPoints);
      }

      // ✅ Save to history backend
      await fetch("http://localhost:5000/api/claim-history", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userName: updatedUser.name,
          points: randomPoints,
          timestamp: new Date().toISOString(),
        }),
      });

    } catch (error) {
      console.error("Error claiming points:", error);
    } finally {
      setLoading(false); // 👈 stop loading
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto relative">
      <h2 className="text-3xl font-bold mb-4 text-center">Claim Points here</h2>

      <input
        type="text"
        placeholder="Search user..."
        className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4"
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          setCurrentPage(1);
        }}
      />

      <ul className="space-y-2 mb-6">
        {paginatedUsers.map((user) => (
          <li
            key={user._id}
            className={`flex items-center justify-between p-4 rounded-lg shadow-md cursor-pointer transition-all ${
              selectedUser?._id === user._id
                ? "bg-blue-100 border border-blue-400"
                : "bg-white hover:bg-gray-100"
            }`}
            onClick={() => setSelectedUser(user)}
          >
            <div className="flex items-center space-x-3">
              <img
                src={`https://api.dicebear.com/7.x/${user.avatarStyle}/svg?seed=${user.avatarSeed}`}
                alt={user.name}
                className="w-10 h-10 rounded-full border-2"
              />
              <span className="font-medium">{user.name}</span>
            </div>
            <span className="font-semibold text-gray-700">
              {user.points} pts
            </span>
          </li>
        ))}
      </ul>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mb-10">
        <button
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-40"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          &#x2190; Prev
        </button>
        <span className="font-semibold">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-40"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next &#x2192;
        </button>
      </div>

      {/* Claim Button */}
      <div className="mt-6 text-center">
        <h3 className="text-xl font-bold mb-2">Claim Points</h3>
        <button
          className={`px-5 py-2 rounded-lg font-semibold text-white ${
            selectedUser
              ? "bg-green-600 hover:bg-green-700"
              : "bg-gray-400 cursor-not-allowed"
          } ${loading ? "opacity-70 cursor-wait" : ""}`}
          onClick={handleClaimPoints}
          disabled={!selectedUser || loading}
        >
          {loading
            ? "Claiming..."
            : selectedUser
            ? `Claim for ${selectedUser.name}`
            : "Select a user"}
        </button>
      </div>

      {/* Notification Popup */}
      {popup && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-xl animate-bounce z-50">
          {popup}
        </div>
      )}
    </div>
  );
}
