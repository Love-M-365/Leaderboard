import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import GoldMedal from "../assets/first.gif";
import SilverMedal from "../assets/secondplace.gif";
import BronzeMedal from "../assets/thirdplace.gif";
import LeaderboardWithClaimPoints from "./ClaimPoints";
import AddUserForm from "./AddUser";

export default function ClaimPointsComponent() {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [leaderboard, setLeaderboard] = useState([]);
  const [history, setHistory] = useState([]);
  const [highlightedUserId, setHighlightedUserId] = useState(null);
  const [bgIndex, setBgIndex] = useState(0);
  const [triggerRefresh, setTriggerRefresh] = useState(false);

  const handleUserAdded = () => {
    setTriggerRefresh((prev) => !prev); // toggle refresh state
  };

  const backgrounds = [
    "bg-gradient-to-r from-purple-400 via-pink-500 to-red-500",
    "bg-gradient-to-r from-green-400 via-blue-500 to-purple-500",
    "bg-gradient-to-r from-yellow-200 via-red-300 to-pink-500",
  ];

  const sampleUsers = [
    { id: "u1", name: "Aarav Sharma", totalPoints: 0 },
    { id: "u2", name: "Diya Patel", totalPoints: 0 },
    { id: "u3", name: "Rohan Verma", totalPoints: 0 },
    { id: "u4", name: "Ishita Mehta", totalPoints: 0 },
    { id: "u5", name: "Kabir Joshi", totalPoints: 0 },
    { id: "u6", name: "Meera Rao", totalPoints: 0 },
    { id: "u7", name: "Aditya Nair", totalPoints: 0 },
    { id: "u8", name: "Saanvi Kapoor", totalPoints: 0 },
    { id: "u9", name: "Vivaan Gupta", totalPoints: 0 },
    { id: "u10", name: "Anaya Singh", totalPoints: 0 },
  ];

  useEffect(() => {
    setUsers(sampleUsers);
    setLeaderboard(sampleUsers);
    setSelectedUserId(sampleUsers[0]?.id);
  }, []);

  const handleClaim = () => {
    if (!selectedUserId) return;
    const randomPoints = Math.floor(Math.random() * 101);

    const updatedLeaderboard = leaderboard.map((user) => {
      if (user.id === selectedUserId) {
        return { ...user, totalPoints: user.totalPoints + randomPoints };
      }
      return user;
    });

    updatedLeaderboard.sort((a, b) => b.totalPoints - a.totalPoints);

    const claimedUser = users.find((u) => u.id === selectedUserId);
    const newHistoryEntry = {
      userName: claimedUser.name,
      points: randomPoints,
      timestamp: new Date().toISOString(),
    };

    setLeaderboard(updatedLeaderboard);
    setHistory((prev) => [newHistoryEntry, ...prev]);

    setHighlightedUserId(selectedUserId);
    setBgIndex((prev) => (prev + 1) % backgrounds.length);

    confetti({ particleCount: 150, spread: 90, origin: { y: 0.6 } });

    setTimeout(() => setHighlightedUserId(null), 4000);
  };
   
  return (
    <div className="relative">
      {/* Floating Background Blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="blob blob1"></div>
        <div className="blob blob2"></div>
        <div className="blob blob3"></div>
      </div>

      <div className={`min-h-screen p-6 transition-all duration-700 ${backgrounds[bgIndex]}`}>
        <div className="bg-white/80 backdrop-blur-lg p-6 rounded-xl shadow-xl max-w-5xl mx-auto space-y-10">
          {/* Selector & Button */}
         
          {/* Leaderboard Title */}
          <h2 className="text-4xl  text-center" style={{fontFamily:"Bungee"}}>🏆 Leaderboard</h2>

          {/* Top 3 Podium */}
         <div className="flex justify-center items-end gap-6 mt-6">
  {[1, 0, 2].map((podiumIndex, displayIndex) => {
    const user = leaderboard[podiumIndex];
    if (!user) return null;

    const heights = ["h-56", "h-64", "h-48"];
    const borderColors = [
      "border-4 border-gray-400",   // 🥈 Silver
      "border-4 border-yellow-500", // 👑 Gold
      "border-4 border-orange-500"  // 🥉 Bronze
    ];
    const medals = [SilverMedal, GoldMedal, BronzeMedal];

    return (
      <motion.div
        key={user.id}
        layout
        className={`relative flex flex-col items-center justify-end bg-white shadow-xl rounded-xl px-4 ${heights[displayIndex]} w-40 sm:w-48 transition-all ${borderColors[displayIndex]}`}
      >
        {/* Avatar */}
        <div className="absolute -top-10 w-20 h-20 rounded-full border-4 border-white bg-yellow-100 flex items-center justify-center shadow-md">
          <img
            src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${user.id}`}
            alt={user.name}
            className="w-16 h-16 rounded-full"
          />
        </div>

        {/* Medal Image */}
        <img
          src={medals[displayIndex]}
          alt="Medal"
          className="w-20 h-20 absolute bottom-18 left-1/2 -translate-x-1/2"
        />

        {/* User Info */}
        <div className="mt-14 text-center">
          <p className="font-bold text-base sm:text-lg">{user.name}</p>
          <p className="text-blue-700 font-semibold text-sm sm:text-base">
            {user.totalPoints} pts
          </p>
        </div>
      </motion.div>
    );
  })}
</div>

          {/* Remaining Leaderboard */}
          <div className="flex flex-col gap-3 mt-10">
            <AnimatePresence>
              {leaderboard.slice(3).map((user, index) => (
                <motion.div
                  key={user.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex justify-between items-center bg-white p-4 rounded-xl shadow-md ${
                    highlightedUserId === user.id ? "glow-row scale-105" : ""
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="font-bold text-lg w-6 text-right">{index + 4}</span>
                    <img
                      src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${user.id}`}
                      alt={user.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <span className="font-medium">{user.name}</span>
                  </div>
                  <span className="font-semibold text-blue-700">{user.totalPoints} pts</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
 <AddUserForm onUserAdded={handleUserAdded} />
      <LeaderboardWithClaimPoints refresh={triggerRefresh} />
    
          {/* History Log */}
          <div>
            <h2 className="text-3xl font-extrabold mb-4">🕓 Claim History</h2>
            <div className="bg-white rounded-lg shadow overflow-auto max-h-64">
              <table className="w-full table-auto">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-3">User</th>
                    <th className="p-3">Points</th>
                    <th className="p-3">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((entry, index) => (
                    <tr key={index} className="border-t hover:bg-gray-50 transition-all">
                      <td className="p-3">{entry.userName}</td>
                      <td className="p-3">{entry.points}</td>
                      <td className="p-3 text-sm text-gray-600">
                        {new Date(entry.timestamp).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
