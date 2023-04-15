import React from "react";
import { ProjetosData } from "../../service/data";
import { Link } from "react-router-dom";

export function Projects() {
  return (
    <div
      className="w-full h-screen flex flex-col gap-20 items-center justify-center"
      id="projetos"
    >
      {/* Header com botão que direciona para pagina com todos os projetos */}
      <div className="w-full px-5 flex items-center justify-between 2xl:justify-around">
        <h1 className="text-center text-2xl font-bold uppercase">
          <span className="text-blue-500">/ </span> Projetos
        </h1>

        <Link to="/projetos">view all</Link>
      </div>

      {/* Mapeamento dos 3 primeiro Projetos */}
      <div className="flex flex-col md:flex-row items-center gap-10 justify-center">
        {ProjetosData.slice(0, 3).map((item) => (
          <Link
            className="flex flex-col gap-5 p-5 hover:bg-[rgba(0,0,0,0.25)]"
            key={item.id}
            to={`projeto/${item.slug}`}
          >
            <img
              className="w-[250px] md:w-[300px] md:h-[130px] lg:w-[322px] lg:h-[211px] rounded-md shadow-[9px_13px_8px_rgba(0,0,0,0.25)] border-2 border-blue-500"
              src={item.img}
              alt={item.title}
            />
            <h1 className="text-base md:text-sm lg:text-base text-center">
              {item.title}
            </h1>
          </Link>
        ))}
      </div>
    </div>
  );
}