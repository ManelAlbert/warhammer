

"use client";
import { useState } from "react";


const FACTIONS = [
  "Marines Espaciales",
  "Orkos",
  "Eldar",
  "Tiranidos",
  "Necrones",
  "Astra Militarum",
  "Caballeros Grises",
  "Tau",
  "Hermanas de Batalla",
  "Caballeros Imperiales",
  "Drukhari",
  "Mil Hijos",
  "Death Guard",
  "Custodes",
  "Genestealer Cults",
  "Adeptus Mechanicus",
  "Harlequins",
  "Imperio Tau",
  "Demonios del Caos",
  "Caballeros del Caos",
  // Añade más facciones aquí
];

type Unit = {
  name: string;
  points: number;
};

// Ejemplo extendido de unidades (puedes seguir añadiendo más)
const UNITS: Record<string, Unit[]> = {
  "Caballeros Imperiales": [
    { name: "Knight Paladin", points: 420 },
    { name: "Knight Errant", points: 400 },
    { name: "Knight Warden", points: 430 },
  ],
  Drukhari: [
    { name: "Guerreros Kabalita", points: 60 },
    { name: "Incubos", points: 90 },
    { name: "Succubus", points: 80 },
  ],
  "Mil Hijos": [
    { name: "Rubric Marines", points: 105 },
    { name: "Exalted Sorcerer", points: 120 },
    { name: "Scarab Occult Terminators", points: 200 },
  ],
  "Death Guard": [
    { name: "Plague Marines", points: 100 },
    { name: "Lord of Contagion", points: 130 },
    { name: "Poxwalkers", points: 50 },
  ],
  Custodes: [
    { name: "Custodian Guard", points: 150 },
    { name: "Shield Captain", points: 170 },
    { name: "Allarus Custodians", points: 210 },
  ],
  "Genestealer Cults": [
    { name: "Neophyte Hybrids", points: 60 },
    { name: "Acolyte Hybrids", points: 70 },
    { name: "Patriarch", points: 120 },
  ],
  "Adeptus Mechanicus": [
    { name: "Skitarii Rangers", points: 80 },
    { name: "Tech-Priest Dominus", points: 110 },
    { name: "Ironstrider Ballistarius", points: 120 },
  ],
  Harlequins: [
    { name: "Troupe", points: 90 },
    { name: "Shadowseer", points: 120 },
    { name: "Skyweavers", points: 140 },
  ],
  "Imperio Tau": [
    { name: "Guerreros de fuego", points: 80 },
    { name: "Crisis Battlesuit", points: 120 },
    { name: "Comandante", points: 140 },
  ],
  "Demonios del Caos": [
    { name: "Bloodletters", points: 90 },
    { name: "Daemon Prince", points: 180 },
    { name: "Plaguebearers", points: 80 },
  ],
  "Caballeros del Caos": [
    { name: "War Dog", points: 250 },
    { name: "Despoiler", points: 420 },
    { name: "Rampager", points: 430 },
  ],
  "Marines Espaciales": [
    { name: "Tácticos", points: 90 },
    { name: "Exploradores", points: 70 },
    { name: "Dreadnought", points: 150 },
    { name: "Capitán", points: 120 },
    { name: "Devastadores", points: 110 },
  ],
  Orkos: [
    { name: "Chicoz", points: 60 },
    { name: "Noblez", points: 100 },
    { name: "Garrapatos", points: 40 },
    { name: "Kaudillo", points: 130 },
    { name: "Meganoblez", points: 160 },
  ],
  Eldar: [
    { name: "Guardianes", points: 80 },
    { name: "Videntes", points: 120 },
    { name: "Banshees", points: 95 },
  ],
  Tiranidos: [
    { name: "Hormagantes", points: 50 },
    { name: "Guerreros Tiranidos", points: 100 },
    { name: "Carnifex", points: 180 },
  ],
  Necrones: [
    { name: "Guerreros Necrones", points: 70 },
    { name: "Inmortales", points: 90 },
    { name: "Líder Necrón", points: 140 },
  ],
  "Astra Militarum": [
    { name: "Infantería", points: 50 },
    { name: "Tanque Leman Russ", points: 170 },
    { name: "Comisario", points: 60 },
  ],
  "Caballeros Grises": [
    { name: "Justicar", points: 110 },
    { name: "Paladines", points: 150 },
    { name: "Dreadknight", points: 200 },
  ],
  Tau: [
    { name: "Guerreros de fuego", points: 80 },
    { name: "Crisis Battlesuit", points: 120 },
    { name: "Comandante", points: 140 },
  ],
  "Hermanas de Batalla": [
    { name: "Sororitas", points: 70 },
    { name: "Cañones Castigo", points: 100 },
    { name: "Canonesa", points: 110 },
  ],
};


