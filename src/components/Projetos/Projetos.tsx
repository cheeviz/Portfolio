"use client";

import { useEffect, useState } from "react";
import { LoadingSpinner } from "../Loading";
import ProjetoCard from "./ProjetoCard";

export interface ProjetosProps {
  title: string;
  description: string;
  image: string;
  published: boolean;
  repository: string;
}

export function Projetos() {
  const [projetos, setProjetos] = useState<ProjetosProps[]>([]);
  const [Loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getProjetos = async () => {
      try {
        const response = await fetch("/api/projects", {
          method: "GET",
          headers: {
            "x-api-key": process.env.NEXT_PUBLIC_API_KEY as string,
          },
        });

        if (!response.ok) {
          throw new Error("Erro na solicitação");
        }

        const data = await response.json();
        setProjetos(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    getProjetos();
  }, []);

  const projetosPublicados = projetos.filter((projetos) => projetos.published === true);

  return (
    <section className="container m-auto p-auto flex flex-col items-center justify-center py-[156px]" id="projects">
      <div className="w-full flex items-center pl-5 gap-[15px] md:gap-[5px]">
        <h1 className="text-3xl uppercase font-bold ">Projetos</h1>
        <div className="w-[180px] md:w-[522px] h-[2px] bg-blue-300" />
      </div>

      {Loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {projetosPublicados.length === 0 ? (
            <h1 className="text-4xl font-bold py-10">Nenhum projeto encontrado</h1>
          ) : (
            <div className="grid grid-rows-1 lg:grid-cols-2 gap-5 mt-5">
              {projetosPublicados.slice(0, 4).map((item: ProjetosProps, index) => (
                <ProjetoCard key={index} projeto={item} />
              ))}
            </div>
          )}

          <a
            href="https://github.com/cheeviz?tab=repositories"
            target="_blank"
            className="text-3xl font-bold text-white bg-gray-300 p-2 px-5 rounded-lg cursor-pointer transition-colors hover:bg-blue-200 mt-10"
          >
            Todos Projetos
          </a>
        </>
      )}
    </section>
  );
}
