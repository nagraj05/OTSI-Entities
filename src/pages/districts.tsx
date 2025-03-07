import { useEffect, useState } from "react";
import { EntityItem } from "../components/entity-item";
import { Loader } from "../components/ui/loader";
import { getAllEntities } from "../utils/data-utils";

export function DistrictsPage() {
  const [districts, setDistricts] = useState<{ key: number; name: string; stateName: string; stateKey: number }[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadAllDistricts = async () => {
      setLoading(true);
      try {
        const entities = getAllEntities();
        
        // Create a map to store unique districts with their state names and keys
        const districtsMap = new Map<number, { name: string; stateName: string; stateKey: number }>();
        
        entities.forEach(entity => {
          districtsMap.set(entity.DistrictKey, {
            name: entity.DistrictName,
            stateName: entity.StateName,
            stateKey: entity.StateKey
          });
        });
        
        // Convert map to array
        const uniqueDistricts = Array.from(districtsMap.entries()).map(([key, value]) => ({
          key,
          name: value.name,
          stateName: value.stateName,
          stateKey: value.stateKey
        }));
        
        setDistricts(uniqueDistricts);
      } finally {
        setLoading(false);
      }
    };
    
    loadAllDistricts();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Districts</h1>
      <p className="mb-6">All districts in India.</p>
      
      {loading ? (
        <Loader className="py-12" />
      ) : (
        <div className="border rounded-md divide-y">
          {districts.map((district) => (
            <EntityItem
              key={district.key}
              name={district.name}
              entityKey={district.key}
              description={
                <>
                  <strong className="text-black">{district.name}</strong>, a district in <strong className="text-black">{district.stateName}</strong>, India. 
                  The code is <span className="font-semibold text-black">{district.key}</span>.
                </>
              }
            />
          ))}
        </div>
      )}
    </div>
  );
} 