type Rule = {
  name: string;
  description: string;
  appliesTo: string[]; // facciones o unidades
};

const RULES: Rule[] = [
  {
    name: "Sin duplicados de HQ",
    description: "Solo puedes tener un HQ por ejército.",
    appliesTo: [
      "Capitán", "Kaudillo", "Videntes", "Líder Necrón", "Comisario", "Justicar", "Comandante", "Canonesa",
      "Exalted Sorcerer", "Lord of Contagion", "Shield Captain", "Patriarch", "Tech-Priest Dominus", "Shadowseer", "Daemon Prince"
    ],
  },
  {
    name: "Máximo de puntos personalizable",
    description: "El ejército no puede superar el máximo de puntos elegido.",
    appliesTo: FACTIONS,
  },
  {
    name: "Mínimo 3 unidades",
    description: "El ejército debe tener al menos 3 unidades.",
    appliesTo: FACTIONS,
  },
  {
    name: "Solo una unidad de tipo 'Patriarch' por ejército (Genestealer Cults)",
    description: "Solo puedes tener un Patriarch en tu ejército Genestealer Cults.",
    appliesTo: ["Patriarch"],
  },
  // Añade más reglas aquí
];

type Expansion = {
  name: string;
  description: string;
};

const EXPANSIONS: Expansion[] = [
  { name: "Arks of Omen", description: "Nuevas reglas de organización de destacamentos." },
  { name: "Leviathan", description: "Incluye nuevas unidades y misiones." },
  // Añade más expansiones aquí
];

