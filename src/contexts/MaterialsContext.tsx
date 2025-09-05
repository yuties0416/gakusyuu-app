import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Material, User } from '../types';
import { mockMaterials } from '../mockData';
import { useAuth } from './AuthContext';

interface MaterialsContextType {
  materials: Material[];
  addMaterial: (material: Material) => void;
}

const MaterialsContext = createContext<MaterialsContextType | undefined>(undefined);

const STORAGE_KEY = 'materials';

export function MaterialsProvider({ children }: { children: React.ReactNode }) {
  const [materials, setMaterials] = useState<Material[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setMaterials(parsed.map((m: any) => ({ ...m, createdAt: new Date(m.createdAt) })));
        return;
      } catch {}
    }
    setMaterials(mockMaterials);
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(materials));
  }, [materials]);

  const addMaterial = (material: Material) => {
    setMaterials(prev => [material, ...prev]);
  };

  const value = useMemo(() => ({ materials, addMaterial }), [materials]);

  return <MaterialsContext.Provider value={value}>{children}</MaterialsContext.Provider>;
}

export function useMaterials() {
  const ctx = useContext(MaterialsContext);
  if (!ctx) throw new Error('useMaterials must be used within MaterialsProvider');
  return ctx;
}
