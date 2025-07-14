import { useState } from "react";

export default function AddUserForm({ onUserAdded }) {
  const [formData, setFormData] = useState({
    name: "",
    points: "",
    avatarSeed: "",
    avatarStyle: "adventurer", // Default style
  });

  const [randomSeeds] = useState(
    Array.from({ length: 8 }, () => Math.random().toString(36).substring(7))
  );

  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarSelect = (seed) => {
    setFormData((prev) => ({ ...prev, avatarSeed: seed }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, points, avatarSeed, avatarStyle } = formData;
    if (!name || !points || !avatarSeed || !avatarStyle) return;

    try {
      setLoading(true);
      const res = await fetch("https://leaderboard-aaj8.onrender.com/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          points,
          avatarSeed,
          avatarStyle,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setSuccessMsg("User added! 🎉");
        setFormData({ name: "", points: "", avatarSeed: "", avatarStyle });
        if (onUserAdded) onUserAdded(data);
      } else {
        alert("Failed: " + data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Error adding user.");
    } finally {
      setLoading(false);
      setTimeout(() => setSuccessMsg(""), 3000);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-md mx-auto mt-10 mb-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Add New User</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded"
        />
        <input
          name="points"
          type="number"
          placeholder="Initial Points"
          value={formData.points}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded"
        />

        {/* Dropdown for Avatar Style */}
        <select
          name="avatarStyle"
          value={formData.avatarStyle}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
        >
          <option value="adventurer">Adventurer</option>
          <option value="miniavs">MiniAvs</option>
          <option value="fun-emoji">Fun Emoji</option>
          <option value="bottts">Bottts</option>
        </select>

        <div>
          <p className="mb-2 font-medium">Select an Avatar:</p>
          <div className="grid grid-cols-4 gap-3">
            {randomSeeds.map((seed) => (
              <div
                key={seed}
                onClick={() => handleAvatarSelect(seed)}
                className={`p-1 rounded-full cursor-pointer border-2 ${
                  formData.avatarSeed === seed
                    ? "border-blue-600"
                    : "border-transparent hover:border-gray-400"
                }`}
              >
                <img
                  src={`https://api.dicebear.com/7.x/${formData.avatarStyle}/svg?seed=${seed}`}
                  alt="avatar"
                  className="w-14 h-14 rounded-full"
                />
              </div>
            ))}
          </div>

          {formData.avatarSeed && (
            <div className="mt-4 flex flex-col items-center">
              <p className="text-sm text-gray-600 mb-1">Selected Avatar:</p>
              <img
                src={`https://api.dicebear.com/7.x/${formData.avatarStyle}/svg?seed=${formData.avatarSeed}`}
                alt="selected avatar"
                className="w-16 h-16 rounded-full border-4 border-blue-500 shadow"
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 rounded text-white font-semibold ${
            loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {loading ? "Adding..." : "Add User"}
        </button>
      </form>

      {successMsg && (
        <p className="text-green-600 text-center mt-4 animate-pulse font-medium">
          {successMsg}
        </p>
      )}
    </div>
  );
}
