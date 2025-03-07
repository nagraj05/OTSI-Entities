import { ReactNode } from "react";

interface EntityItemProps {
  name: string;
  description: ReactNode;
  onClick?: () => void;
  entityKey?: number;
  additionalKeys?: {
    stateKey?: number;
    districtKey?: number;
    mandalKey?: number;
    villageKey?: number;
  };
}

export function EntityItem({ 
  name, 
  description, 
}: EntityItemProps) {
  return (
    <div 
      className="border-b py-3 px-4 hover:bg-gray-50 transition-colors cursor-pointer"
    >
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">{name}</h3>
      </div>
      <p className="text-sm text-gray-600 mt-1">{description}</p>
    </div>
  );
} 