import { useState } from "react";

interface Task {
  id: number;
  title: string;
  description: string;
  status: "pending" | "in progress" | "completed";
}

const initialTasks: Task[] = [
  { id: 1, title: "Task 1", description: "Description 1", status: "pending" },
  {
    id: 2,
    title: "Task 2",
    description: "Description 2",
    status: "in progress",
  },
  { id: 3, title: "Task 3", description: "Description 3", status: "completed" },
];

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [isTaskFormVisible, setTaskFormVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [filter, setFilter] = useState<
    "all" | "pending" | "in progress" | "completed"
  >("all");

  const handleCreateTask = (task: Omit<Task, "id">) => {
    const newTask = { ...task, id: tasks.length + 1 };
    setTasks([...tasks, newTask]);
    setTaskFormVisible(false);
  };

  const handleUpdateTask = (updatedTask: Task) => {
    setTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
    setSelectedTask(null);
    setTaskFormVisible(false);
  };

  const handleDeleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const openEditTaskForm = (task: Task) => {
    setSelectedTask(task);
    setTaskFormVisible(true);
  };

  const filteredTasks =
    filter === "all" ? tasks : tasks.filter((task) => task.status === filter);

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        Gerenciar Tarefas
      </h2>
      <div className="mb-4">
        <label className="mr-2">Filtrar por status:</label>
        <select
          value={filter}
          onChange={(e) =>
            setFilter(
              e.target.value as "all" | "pending" | "in progress" | "completed"
            )
          }
          className="p-2 border"
        >
          <option value="all">Todas</option>
          <option value="pending">Pendentes</option>
          <option value="in progress">Em Progresso</option>
          <option value="completed">Concluídas</option>
        </select>
      </div>
      <button
        onClick={() => setTaskFormVisible(true)}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Criar Tarefa
      </button>
      <div className="mt-4">
        {filteredTasks.map((task) => (
          <div key={task.id} className="p-4 bg-white shadow rounded mb-4">
            <h3 className="text-xl font-semibold">{task.title}</h3>
            <p>{task.description}</p>
            <p>Status: {task.status}</p>
            <div className="mt-2">
              <button
                onClick={() => openEditTaskForm(task)}
                className="mr-2 bg-yellow-500 text-white p-2 rounded"
              >
                Editar
              </button>
              <button
                onClick={() => handleDeleteTask(task.id)}
                className="bg-red-500 text-white p-2 rounded"
              >
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>

      {isTaskFormVisible && (
        <TaskForm
          onClose={() => setTaskFormVisible(false)}
          onSubmit={selectedTask ? handleUpdateTask : handleCreateTask}
          initialData={selectedTask}
        />
      )}
    </div>
  );
};

interface TaskFormProps {
  onClose: () => void;
  onSubmit: (task: Omit<Task, "id">) => void;
  initialData?: Task | null;
}

const TaskForm = ({ onClose, onSubmit, initialData }: TaskFormProps) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [status, setStatus] = useState(initialData?.status || "pending");

  const handleSubmit = () => {
    onSubmit({ title, description, status });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white p-6 rounded w-96">
        <h2 className="text-xl font-semibold">
          {initialData ? "Editar Tarefa" : "Criar Tarefa"}
        </h2>
        <div className="mt-4">
          <label className="block text-sm font-medium">Título</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 p-2 border w-full"
          />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium">Descrição</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 p-2 border w-full"
          />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="mt-1 p-2 border w-full"
          >
            <option value="pending">Pendente</option>
            <option value="in progress">Em Progresso</option>
            <option value="completed">Concluída</option>
          </select>
        </div>
        <div className="mt-6 flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="p-2 bg-gray-500 text-white rounded"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="p-2 bg-blue-500 text-white rounded"
          >
            {initialData ? "Atualizar" : "Criar"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskList;
