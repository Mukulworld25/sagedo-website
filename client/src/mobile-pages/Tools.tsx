import React from 'react';
import { Card } from '../mobile-components/UIComponents';
import { AppRoute } from '../mobile-types';

interface ToolsProps {
  onNavigate: (route: AppRoute) => void;
}

export const Tools: React.FC<ToolsProps> = ({ onNavigate }) => {
  const tools = [
    { id: 'image-edit', name: 'Magic Image Editor', desc: 'Edit with text prompts', icon: '🎨', route: AppRoute.TOOL_IMAGE_EDITOR },
  ];

  return (
    <div className="p-4 pb-24 space-y-4 animate-fade-in">
      <div className="grid grid-cols-2 gap-4">
        {tools.map((tool) => (
          <Card 
            key={tool.id} 
            onClick={() => tool.route && onNavigate(tool.route)}
            className="hover:border-brand-primary/50 transition-colors group"
          >
            <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-200">{tool.icon}</div>
            <h3 className="font-bold text-gray-900 dark:text-white text-sm">{tool.name}</h3>
            <p className="text-xs text-gray-500 mt-1">{tool.desc}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};
