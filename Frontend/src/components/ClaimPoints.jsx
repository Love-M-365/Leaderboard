import { useEffect, useState } from "react";
import confetti from "canvas-confetti";

const users = [
  { name: "Alice", points: 100 },
  { name: "Bob", points: 90 },
  { name: "Charlie", points: 85 },
  { name: "David", points: 80 },
  { name: "Eve", points: 75 },
  { name: "Frank", points: 70 },
  { name: "Grace", points: 65 },
  { name: "Heidi", points: 60 },
  { name: "Ivan", points: 55 },
  { name: "Judy", points: 50 },
  { name: "Mallory", points: 45 },
];

export default function LeaderboardWithClaimPoints() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [popup, setPopup] = useState(null);

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

  const handleClaimPoints = () => {
    if (!selectedUser) return;
    setPopup(`${selectedUser.name} gained 10 points! 🎉`);
    confetti();
  };

 

  return (
    <div className="p-6 max-w-3xl mx-auto">
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
        {paginatedUsers.map((user, index) => {
          const globalIndex = (currentPage - 1) * itemsPerPage + index;
          
          return (
            <li
              key={user.name}
              className={`flex items-center justify-between p-4 rounded-lg shadow-md cursor-pointer transition-all ${
                selectedUser?.name === user.name
                  ? "bg-blue-100 border border-blue-400"
                  : "bg-white hover:bg-gray-100"
              }`}
              onClick={() => setSelectedUser(user)}
            >
              <div className="flex items-center space-x-3">
            
                <span className="font-medium">{user.name}</span>
              </div>
              <span className="font-semibold text-gray-700">{user.points} pts</span>
            </li>
          );
        })}
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

      {/* Claim Points Section */}
      <div className="mt-6 text-center">
        <h3 className="text-xl font-bold mb-2">Claim Points</h3>
        <button
          className={`px-5 py-2 rounded-lg font-semibold text-white ${
            selectedUser ? "bg-green-600 hover:bg-green-700" : "bg-gray-400 cursor-not-allowed"
          }`}
          onClick={handleClaimPoints}
          disabled={!selectedUser}
        >
          {selectedUser ? `Claim for ${selectedUser.name}` : "Select a user"}
        </button>
      </div>

      {/* Popup */}
      {popup && (
        <div className="fixed bottom-6 right-6 bg-blue-600 text-white px-4 py-2 rounded shadow-lg animate-bounce">
          {popup}
        </div>
      )}
    </div>
  );
}
