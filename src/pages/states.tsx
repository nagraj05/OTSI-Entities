import React, { useEffect, useState } from "react";
import { EntityCard } from "../components/entity-card";
import { getUniqueStates } from "../utils/data-utils";
import { Loader } from "../components/ui/loader";

export function StatesPage() {
  const [states, setStates] = useState<{ key: number; name: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadStates = async () => {
      setLoading(true);
      try {
        setStates(getUniqueStates());
      } finally {
        setLoading(false);
      }
    };

    loadStates();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">States</h1>
      <p className="mb-6">All states in India.</p>

      {loading ? (
        <Loader className="py-12" />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {states.map((state) => (
            <EntityCard
              key={state.key}
              name={state.name}
              entityKey={state.key}
              additionalKeys={{ stateKey: state.key }}
              description={
                <>
                  This is <strong>{state.name}</strong>, a state in India.
                </>
              }
              onClick={() =>
                (window.location.href = `/districts?state=${state.key}`)
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}
