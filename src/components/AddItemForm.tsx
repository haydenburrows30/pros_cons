'use client';

import { useState } from 'react';

interface AddItemFormProps {
  onAdd: (text: string, weight: number, type: 'pro' | 'con') => void;
  onCancel: () => void;
}

export function AddItemForm({ onAdd, onCancel }: AddItemFormProps) {
  const [text, setText] = useState('');
  const [weight, setWeight] = useState(3);
  const [type, setType] = useState<'pro' | 'con'>('pro');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text.trim(), weight, type);
      setText('');
      setWeight(3);
      setType('pro');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onCancel();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 border-2 border-gray-200 rounded-xl bg-gradient-to-r from-gray-50 to-blue-50 shadow-lg">
      <div className="space-y-4">
        {/* Text Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Enter your pro or con..."
            className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-400 resize-none transition-all duration-200 bg-white"
            rows={3}
            autoFocus
          />
        </div>

        {/* Type and Weight Selection */}
        <div className="flex items-center space-x-4">
          {/* Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Type
            </label>
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={() => setType('pro')}
                className={`px-4 py-3 rounded-lg text-sm font-bold transition-all duration-200 flex items-center gap-2 ${
                  type === 'pro'
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg scale-105'
                    : 'bg-white text-gray-700 hover:bg-green-50 border-2 border-gray-200 hover:border-green-300'
                }`}
              >
                <span>✓</span> Pro
              </button>
              <button
                type="button"
                onClick={() => setType('con')}
                className={`px-4 py-3 rounded-lg text-sm font-bold transition-all duration-200 flex items-center gap-2 ${
                  type === 'con'
                    ? 'bg-gradient-to-r from-red-500 to-pink-600 text-white shadow-lg scale-105'
                    : 'bg-white text-gray-700 hover:bg-red-50 border-2 border-gray-200 hover:border-red-300'
                }`}
              >
                <span>✗</span> Con
              </button>
            </div>
          </div>

          {/* Weight Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Importance (1-5)
            </label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map(w => (
                <button
                  key={w}
                  type="button"
                  onClick={() => setWeight(w)}
                  className={`w-10 h-10 rounded-full border-2 transition-all duration-200 hover:scale-110 font-bold text-sm ${
                    w <= weight
                      ? type === 'pro'
                        ? 'bg-gradient-to-r from-green-400 to-emerald-500 border-green-500 text-white shadow-lg'
                        : 'bg-gradient-to-r from-red-400 to-pink-500 border-red-500 text-white shadow-lg'
                      : 'bg-white border-gray-300 hover:border-gray-400 text-gray-600 hover:bg-gray-50'
                  }`}
                  title={`Weight ${w}`}
                >
                  {w}
                </button>
              ))}
              <div className="ml-3 px-3 py-2 bg-white rounded-full border-2 border-gray-200">
                <span className="text-sm font-bold text-gray-700">Weight: {weight}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 text-sm font-bold text-gray-700 bg-white border-2 border-gray-300 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
          >
            ✗ Cancel
          </button>
          <button
            type="submit"
            disabled={!text.trim()}
            className={`px-6 py-3 text-sm font-bold rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg disabled:transform-none disabled:shadow-none ${
              type === 'pro'
                ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white'
                : 'bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white'
            } disabled:bg-gray-300 disabled:cursor-not-allowed`}
          >
            {type === 'pro' ? '✓ Add Pro' : '✗ Add Con'}
          </button>
        </div>
      </div>
    </form>
  );
}