import React from "react";

interface Member {
  id: number;
  user: {
    username: string;
  };
}

interface MemberListProps {
  members?: Member[]; 
}

const MemberList: React.FC<MemberListProps> = ({ members = [] }) => {   if (members.length === 0) {
    return <p className="text-gray-500">Nenhum membro adicionado.</p>;
  }

  return (
    <ul className="list-disc list-inside pl-4">
      {members.map((member) => (
        <li key={member.id} className="text-gray-700">
          {member.user.username}
        </li>
      ))}
    </ul>
  );
};

export default MemberList;
