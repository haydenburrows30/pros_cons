'use client';

import { useState, useEffect, useRef } from 'react';
import type { ProsConsList, ProsConsItem } from '@/types';

interface ProsConsListComponentProps {
  list: ProsConsList;
  onUpdateList: (items: ProsConsItem[]) => void;
}

export function ProsConsListComponent({ list, onUpdateList }: ProsConsListComponentProps) {
  const [editingTextItem, setEditingTextItem] = useState<string | null>(null);
  const [editingWeightItem, setEditingWeightItem] = useState<string | null>(null);
  const [showWeightDropdown, setShowWeightDropdown] = useState<string | null>(null);
  const [editText, setEditText] = useState('');
  const [editWeight, setEditWeight] = useState(3);
  const weightSelectRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showWeightDropdown) {
        const target = event.target as Element;
        if (!target.closest('.weight-dropdown')) {
          setShowWeightDropdown(null);
          setEditingWeightItem(null);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showWeightDropdown]);

  const addItem = (type: 'pro' | 'con') => {
    const newItem: ProsConsItem = {
      id: Date.now().toString(),
      text: type === 'pro' ? `Pros Argument ${list.items.filter(i => i.type === 'pro').length + 1}` : `Cons Argument ${list.items.filter(i => i.type === 'con').length + 1}`,
      weight: 3,
      type,
    };
    onUpdateList([...list.items, newItem]);
  };

  const updateItemText = (itemId: string, text: string) => {
    onUpdateList(
      list.items.map(item =>
        item.id === itemId ? { ...item, text } : item
      )
    );
    setEditingTextItem(null);
  };

  const updateItemWeight = (itemId: string, weight: number) => {
    onUpdateList(
      list.items.map(item =>
        item.id === itemId ? { ...item, weight } : item
      )
    );
    setEditingWeightItem(null);
  };

  const deleteItem = (itemId: string) => {
    onUpdateList(list.items.filter(item => item.id !== itemId));
  };

  const startEditText = (item: ProsConsItem) => {
    setEditingTextItem(item.id);
    setEditText(item.text);
  };

  const startEditWeight = (item: ProsConsItem) => {
    setEditingWeightItem(item.id);
    setShowWeightDropdown(item.id);
    setEditWeight(item.weight);
  };

  const selectWeight = (itemId: string, weight: number) => {
    setEditWeight(weight);
    updateItemWeight(itemId, weight);
    setShowWeightDropdown(null);
  };

  const pros = list.items.filter(item => item.type === 'pro');
  const cons = list.items.filter(item => item.type === 'con');

  const prosScore = pros.reduce((sum, item) => sum + item.weight, 0);
  const consScore = cons.reduce((sum, item) => sum + item.weight, 0);
  const totalScore = prosScore + consScore;
  const prosPercentage = totalScore > 0 ? Math.round((prosScore / totalScore) * 100) : 0;
  const consPercentage = totalScore > 0 ? Math.round((consScore / totalScore) * 100) : 0;

  return (
    <div className="bg-white max-w-5xl mx-auto">
      <div className="text-center py-6">
        <h1 className="text-xl font-normal text-gray-900">{list.title || 'New pros and cons list'}</h1>
      </div>

      <div className="grid grid-cols-2 gap-0">
        <div>
          <div className="bg-white p-3 text-center">
            <h2 className="text-base font-semibold text-gray-800">Pros</h2>
          </div>
          
          <div className="grid grid-cols-[1fr_auto_auto] gap-4 px-4 py-2 bg-gray-50 text-xs text-gray-500">
            <div>Argument</div>
            <div className="text-center min-w-[80px]">Weight</div>
            <div className="w-8"></div>
          </div>

          {pros.map((item) => (
            <div key={item.id} className="grid grid-cols-[1fr_auto_auto] gap-4 px-4 py-3 items-center hover:bg-gray-50">
              <div className="flex-1">
                {editingTextItem === item.id ? (
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="w-full px-2 py-1 bg-gray-50 rounded text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-200"
                    onBlur={() => updateItemText(item.id, editText)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') updateItemText(item.id, editText);
                      if (e.key === 'Escape') setEditingTextItem(null);
                    }}
                    autoFocus
                  />
                ) : (
                  <span className="text-sm text-gray-800 cursor-pointer hover:text-blue-600" onClick={() => startEditText(item)}>
                    {item.text}
                  </span>
                )}
              </div>
              <div className="text-center">
                {editingWeightItem === item.id ? (
                  <div className="relative inline-block weight-dropdown">
                    <div 
                      className="text-gray-800 px-4 py-1.5 text-sm font-medium text-center min-w-[60px] cursor-pointer relative rounded"
                      style={{ backgroundColor: '#93c5fd' }}
                      onClick={() => setShowWeightDropdown(showWeightDropdown === item.id ? null : item.id)}
                    >
                      {editWeight}
                      <svg className="absolute right-1.5 top-1/2 transform -translate-y-1/2 w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                    {showWeightDropdown === item.id && (
                      <div className="absolute top-full left-0 bg-white rounded shadow-lg z-50 mt-1 min-w-[60px] overflow-hidden">
                        {[1, 2, 3, 4, 5].map(w => (
                          <div key={w} className="px-4 py-2 text-sm text-gray-800 hover:bg-blue-50 cursor-pointer text-center" style={{ backgroundColor: w === editWeight ? '#dbeafe' : '#ffffff' }} onClick={() => selectWeight(item.id, w)}>
                            {w}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div 
                    className="text-gray-800 px-4 py-1.5 text-sm font-medium text-center min-w-[60px] inline-block cursor-pointer hover:opacity-80 relative rounded"
                    style={{ backgroundColor: '#93c5fd' }}
                    onClick={() => startEditWeight(item)}
                  >
                    {item.weight}
                    <svg className="absolute right-1.5 top-1/2 transform -translate-y-1/2 w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
              <div className="flex justify-center items-center w-8">
                <button onClick={() => deleteItem(item.id)} className="text-gray-400 hover:text-red-500 transition-colors p-1" title="Delete">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))}

          <div className="px-4 py-2">
            <button onClick={() => addItem('pro')} className="w-7 h-7 bg-gray-50 hover:bg-gray-100 rounded flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors text-lg font-light">
              +
            </button>
          </div>
        </div>

        <div>
          <div className="bg-white p-3 text-center">
            <h2 className="text-base font-semibold text-gray-800">Cons</h2>
          </div>
          
          <div className="grid grid-cols-[1fr_auto_auto] gap-4 px-4 py-2 bg-gray-50 text-xs text-gray-500">
            <div>Argument</div>
            <div className="text-center min-w-[80px]">Weight</div>
            <div className="w-8"></div>
          </div>

          {cons.map((item) => (
            <div key={item.id} className="grid grid-cols-[1fr_auto_auto] gap-4 px-4 py-3 items-center hover:bg-gray-50">
              <div className="flex-1">
                {editingTextItem === item.id ? (
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="w-full px-2 py-1 bg-gray-50 rounded text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-yellow-200"
                    onBlur={() => updateItemText(item.id, editText)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') updateItemText(item.id, editText);
                      if (e.key === 'Escape') setEditingTextItem(null);
                    }}
                    autoFocus
                  />
                ) : (
                  <span className="text-sm text-gray-800 cursor-pointer hover:text-blue-600" onClick={() => startEditText(item)}>
                    {item.text}
                  </span>
                )}
              </div>
              <div className="text-center">
                {editingWeightItem === item.id ? (
                  <div className="relative inline-block weight-dropdown">
                    <div 
                      className="text-gray-800 px-4 py-1.5 text-sm font-medium text-center min-w-[60px] cursor-pointer relative rounded"
                      style={{ backgroundColor: '#fde047' }}
                      onClick={() => setShowWeightDropdown(showWeightDropdown === item.id ? null : item.id)}
                    >
                      {editWeight}
                      <svg className="absolute right-1.5 top-1/2 transform -translate-y-1/2 w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                    {showWeightDropdown === item.id && (
                      <div className="absolute top-full left-0 bg-white rounded shadow-lg z-50 mt-1 min-w-[60px] overflow-hidden">
                        {[1, 2, 3, 4, 5].map(w => (
                          <div key={w} className="px-4 py-2 text-sm text-gray-800 hover:bg-yellow-50 cursor-pointer text-center" style={{ backgroundColor: w === editWeight ? '#fef9c3' : '#ffffff' }} onClick={() => selectWeight(item.id, w)}>
                            {w}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div 
                    className="text-gray-800 px-4 py-1.5 text-sm font-medium text-center min-w-[60px] inline-block cursor-pointer hover:opacity-80 relative rounded"
                    style={{ backgroundColor: '#fde047' }}
                    onClick={() => startEditWeight(item)}
                  >
                    {item.weight}
                    <svg className="absolute right-1.5 top-1/2 transform -translate-y-1/2 w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
              <div className="flex justify-center items-center w-8">
                <button onClick={() => deleteItem(item.id)} className="text-gray-400 hover:text-red-500 transition-colors p-1" title="Delete">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))}

          <div className="px-4 py-2">
            <button onClick={() => addItem('con')} className="w-7 h-7 bg-gray-50 hover:bg-gray-100 rounded flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors text-lg font-light">
              +
            </button>
          </div>
        </div>
      </div>

      <div className="px-6 py-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">Result</h2>
        
        <div className="space-y-2">
          <div className="grid grid-cols-3 gap-6 text-xs text-gray-500 pb-2">
            <div>Name</div>
            <div>Percentage</div>
            <div>Points</div>
          </div>

          <div className="grid grid-cols-3 gap-6 items-center py-2.5">
            <div className="text-sm text-gray-700">Pros</div>
            <div className="relative">
              <div className="w-full h-8 bg-gray-200 overflow-hidden">
                <div className="h-full flex items-center justify-center text-sm font-medium text-white" style={{ width: `${prosPercentage}%`, backgroundColor: '#60a5fa' }}>
                  {prosPercentage > 15 ? `${prosPercentage} %` : ''}
                </div>
              </div>
              {prosPercentage <= 15 && prosPercentage > 0 && (
                <div className="absolute left-full top-0 h-8 flex items-center pl-2 text-sm font-medium text-gray-700 whitespace-nowrap">
                  {prosPercentage} %
                </div>
              )}
            </div>
            <div className="text-sm text-gray-700">{prosScore}</div>
          </div>

          <div className="grid grid-cols-3 gap-6 items-center py-2.5">
            <div className="text-sm text-gray-700">Cons</div>
            <div className="relative">
              <div className="w-full h-8 bg-gray-200 overflow-hidden">
                <div className="h-full flex items-center justify-center text-sm font-medium text-gray-800" style={{ width: `${consPercentage}%`, backgroundColor: '#fde047' }}>
                  {consPercentage > 15 ? `${consPercentage} %` : ''}
                </div>
              </div>
              {consPercentage <= 15 && consPercentage > 0 && (
                <div className="absolute left-full top-0 h-8 flex items-center pl-2 text-sm font-medium text-gray-700 whitespace-nowrap">
                  {consPercentage} %
                </div>
              )}
            </div>
            <div className="text-sm text-gray-700">{consScore}</div>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button className="px-5 py-2 bg-gray-100 text-gray-700 text-sm rounded hover:bg-gray-200 transition-colors">Share</button>
          <button className="px-5 py-2 bg-gray-100 text-gray-700 text-sm rounded hover:bg-gray-200 transition-colors">Close</button>
        </div>
      </div>
    </div>
  );
}
