
export interface Entity {
  StateKey: number;
  StateName: string;
  DistrictKey: number;
  DistrictName: string;
  MandalKey: number;
  MandalName: string;
  VillageKey: number;
  VillageName: string;
  Hierarchy: string;
}

export const getAllEntities = (): Entity[] => {
  const dataModules = import.meta.glob('../data/*.json', { eager: true });
  
  let allEntities: Entity[] = [];
  
  // Combine all data from all JSON files
  Object.values(dataModules).forEach((module: any) => {
    const data = module.default;
    if (Array.isArray(data)) {
      allEntities = [...allEntities, ...data];
    }
  });
  
  return allEntities;
};

export const getUniqueStates = (): { key: number; name: string }[] => {
  const entities = getAllEntities();
  const uniqueStates = new Map<number, string>();
  
  entities.forEach(entity => {
    uniqueStates.set(entity.StateKey, entity.StateName);
  });
  
  return Array.from(uniqueStates.entries()).map(([key, name]) => ({ key, name }));
};

export const getDistrictsByState = (stateKey: number): { key: number; name: string }[] => {
  const entities = getAllEntities();
  const districts = new Map<number, string>();
  
  entities
    .filter(entity => entity.StateKey === stateKey)
    .forEach(entity => {
      districts.set(entity.DistrictKey, entity.DistrictName);
    });
  
  return Array.from(districts.entries()).map(([key, name]) => ({ key, name }));
};

export const getMandalsByDistrict = (stateKey: number, districtKey: number): { key: number; name: string }[] => {
  const entities = getAllEntities();
  const mandals = new Map<number, string>();
  
  entities
    .filter(entity => entity.StateKey === stateKey && entity.DistrictKey === districtKey)
    .forEach(entity => {
      mandals.set(entity.MandalKey, entity.MandalName);
    });
  
  return Array.from(mandals.entries()).map(([key, name]) => ({ key, name }));
};

export const getVillagesByMandal = (stateKey: number, districtKey: number, mandalKey: number): { key: number; name: string }[] => {
  const entities = getAllEntities();
  const villages = new Map<number, string>();
  
  entities
    .filter(entity => 
      entity.StateKey === stateKey && 
      entity.DistrictKey === districtKey && 
      entity.MandalKey === mandalKey
    )
    .forEach(entity => {
      villages.set(entity.VillageKey, entity.VillageName);
    });
  
  return Array.from(villages.entries()).map(([key, name]) => ({ key, name }));
};

export const getEntityDetails = (entityType: 'state' | 'district' | 'mandal' | 'village', key: number): Entity | undefined => {
  const entities = getAllEntities();
  
  if (entityType === 'state') {
    return entities.find(entity => entity.StateKey === key);
  } else if (entityType === 'district') {
    return entities.find(entity => entity.DistrictKey === key);
  } else if (entityType === 'mandal') {
    return entities.find(entity => entity.MandalKey === key);
  } else if (entityType === 'village') {
    return entities.find(entity => entity.VillageKey === key);
  }
  
  return undefined;
}; 