import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployees } from "../redux/store/userSlice";
import { AppDispatch, RootState } from "@/redux/store";

interface UserSelectProps {
  onUserSelect: (userId: number) => void;
}

const UserSelect: React.FC<UserSelectProps> = ({ onUserSelect }) => {
  const dispatch = useDispatch<AppDispatch>();
  const employees = useSelector((state: RootState) => state.users.items);
  console.log("teste ", employees);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  return (
    <div>
      <label htmlFor="user" className="block text-sm font-medium">
        Selecionar Funcionário
      </label>
      <select
        id="user"
        onChange={(e) => onUserSelect(Number(e.target.value))}
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
      >
        <option value="" disabled>
          Selecione um funcionário
        </option>
        {employees.map((user) => (
          <option key={user.id} value={user.id}>
            {user.email}
          </option>
        ))}
      </select>
    </div>
  );
};

export default UserSelect;
