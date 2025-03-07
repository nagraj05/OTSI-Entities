import { useEffect, useState } from "react";
import { EntityItem } from "../components/entity-item";
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
        <div className="border rounded-md divide-y">
          {mandals.map((mandal) => (
            <EntityItem
              key={mandal.key}
              name={mandal.name}
              entityKey={mandal.key}
              description={
                <>
                  <strong className="text-black">{mandal.name}</strong>, a mandal in <strong className="text-black">{mandal.districtName}</strong> district, <strong className="text-black">{mandal.stateName}</strong>, India. 
                  The code is <span className="font-semibold text-black">{mandal.key}</span>.
                </>
              }
            />
          ))}
        </div>
      )}
    </div>
  );
} 