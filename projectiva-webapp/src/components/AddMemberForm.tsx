import React, { useState } from "react";
import { useDispatch } from "react-redux";
import UserSelect from "./UserSelect";
import { addMemberToSquad } from "@/redux/store/squadSlice";
import { AppDispatch } from "@/redux/store";

interface AddMemberFormProps {
  squadId: number;
}

const AddMemberForm: React.FC<AddMemberFormProps> = ({ squadId }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [selectedRole, setSelectedRole] = useState<"employee" | "manager">(
    "employee"
  );
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleAddMember = async () => {
    if (!selectedUserId) {
      setErrorMessage("Por favor, selecione um usuário.");
      return;
    }

    const resultAction = await dispatch(
      addMemberToSquad({ squadId, userId: selectedUserId, role: selectedRole })
    );

    if (addMemberToSquad.fulfilled.match(resultAction)) {
      setSuccessMessage("Membro adicionado com sucesso!");
      setErrorMessage(null);
      setSelectedUserId(null);
      setSelectedRole("employee");
    } else {
      setErrorMessage(resultAction.payload as string);
      setSuccessMessage(null);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold">Adicionar Membro ao Squad</h2>
      <UserSelect onUserSelect={setSelectedUserId} />
      <div>
        <label htmlFor="role" className="block mb-1">
          Selecione a Role:
        </label>
        <select
          id="role"
          value={selectedRole}
          onChange={(e) =>
            setSelectedRole(e.target.value as "employee" | "manager")
          }
          className="w-full border rounded-md p-2"
        >
          <option value="employee">Employee</option>
          <option value="manager">Manager</option>
        </select>
      </div>

      <button
        onClick={handleAddMember}
        className="w-full bg-blue-600 text-white rounded-md p-2 hover:bg-blue-700"
      >
        Confirmar Inclusão
      </button>
    </div>
  );
};

export default AddMemberForm;
