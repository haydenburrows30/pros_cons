'use client';

import { useState } from 'react';

interface CreateListButtonProps {
  onCreateList: (title: string) => void;
  className?: string;
}

export function CreateListButton({ onCreateList, className }: CreateListButtonProps) {
  const [isCreating, setIsCreating] = useState(false);
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onCreateList(title.trim());
      setTitle('');
      setIsCreating(false);
    }
  };

  const handleCancel = () => {
    setTitle('');
    setIsCreating(false);
  };

  if (isCreating) {
    return (
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter list title..."
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-400 transition-all duration-200 bg-white"
          autoFocus
        />
        <div className="flex space-x-2">
          <button
            type="submit"
            disabled={!title.trim()}
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg text-sm font-medium hover:from-blue-600 hover:to-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 disabled:transform-none"
          >
            ✓ Create
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300 transition-all duration-200"
          >
            ✗ Cancel
          </button>
        </div>
      </form>
    );
  }

  return (
    <button
      onClick={() => setIsCreating(true)}
      className={className || "text-blue-500 hover:text-blue-700 text-2xl font-bold transition-all duration-200 hover:scale-110 bg-blue-50 hover:bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center"}
      title="Create new list"
    >
      +
    </button>
  );
}