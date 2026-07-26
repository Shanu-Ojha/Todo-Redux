import { Plus, ListTodo, Sparkles } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../features/todos/todosSlice";
import TodoList from "./TodoList";

const TodoForm = () => {
  const [todo, setTodo] = useState('');
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!todo.trim()) return;
    console.log(todo);
    dispatch(addTodo(todo))
    setTodo("");
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#07070a] px-4">

      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-100 w-150 -translate-x-1/2 rounded-full bg-violet-600/20 blur-[140px]" />

      <div className="pointer-events-none absolute -bottom-40 -right-40 h-100 w-150 rounded-full bg-blue-600/10 blur-[120px]" />

      {/* Main */}
      <div className="relative w-full max-w-2xl">

        {/* Badge */}
        <div className="mb-5 flex justify-center">
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-zinc-400 backdrop-blur-xl">
            <Sparkles size={14} className="text-violet-400" />
            Get things done
          </div>
        </div>

        {/* Heading */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            What needs to be{" "}
            <span className="bg-linear-to-r from-violet-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
              done?
            </span>
          </h1>

          <p className="mt-3 text-sm text-zinc-500 sm:text-base">
            Add a task and turn your plans into progress.
          </p>
        </div>

        {/* Form Card */}
        <form
          onSubmit={handleSubmit}
          className="group relative rounded-3xl border border-white/10 bg-white/4 p-2 shadow-2xl shadow-black/40 backdrop-blur-2xl"
        >
          {/* subtle linear border glow */}
          <div className="pointer-events-none absolute -inset-px -z-10 rounded-3xl bg-linear-to-r from-violet-500/30 via-transparent to-blue-500/30 opacity-0 blur-sm transition duration-500 group-focus-within:opacity-100" />

          <div className="flex flex-col gap-2 sm:flex-row">

            {/* Input */}
            <div className="flex flex-1 items-center gap-3 px-4">
              <ListTodo
                size={21}
                className="shrink-0 text-zinc-600 transition-colors group-focus-within:text-violet-400"
              />

              <input
                type="text"
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
                placeholder="Add a new task..."
                className="h-14 w-full bg-transparent text-[15px] text-white outline-none placeholder:text-zinc-600"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              className="flex h-14 items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-violet-600 to-indigo-600 px-7 text-sm font-semibold text-white shadow-lg shadow-violet-900/30 transition-all duration-300 hover:-translate-y-0.5 hover:from-violet-500 hover:to-indigo-500 hover:shadow-violet-800/40 active:translate-y-0"
            >
              <Plus size={18} strokeWidth={2.5} />
              Add Task
            </button>
          </div>
        </form>
      <TodoList/>
      </div>
    </div>
  );
};

export default TodoForm;