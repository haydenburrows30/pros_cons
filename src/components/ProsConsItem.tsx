'use client';

import { useState } from 'react';
import type { ProsConsItem as ProsConsItemType } from '@/types';

interface ProsConsItemProps {
  item: ProsConsItemType;
  onUpdate: (updates: Partial<ProsConsItemType>) => void;
  onDelete: () => void;
}

export function ProsConsItem({ item, onUpdate, onDelete }: ProsConsItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(item.text);
  const [editWeight, setEditWeight] = useState(item.weight);

  const handleSave = () => {
    if (editText.trim()) {
      onUpdate({
        text: editText.trim(),
        weight: editWeight,
      });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditText(item.text);
    setEditWeight(item.weight);
    setIsEditing(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  if (isEditing) {
    return (
      <div className="p-4 border-2 border-blue-200 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 shadow-md">
        <textarea
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onKeyDown={handleKeyPress}
          className="w-full p-3 border border-gray-300 rounded-lg mb-3 resize-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
          rows={2}
          autoFocus
          placeholder="Enter your point..."
        />
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <label className="text-sm text-gray-600">Weight:</label>
            <select
              value={editWeight}
              onChange={(e) => setEditWeight(Number(e.target.value))}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
            >
              {[1, 2, 3, 4, 5].map(weight => (
                <option key={weight} value={weight}>
                  {weight}
                </option>
              ))}
            </select>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={handleSave}
              disabled={!editText.trim()}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg text-sm hover:from-blue-600 hover:to-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 font-medium"
            >
              ✓ Save
            </button>
            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-300 transition-all duration-200 font-medium"
            >
              ✗ Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`p-4 rounded-xl border-2 transition-all duration-200 group hover:shadow-lg hover:scale-[1.02] ${
      item.type === 'pro' 
        ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 hover:border-green-300 hover:shadow-green-100' 
        : 'bg-gradient-to-r from-red-50 to-pink-50 border-red-200 hover:border-red-300 hover:shadow-red-100'
    }`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-gray-800 text-sm leading-relaxed">{item.text}</p>
          <div className="flex items-center mt-2">
            <span className="text-xs text-gray-500 mr-2">Weight:</span>
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map(weight => (
                <div
                  key={weight}
                  className={`w-4 h-4 rounded-full mr-1 transition-all duration-200 ${
                    weight <= item.weight
                      ? item.type === 'pro'
                        ? 'bg-gradient-to-r from-green-400 to-emerald-500 shadow-sm'
                        : 'bg-gradient-to-r from-red-400 to-pink-500 shadow-sm'
                      : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                />
              ))}
              <span className="ml-2 text-sm font-medium text-gray-700 bg-white px-2 py-1 rounded-full">({item.weight})</span>
            </div>
          </div>
        </div>
        <div className="flex items-start space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-200">
          <button
            onClick={() => setIsEditing(true)}
            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-100 rounded-lg transition-all duration-200 hover:scale-110"
            title="Edit"
          >
            ✏️
          </button>
          <button
            onClick={onDelete}
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-100 rounded-lg transition-all duration-200 hover:scale-110"
            title="Delete"
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
}