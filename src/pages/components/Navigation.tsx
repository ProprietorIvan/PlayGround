import React from 'react';
import { User } from 'lucide-react';

const Navigation = ({ currentPage, showActions = true }: any) => {
  return (
    <div className="p-3 border-b border-zinc-100 flex justify-between items-center">
      <div className="text-lg font-light tracking-tight cursor-pointer">
        FELICITA GROUP
      </div>
      <div className="flex items-center space-x-4">
        <button className="text-sm text-zinc-500 hover:text-black transition-colors">
          ABOUT
        </button>
        <button className="w-6 h-6 rounded-full flex items-center justify-center border border-zinc-200 hover:border-zinc-400 transition-colors">
          <User className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};

export default Navigation;