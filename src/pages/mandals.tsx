import React, { useEffect, useState } from "react";
import { EntityCard } from "../components/entity-card";
import { Loader } from "../components/ui/loader";
import { getAllEntities } from "../utils/data-utils";

export function MandalsPage() {
  const [mandals, setMandals] = useState<{ 
    key: number; 
    name: string; 
    districtName: string;
    stateName: string;
    stateKey: number;
    districtKey: number;
  }[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadAllMandals = async () => {
      setLoading(true);
      try {
        const entities = getAllEntities();
        
        // Create a map to store unique mandals with their district and state names and keys
        const mandalsMap = new Map<number, { 
          name: string; 
          districtName: string;
          stateName: string;
          stateKey: number;
          districtKey: number;
        }>();
        
        entities.forEach(entity => {
          mandalsMap.set(entity.MandalKey, {
            name: entity.MandalName,
            districtName: entity.DistrictName,
            stateName: entity.StateName,
            stateKey: entity.StateKey,
            districtKey: entity.DistrictKey
          });
        });
        
        // Convert map to array
        const uniqueMandals = Array.from(mandalsMap.entries()).map(([key, value]) => ({
          key,
          name: value.name,
          districtName: value.districtName,
          stateName: value.stateName,
          stateKey: value.stateKey,
          districtKey: value.districtKey
        }));
        
        setMandals(uniqueMandals);
      } finally {
        setLoading(false);
      }
    };
    
    loadAllMandals();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Mandals</h1>
      <p className="mb-6">All mandals in India.</p>
      
      {loading ? (
        <Loader className="py-12" />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mandals.map((mandal) => (
            <EntityCard
              key={mandal.key}
              name={mandal.name}
              entityKey={mandal.key}
              additionalKeys={{ 
                stateKey: mandal.stateKey,
                districtKey: mandal.districtKey,
                mandalKey: mandal.key
              }}
              description={
                <>
                  This is <strong>{mandal.name}</strong>, a mandal in <strong>{mandal.districtName}</strong> district, <strong>{mandal.stateName}</strong>, India.
                </>
              }
              onClick={() => window.location.href = `/villages?mandal=${mandal.key}`}
            />
          ))}
        </div>
      )}
    </div>
  );
} 