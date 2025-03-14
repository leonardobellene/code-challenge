import React from "react";
import { Principal, Name } from "../../types";
import PrincipalCard from "../PrincipalCard";

interface PrincipalsListProps {
  principals: Principal[];
  names: Name[];
}

const PrincipalsList: React.FC<PrincipalsListProps> = ({ principals, names }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mt-4 mb-2">Principals</h3>
      <div className="flex flex-col gap-4 sm:grid grid-cols-2">
        {principals.map((principal) => (
          <PrincipalCard key={principal.id} principal={principal} names={names} />
        ))}
      </div>
    </div>
  );
};

export default PrincipalsList;
