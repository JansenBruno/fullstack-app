import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { fetchAllSquads } from '../redux/store/squadSlice'; 
import SquadModal from './SquadModal';
import MemberList from './MembrosList';

interface SquadListProps {
  squads: any[]; 
  onEdit: (squad: any) => void;
  onDelete: (id: number) => Promise<void>;
  openAddMemberForm: (squadId: number) => void;
}

const SquadList: React.FC<SquadListProps> = ({ squads, onEdit, onDelete, openAddMemberForm }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isModalOpen, setModalOpen] = useState(false); 
  useEffect(() => {
    if (isModalOpen) {
      dispatch(fetchAllSquads()); 
    }
  }, [isModalOpen, dispatch]);

  return (
    <div className="p-4">
      <button
        onClick={() => setModalOpen(true)} 
        className="bg-green-500 text-white rounded p-2 mb-4 hover:bg-green-600 transition"
      >
        Exibir Squads
      </button>

      <SquadModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        title="SQUADS"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {squads.length > 0 ? (
            squads.map((squad) => (
              <div key={squad.id} className="p-4 bg-white shadow-md rounded-md">
                <h3 className="text-xl font-bold text-gray-800">{squad.name}</h3>
                <h4 className="font-semibold mt-2">Membros:</h4>
                <MemberList members={squad.members} />

                <div className="mt-4 flex space-x-2">
                  <button
                    onClick={() => onEdit(squad)} 
                    className="bg-blue-500 text-white rounded p-2 hover:bg-blue-600 transition"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => onDelete(squad.id)} 
                    className="bg-red-500 text-white rounded p-2 hover:bg-red-600 transition"
                  >
                    Deletar
                  </button>
                  <button
                    onClick={() => openAddMemberForm(squad.id)} 
                    className="bg-green-500 text-white rounded p-2 hover:bg-green-600 transition"
                  >
                    Adicionar Membro
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">Nenhum squad encontrado.</p>
          )}
        </div>
      </SquadModal>
    </div>
  );
};

export default SquadList;
