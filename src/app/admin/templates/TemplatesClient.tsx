'use client';

import { useState } from 'react';
import { toggleStyleActiveAction } from '../actions';

interface Style {
  id: string;
  name: string;
  component: string;
  isActive: boolean;
  _count: { invitations: number };
}

export default function TemplatesClient({ styles: initialStyles }: { styles: Style[] }) {
  const [styles, setStyles] = useState(initialStyles);

  const handleToggle = async (styleId: string) => {
    await toggleStyleActiveAction(styleId);
    setStyles(styles.map(s => s.id === styleId ? { ...s, isActive: !s.isActive } : s));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {styles.map(style => (
        <div
          key={style.id}
          className={`bg-gray-900 rounded-lg p-4 border ${style.isActive ? 'border-gray-700' : 'border-red-700 opacity-60'}`}
        >
          <div className="h-32 bg-gray-800 rounded-md mb-4 flex items-center justify-center">
            <span className="text-gray-500 text-sm">{style.component}</span>
          </div>
          <h3 className="font-bold">{style.name}</h3>
          <p className="text-sm text-gray-400 mb-2">Used {style._count.invitations}x</p>
          <div className="flex justify-between items-center">
            <span className={`text-xs px-2 py-1 rounded ${style.isActive ? 'bg-green-900 text-green-400' : 'bg-red-900 text-red-400'}`}>
              {style.isActive ? 'Active' : 'Disabled'}
            </span>
            <button
              onClick={() => handleToggle(style.id)}
              className="text-sm px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded"
            >
              {style.isActive ? 'Disable' : 'Enable'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
