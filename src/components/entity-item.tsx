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

export function EntityItem({ name, description }: EntityItemProps) {
  return (
    <div className="py-4 px-5 hover:bg-gray-50 transition-colors border-b border-gray-200">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">{name}</h3>
      </div>
      <p className="text-sm text-gray-600 mt-2">{description}</p>
    </div>
  );
}
