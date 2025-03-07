import { useEffect, useState } from "react";
import { EntityItem } from "../components/entity-item";
import { Loader } from "../components/ui/loader";
import { getAllEntities } from "../utils/data-utils";

export function VillagesPage() {
  const [villages, setVillages] = useState<{ 
    key: number; 
    name: string; 
    mandalName: string;
    districtName: string;
    stateName: string;
    stateKey: number;
    districtKey: number;
    mandalKey: number;
  }[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadAllVillages = async () => {
      setLoading(true);
      try {
        const entities = getAllEntities();
        
        // Create a map to store unique villages with their mandal, district and state names and keys
        const villagesMap = new Map<number, { 
          name: string; 
          mandalName: string;
          districtName: string;
          stateName: string;
          stateKey: number;
          districtKey: number;
          mandalKey: number;
        }>();
        
        entities.forEach(entity => {
          villagesMap.set(entity.VillageKey, {
            name: entity.VillageName,
            mandalName: entity.MandalName,
            districtName: entity.DistrictName,
            stateName: entity.StateName,
            stateKey: entity.StateKey,
            districtKey: entity.DistrictKey,
            mandalKey: entity.MandalKey
          });
        });
        
        // Convert map to array
        const uniqueVillages = Array.from(villagesMap.entries()).map(([key, value]) => ({
          key,
          name: value.name,
          mandalName: value.mandalName,
          districtName: value.districtName,
          stateName: value.stateName,
          stateKey: value.stateKey,
          districtKey: value.districtKey,
          mandalKey: value.mandalKey
        }));
        
        setVillages(uniqueVillages);
      } finally {
        setLoading(false);
      }
    };
    
    loadAllVillages();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Villages</h1>
      <p className="mb-6">All villages in India.</p>
      
      {loading ? (
        <Loader className="py-12" />
      ) : (
        <div className="border rounded-md divide-y">
          {villages.map((village) => (
            <EntityItem
              key={village.key}
              name={village.name}
              entityKey={village.key}
              description={
                <>
                  <strong className="text-black">{village.name}</strong>, a village in <strong className="text-black">{village.mandalName}</strong> mandal, <strong className="text-black">{village.districtName}</strong> district, <strong className="text-black">{village.stateName}</strong>, India. 
                  The village code is <span className="font-semibold text-black">{village.key}</span>.
                </>
              }
            />
          ))}
        </div>
      )}
    </div>
  );
} 