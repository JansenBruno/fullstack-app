import { AppDispatch, RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createSquad,
  deleteSquad,
  fetchSquads,
  updateSquad,
} from "../redux/store/squadSlice";
import AddMemberForm from "./AddMemberForm";
import SquadForm from "./CreateSquadForm";
import SquadList from "./SquadList";
import TaskList from "./TaskList";

const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);
  const squads = useSelector((state: RootState) => state.squads.squads);
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const [isSquadFormVisible, setSquadFormVisible] = useState(false);
  const [selectedSquad, setSelectedSquad] = useState<any>(null);
  const [isAddMemberFormVisible, setAddMemberFormVisible] = useState(false);
  const [selectedSquadId, setSelectedSquadId] = useState<number | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [filter, setFilter] = useState(""); // Estado para o filtro

  useEffect(() => {
    if (user && user.role === "manager") {
      dispatch(fetchSquads());
    }
  }, [dispatch, user]);

  const handleCreateSquad = async (name: string) => {
    if (user && user.id !== undefined) {
      await dispatch(createSquad({ name, managerId: user.id }));
      setSquadFormVisible(false);
    } else {
      console.error("Usuário não autenticado ou ID do usuário não disponível.");
    }
  };

  const handleUpdateSquad = async (name: string) => {
    if (selectedSquad) {
      await dispatch(updateSquad({ id: selectedSquad.id, name }));
      setSelectedSquad(null);
      setSquadFormVisible(false);
    }
  };

  const handleDeleteSquad = async (id: number) => {
    await dispatch(deleteSquad(id));
  };

  const openAddMemberForm = (squadId: number) => {
    setSelectedSquadId(squadId);
    setAddMemberFormVisible(true);
  };

  const openEditSquadForm = (squad: any) => {
    setSelectedSquad(squad);
    setSquadFormVisible(true);
  };

  const handleCloseAddMemberForm = () => {
    setAddMemberFormVisible(false);
    setSelectedSquadId(null);
  };

  const filteredTasks = tasks.filter((task) =>
    task.description.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="min-h-screen w-full p-8 bg-gradient-to-br flex flex-col items-center">
      <h1 className="text-4xl font-bold text-white mb-6">Dashboard</h1>

      {user?.role === "manager" ? (
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            Gerenciar SQUADS
          </h2>
          <div className="flex flex-col space-y-4 mb-4">
            <SquadList
              squads={squads}
              onEdit={openEditSquadForm}
              onDelete={handleDeleteSquad}
              openAddMemberForm={openAddMemberForm}
            />
          </div>

          <SquadForm
            onClose={() => {
              setSquadFormVisible(false);
              setSelectedSquad(null);
            }}
            onSubmit={selectedSquad ? handleUpdateSquad : handleCreateSquad}
            initialData={
              selectedSquad ? { name: selectedSquad.name } : undefined
            }
          />

          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
              <div className="bg-white rounded p-6 w-96">
                <h2 className="text-xl font-bold">SQUADS TESTANDO123</h2>
                <button
                  onClick={() => setModalOpen(false)}
                  className="mt-2 bg-red-500 text-white rounded p-2"
                >
                  Fechar
                </button>
              </div>
            </div>
          )}

          {isAddMemberFormVisible && selectedSquadId !== null && (
            <AddMemberForm
              squadId={selectedSquadId}
              onClose={handleCloseAddMemberForm}
              onMemberAdded={() => {
                handleCloseAddMemberForm();
                dispatch(fetchSquads());
              }}
            />
          )}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Filtrar tarefas..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border border-gray-300 rounded p-2 w-full"
            />
          </div>

          <TaskList tasks={filteredTasks} /> 
        </div>
      ) : (
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            Tarefas Disponíveis
          </h2>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Filtrar tarefas..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border border-gray-300 rounded p-2 w-full"
            />
          </div>
          <TaskList tasks={filteredTasks} /> 
        </div>
      )}
    </div>
  );
};

export default Dashboard;
