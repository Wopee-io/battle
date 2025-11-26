import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api, Item } from "../api/client";

export default function ProtectedExample() {
  const navigate = useNavigate();
  const [items, setItems] = useState<Item[]>([]);
  const [newItem, setNewItem] = useState({ title: "", description: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!api.getToken()) {
      navigate("/login");
      return;
    }
    loadItems();
  }, [navigate]);

  const loadItems = async () => {
    try {
      const data = await api.getItems();
      setItems(data);
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load items");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.title.trim()) return;

    try {
      await api.createItem(newItem.title, newItem.description || undefined);
      setNewItem({ title: "", description: "" });
      loadItems();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create item");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await api.deleteItem(id);
      loadItems();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete item");
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Your Items</h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form
        onSubmit={handleCreate}
        className="mb-8 p-4 bg-white rounded-lg shadow"
      >
        <h3 className="text-lg font-semibold mb-4">Add New Item</h3>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={newItem.title}
            onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2 border"
            required
          />
          <input
            type="text"
            placeholder="Description (optional)"
            value={newItem.description}
            onChange={(e) =>
              setNewItem({ ...newItem, description: e.target.value })
            }
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2 border"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Add Item
          </button>
        </div>
      </form>

      <div className="space-y-4">
        {items.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            No items yet. Create one above!
          </p>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="p-4 bg-white rounded-lg shadow flex justify-between items-center"
            >
              <div>
                <h4 className="font-semibold">{item.title}</h4>
                {item.description && (
                  <p className="text-gray-600 text-sm">{item.description}</p>
                )}
              </div>
              <button
                onClick={() => handleDelete(item.id)}
                className="text-red-600 hover:text-red-800"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
