"use client";

import { ProjetoLoading } from "../Loading";
import { ProjetoProps } from "@/types";
import CardProjeto from "./CardProjeto";
import { useFetchProject } from "@/hooks/useFetchProjects";
import React from "react";
import { Button } from "../ui/button";
import { FilterOptions } from ".";

export function Projetos() {
  const [numberPage, setNumberPage] = React.useState(8);
  const [Filtro, setFiltro] = React.useState("");
  
  const { Projects, Loading } = useFetchProject(true);

  const projetosFiltrados = Projects.filter((projeto) => projeto.types.find((type: string) => type === Filtro));

  const handleFiltro = (name: string) => {
    setFiltro(name);
  };

  const filtroActive = (name: string) => {
    return `${
      Filtro === name ? "bg-gray-400 dark:bg-white text-white dark:text-black" : "bg-gray-100 text-black dark:bg-black dark:border dark:border-gray-300 dark:text-white font-bold"
    }`;
  };

  const Buttons = () => {
    return (
      <>
        {Projects.length >= numberPage ? (
          <Button onClick={() => setNumberPage(numberPage + 8)} className="bg-gray-400 dark:bg-white text-white dark:text-black mt-10 text-xl">
            Mais projetos
          </Button>
        ) : (
          <Button onClick={() => setNumberPage(numberPage - 8)} className="bg-gray-400 dark:bg-white text-white dark:text-black mt-10 text-xl">
            Menos projetos
          </Button>
        )}
      </>
    );
  };

  return (
    <section className="container m-auto p-auto flex flex-col items-center justify-center pt-10" id="projects">
      <div className="w-full flex items-center pl-5 gap-[15px] md:gap-[5px]">
        <h1 className="text-3xl uppercase font-bold ">Projetos</h1>
        <div className="w-[180px] md:w-[522px] h-[2px] bg-black dark:bg-white" />
      </div>

      {Loading ? (
        <div className="grid grid-rows-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 mt-5">
          {Array.from({ length: 8 }, (_, index) => (
            <ProjetoLoading key={index} />
          ))}
        </div>
      ) : (
        <>
          <div className="flex gap-5 p-5">
            <Button className={` ${filtroActive("")}`} onClick={() => handleFiltro("")}>
              Todos
            </Button>
            {FilterOptions.map((option, index) => (
              <div key={index}>
                <Button className={`${filtroActive(option.Value)}`} onClick={() => handleFiltro(option.Value)}>
                  {option.Value}
                </Button>
              </div>
            ))}
          </div>
          {Projects.length === 0 ? (
            <h1 className="text-4xl font-bold py-10">Nenhum projeto encontrado</h1>
          ) : (
            <div className="grid grid-rows-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 mt-5 px-5 md:px-0">
              {Filtro === "" ? (
                <>
                  {Projects.slice(0, numberPage).map((item: ProjetoProps, index) => (
                    <CardProjeto key={index} projeto={item} />
                  ))}
                </>
              ) : (
                <>
                  {projetosFiltrados.slice(0, numberPage).map((item: ProjetoProps, index) => (
                    <CardProjeto key={index} projeto={item} />
                  ))}
                </>
              )}
            </div>
          )}

          {Filtro === "" && Projects.length > 8 ? <Buttons /> : Filtro !== "" && projetosFiltrados.length > 8 ? <Buttons /> : null}
        </>
      )}
    </section>
  );
}