export default function Home() {
  const [faction, setFaction] = useState(FACTIONS[0]);
  const [army, setArmy] = useState<Unit[]>([]);
  const [selectedExpansions, setSelectedExpansions] = useState<string[]>([]);
  const [maxPoints, setMaxPoints] = useState<number>(2000);

  const availableUnits = UNITS[faction] || [];
  const totalPoints = army.reduce((sum, unit) => sum + unit.points, 0);

  // Restricciones
  const HQ_UNITS = [
    "Capitán", "Kaudillo", "Videntes", "Líder Necrón", "Comisario", "Justicar", "Comandante", "Canonesa",
    "Exalted Sorcerer", "Lord of Contagion", "Shield Captain", "Patriarch", "Tech-Priest Dominus", "Shadowseer", "Daemon Prince"
  ];
  const hqCount = army.filter(u => HQ_UNITS.includes(u.name)).length;
  const patriarchCount = army.filter(u => u.name === "Patriarch").length;
  const overPoints = totalPoints > maxPoints;
  const underMinUnits = army.length > 0 && army.length < 3;

  function addUnit(unit: Unit) {
    // Regla: Solo un HQ
    if (HQ_UNITS.includes(unit.name) && hqCount >= 1) {
      alert("Solo puedes tener un HQ por ejército.");
      return;
    }
    // Regla: Solo un Patriarch en Genestealer Cults
    if (faction === "Genestealer Cults" && unit.name === "Patriarch" && patriarchCount >= 1) {
      alert("Solo puedes tener un Patriarch en tu ejército Genestealer Cults.");
      return;
    }
    setArmy([...army, unit]);
  }

  function removeUnit(index: number) {
    setArmy(army.filter((_, i) => i !== index));
  }

  function toggleExpansion(name: string) {
    setSelectedExpansions(expansions =>
      expansions.includes(name)
        ? expansions.filter(e => e !== name)
        : [...expansions, name]
    );
  }

  function handleMaxPointsChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) setMaxPoints(value);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Warhammer 40,000 - Calculadora de Ejércitos</h1>

      {/* Configuración de puntos máximos */}
      <div className="mb-4 w-full max-w-md flex items-center gap-4">
        <label className="font-semibold">Puntos máximos:</label>
        <input
          type="number"
          min={500}
          max={10000}
          step={50}
          value={maxPoints}
          onChange={handleMaxPointsChange}
          className="p-2 rounded border border-gray-300 dark:bg-gray-800 dark:text-white w-32"
        />
      </div>

      {/* Expansiones */}
      <div className="mb-4 w-full max-w-md">
        <h2 className="text-lg font-semibold mb-2">Expansiones activas</h2>
        <div className="flex flex-wrap gap-2">
          {EXPANSIONS.map(exp => (
            <label key={exp.name} className="flex items-center gap-2 bg-white dark:bg-gray-800 px-2 py-1 rounded shadow cursor-pointer">
              <input
                type="checkbox"
                checked={selectedExpansions.includes(exp.name)}
                onChange={() => toggleExpansion(exp.name)}
              />
              <span>{exp.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Facción */}
      <div className="mb-4">
        <label className="mr-2 font-semibold">Facción:</label>
        <select
          value={faction}
          onChange={e => {
            setFaction(e.target.value);
            setArmy([]);
          }}
          className="p-2 rounded border border-gray-300 dark:bg-gray-800 dark:text-white"
        >
          {FACTIONS.map(f => (
            <option key={f} value={f}>{f}</option>
          ))}
        </select>
      </div>

      {/* Unidades disponibles */}
      <div className="mb-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-2">Unidades disponibles</h2>
        <ul className="space-y-2">
          {availableUnits.map((unit, idx) => (
            <li key={unit.name} className="flex justify-between items-center bg-white dark:bg-gray-800 rounded p-2 shadow">
              <span>{unit.name} ({unit.points} pts)</span>
              <button
                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                onClick={() => addUnit(unit)}
              >
                Añadir
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Tu ejército */}
      <div className="w-full max-w-md">
        <h2 className="text-xl font-semibold mb-2">Tu ejército</h2>
        <ul className="space-y-2 mb-2">
          {army.length === 0 && <li className="text-gray-500">No has añadido unidades.</li>}
          {army.map((unit, idx) => (
            <li key={idx} className="flex justify-between items-center bg-white dark:bg-gray-800 rounded p-2 shadow">
              <span>{unit.name} ({unit.points} pts)</span>
              <button
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                onClick={() => removeUnit(idx)}
              >
                Quitar
              </button>
            </li>
          ))}
        </ul>
        <div className={"font-bold text-lg " + (overPoints ? "text-red-600" : "")}>Total de puntos: {totalPoints}</div>
        {overPoints && <div className="text-red-600 font-semibold">¡Has superado el máximo de 2000 puntos!</div>}
      </div>

      {/* Reglas activas */}
      <div className="w-full max-w-md mt-6">
        <h2 className="text-lg font-semibold mb-2">Reglas activas</h2>
        <ul className="list-disc list-inside text-sm">
          {RULES.filter(rule =>
            rule.appliesTo.includes(faction) ||
            army.some(u => rule.appliesTo.includes(u.name))
          ).map(rule => (
            <li key={rule.name} className="mb-1">
              <span className="font-bold">{rule.name}:</span> {rule.description}
            </li>
          ))}
        </ul>
      </div>

      <footer className="mt-10 text-gray-400 text-xs text-center">Escalable para nuevas facciones, unidades, reglas y expansiones. Última actualización: 18 mayo 2025.</footer>
    </div>
  );
}
