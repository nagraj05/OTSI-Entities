import { useEffect, useState } from "react";
import { EntityItem } from "../components/entity-item";
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
        <div className="border rounded-md divide-y bg-white shadow-sm">
          {states.map((state) => (
            <EntityItem
              key={state.key}
              name={state.name}
              entityKey={state.key}
              description={
                <>
                  <strong className="text-black">{state.name}</strong>, a state
                  in India. The statecode is{" "}
                  <span className="font-semibold text-black">{state.key}</span>.
                </>
              }
            />
          ))}
        </div>
      )}
    </div>
  );
}
