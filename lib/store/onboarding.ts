"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

type TypeProspect = "maison" | "appartement" | "les-deux" | null;

interface CiblageState {
  ville: string;
  pays: string;
  rayon: number;
  codesPostaux: string;
  typeProspect: TypeProspect;
  typesChantier: string[];
}

type SelectedPlan = "starter" | "booster" | "croissance";

interface CompteState {
  nomEntreprise: string;
  prenom: string;
  nom: string;
  email: string;
  telephone: string;
  motDePasse: string;
}

interface OnboardingStore {
  ciblage: CiblageState;
  setCiblage: (partial: Partial<CiblageState>) => void;
  toggleChantier: (type: string) => void;
  selectedPlan: SelectedPlan;
  setSelectedPlan: (plan: SelectedPlan) => void;
  compte: CompteState;
  setCompte: (partial: Partial<CompteState>) => void;
}

export const useOnboardingStore = create<OnboardingStore>()(
  persist(
    (set) => ({
      ciblage: {
        ville: "",
        pays: "France",
        rayon: 30,
        codesPostaux: "",
        typeProspect: "maison",
        typesChantier: [],
      },
      setCiblage: (partial) =>
        set((state) => ({ ciblage: { ...state.ciblage, ...partial } })),
      toggleChantier: (type) =>
        set((state) => {
          const current = state.ciblage.typesChantier;
          const updated = current.includes(type)
            ? current.filter((t) => t !== type)
            : [...current, type];
          return { ciblage: { ...state.ciblage, typesChantier: updated } };
        }),
      selectedPlan: "croissance",
      setSelectedPlan: (plan) => set({ selectedPlan: plan }),
      compte: {
        nomEntreprise: "",
        prenom: "",
        nom: "",
        email: "",
        telephone: "",
        motDePasse: "",
      },
      setCompte: (partial) =>
        set((state) => ({ compte: { ...state.compte, ...partial } })),
    }),
    { name: "paragon-onboarding" }
  )
);
