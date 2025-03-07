import { useState } from "react";

const ColorModal = ({ regionName, onSubmit, onClose }) => {
  const [color, setColor] = useState("#000000");

  const handleSubmit = () => {
    onSubmit(regionName, color);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-5 rounded-lg shadow-lg">
        <h2 className="text-lg font-bold">Select Color for {regionName}</h2>
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="mt-3"
        />
        <div className="flex justify-end space-x-2 mt-4">
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Submit
          </button>
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ColorModal;
