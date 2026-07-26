import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pencil, Trash2, Check, X, CircleCheckBig } from "lucide-react";

import {
  deleteTodo,
  updateTodo,
  toggleCompleted,
} from "../features/todos/todosSlice";

const TodoList = () => {
  const dispatch = useDispatch();

  const todos = useSelector((state) => state.todo.values);

  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  // Start editing
  const handleEdit = (todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
  };

  // Update todo
  const handleUpdate = (id) => {
    if (!editText.trim()) return;

    dispatch(
      updateTodo({
        id: id,
        text: editText.trim(),
      }),
    );

    setEditingId(null);
    setEditText("");
  };

  // Cancel editing
  const handleCancel = () => {
    setEditingId(null);
    setEditText("");
  };

  // Toggle completed
  const handleCompleted = (id) => {
    dispatch(toggleCompleted(id));
  };

  return (
    <div className="mx-auto mt-8 w-full max-w-2xl space-y-3">
      {/* Empty State */}
      {todos.length === 0 && (
        <div className="rounded-2xl border border-white/10 bg-white/3 p-10 text-center backdrop-blur-xl">
          <CircleCheckBig size={35} className="mx-auto mb-3 text-zinc-700" />

          <p className="font-medium text-zinc-400">No tasks yet</p>

          <p className="mt-1 text-sm text-zinc-600">
            Add your first todo above ✨
          </p>
        </div>
      )}

      {/* Todos */}
      {todos.map((todo) => (
        <div
          key={todo.id}
          className={`group flex items-center gap-4 rounded-2xl border p-4 backdrop-blur-xl transition-all duration-300 ${
            todo.completed
              ? "border-emerald-500/10 bg-emerald-500/3"
              : "border-white/10 bg-white/4 hover:border-violet-500/30 hover:bg-white/6"
          }`}
        >
          {/* Complete Button */}
          <button
            onClick={() => handleCompleted(todo.id)}
            title={todo.completed ? "Mark as incomplete" : "Mark as completed"}
            className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
              todo.completed
                ? "border-emerald-500 bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)]"
                : "border-zinc-600 bg-transparent hover:border-violet-500 hover:bg-violet-500/10"
            }`}
          >
            {todo.completed && <Check size={14} strokeWidth={3} />}
          </button>

          {/* Todo Content */}
          <div className="min-w-0 flex-1">
            {editingId === todo.id ? (
              // Edit Input
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleUpdate(todo.id);
                  }

                  if (e.key === "Escape") {
                    handleCancel();
                  }
                }}
                autoFocus
                className="w-full rounded-xl border border-violet-500/30 bg-white/5 px-4 py-2 text-sm text-white outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/10"
              />
            ) : (
              // Todo Text
              <p
                className={`truncate text-sm font-medium transition-all duration-300 ${
                  todo.completed
                    ? "text-zinc-600 line-through"
                    : "text-zinc-200"
                }`}
              >
                {todo.text}
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex shrink-0 items-center gap-2">
            {editingId === todo.id ? (
              <>
                {/* Save */}
                <button
                  onClick={() => handleUpdate(todo.id)}
                  title="Save"
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 transition-all duration-200 hover:scale-105 hover:bg-emerald-500/20 active:scale-95"
                >
                  <Check size={16} />
                </button>

                {/* Cancel */}
                <button
                  onClick={handleCancel}
                  title="Cancel"
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-zinc-400 transition-all duration-200 hover:scale-105 hover:bg-white/10 hover:text-white active:scale-95"
                >
                  <X size={16} />
                </button>
              </>
            ) : (
              <>
                {/* Edit */}
                <button
                  onClick={() => handleEdit(todo)}
                  title="Edit todo"
                  disabled={todo.completed}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-zinc-400 transition-all duration-200 hover:scale-105 hover:border-violet-500/30 hover:bg-violet-500/10 hover:text-violet-400 active:scale-95 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:scale-100"
                >
                  <Pencil size={15} />
                </button>

                {/* Delete */}
                <button
                  onClick={() => dispatch(deleteTodo(todo.id))}
                  title="Delete todo"
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-zinc-400 transition-all duration-200 hover:scale-105 hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-400 active:scale-95"
                >
                  <Trash2 size={15} />
                </button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
