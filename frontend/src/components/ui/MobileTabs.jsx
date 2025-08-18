import React from 'react';
import { cn } from '../../utils/cn';

const MobileTabs = ({ tabs, activeTab, onTabChange, className }) => {
  return (
    <div className={cn("w-full", className)}>
      {/* Mobile Tabs Navigation */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "flex-1 min-w-0 px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 touch-target whitespace-nowrap",
              activeTab === tab.id
                ? "bg-white text-primary shadow-sm"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            )}
          >
            {tab.icon && <tab.icon className="h-4 w-4 mx-auto mb-1" />}
            <span className="block text-center">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-4">
        {tabs.find(tab => tab.id === activeTab)?.content}
      </div>
    </div>
  );
};

export default MobileTabs;
