"use client";

import { ToastSuccess } from "@/lib/Toast";
import React from "react";
interface DeleteProps {
  isOpen: boolean;
  closeModal: () => void;
  getProjects: () => void;
  id: string;
}

export function DeleteDialog({
  isOpen,
  id,
  closeModal,
  getProjects,
}: DeleteProps) {
  const [loadingDelete, setLoadingDelete] = React.useState(false);

  const handleConfirm = async (id: string) => {
    setLoadingDelete(true);
    await fetch(`/api/projects/${id}`, {
      method: "DELETE",
      headers: {
        "x-api-key": process.env.NEXT_PUBLIC_API_KEY as string,
      },
    });

    ToastSuccess("Projeto deletado.");
    setLoadingDelete(false);
    closeModal();
    getProjects();
  };

  return (
    <div
      className={
        isOpen
          ? "absolute w-full h-screen bg-[#00000069] backdrop-blur-sm inset-0 z-10"
          : "hidden"
      }
    >
      <div className="bg-gray-400 relative border border-gray-300 w-[650px] h-[20%] p-5 m-auto top-5 rounded-2xl shadow-2xl">
        <div className="flex flex-col gap-5 p-10">
          <h1 className="font-bold text-2xl">
            Realmente deseja deletar esse projeto?
          </h1>
          <div className="absolute bottom-0 my-4 flex gap-5">
            <button
              className="bg-gray-300 text-white text-xl font-medium p-2 px-5 rounded transition-colors hover:bg-[#832424]"
              onClick={() => handleConfirm(id)} disabled={loadingDelete}
            >
              {loadingDelete ? "Deletando..." : "Continuar"}
            </button>
            <button
              className="bg-blue-300 text-white text-xl font-medium p-2 px-5 rounded transition-colors hover:bg-blue-200"
              onClick={closeModal}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}