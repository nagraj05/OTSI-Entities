import React, { ReactNode } from "react";

interface EntityCardProps {
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

export function EntityCard({ 
  name, 
  description, 
  onClick, 
  entityKey,
  additionalKeys = {} 
}: EntityCardProps) {
  const { stateKey, districtKey, mandalKey, villageKey } = additionalKeys;
  
  const displayKey = entityKey !== undefined ? `#${entityKey}` : '';
  
  // Build additional keys display
  const keyParts = [];
  if (stateKey !== undefined) keyParts.push(`S:${stateKey}`);
  if (districtKey !== undefined) keyParts.push(`D:${districtKey}`);
  if (mandalKey !== undefined) keyParts.push(`M:${mandalKey}`);
  if (villageKey !== undefined) keyParts.push(`V:${villageKey}`);
  
  const keysDisplay = keyParts.join(' | ');
  
  return (
    <div 
      className="bg-card text-card-foreground rounded-lg border shadow-sm p-4 hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-medium">{name}</h3>
        <span className="text-xs text-muted-foreground">
          {displayKey} 
        </span>
      </div>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
