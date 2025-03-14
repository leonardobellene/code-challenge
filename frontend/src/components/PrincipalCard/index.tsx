import React from "react";
import { Principal, Name } from "../../types";
import { parseCharacters } from "../../utils";

interface PrincipalCardProps {
  principal: Principal;
  names: Name[];
}

const PrincipalCard: React.FC<PrincipalCardProps> = ({ principal, names }) => {
  const getActorName = (nconst: string) => {
    const actor = names.find((name) => name.nconst === nconst);
    return actor ? actor.name : "Unknown Actor";
  };

  const characterNames = parseCharacters(principal.characters);

  return (
    <div className="p-4 border rounded-lg shadow-md">
      <strong className="text-indigo-800">{getActorName(principal.nconst)}</strong>
      <p>{principal.category}</p>

      {characterNames.length > 0 ? (
        <p>🎭 as {characterNames.join(", ")}</p>
      ) : (
        <p>🎭 as Unknown Character</p>
      )}
    </div>
  );
};

export default PrincipalCard;
