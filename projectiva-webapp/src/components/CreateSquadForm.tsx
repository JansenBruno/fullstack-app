import React, { useState, useEffect } from 'react';

interface SquadFormProps {
  onClose: () => void;
  onSubmit: (name: string) => Promise<void>;
  initialData?: { name: string }; 
}

const SquadForm: React.FC<SquadFormProps> = ({ onClose, onSubmit, initialData }) => {
  const [name, setName] = useState<string>('');

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
    } else {
      setName(''); 
    }
  }, [initialData]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await onSubmit(name);
    onClose(); 
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nome do Squad"
        required
        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="w-full bg-blue-600 text-white rounded-md py-2 hover:bg-blue-700 transition duration-200"
      >
        {initialData ? "Atualizar Squad" : "Criar Squad"}
      </button>
    </form>
  );
};

export default SquadForm;
