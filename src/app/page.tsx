'use client';

import { useState } from 'react';
import type { ProsConsList, ProsConsItem } from '@/types';
import { ProsConsListComponent } from '@/components/ProsConsListComponent';
import { CreateListButton } from '@/components/CreateListButton';

export default function HomePage() {
  // Create initial sample list to match the image
  const sampleList: ProsConsList = {
    id: '1',
    title: 'New pros and cons list',
    items: [
      { id: '1', text: 'Pros Argument 1', weight: 3, type: 'pro' },
      { id: '2', text: 'Cons Argument 1', weight: 3, type: 'con' },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const [lists, setLists] = useState<ProsConsList[]>([sampleList]);
  const [activeList, setActiveList] = useState<string | null>('1');

  const createNewList = (title: string) => {
    const newList: ProsConsList = {
      id: Date.now().toString(),
      title,
      items: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setLists([...lists, newList]);
    setActiveList(newList.id);
  };

  const updateList = (listId: string, items: ProsConsItem[]) => {
    setLists(lists.map(list => 
      list.id === listId 
        ? { ...list, items, updatedAt: new Date() }
        : list
    ));
  };

  const deleteList = (listId: string) => {
    setLists(lists.filter(list => list.id !== listId));
    if (activeList === listId) {
      setActiveList(null);
    }
  };

  const currentList = lists.find(list => list.id === activeList);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-sm">
          {currentList ? (
            <ProsConsListComponent
              list={currentList}
              onUpdateList={(items: ProsConsItem[]) => updateList(currentList.id, items)}
            />
          ) : (
            <div className="p-12 text-center">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">Create a new list</h3>
              <CreateListButton 
                onCreateList={createNewList}
                className="px-6 py-2 bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-50"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}