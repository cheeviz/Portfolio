/* eslint-disable @next/next/no-img-element */
"use client";

import { FormEvent, useRef, useState } from "react";
import { toast } from "react-toastify";
import imageCompression from "browser-image-compression";
import "react-toastify/dist/ReactToastify.css";

export function FormCreateProject({ closeModal, getProjects }: any) {
  const [image, setImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [buttonText, setButtonText] = useState("Enviar");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [published, setPublished] = useState(false);
  const [repository, setRepository] = useState("");

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = async (e: any) => {
    const file = e.target.files?.[0];

    if (file) {
      setFileName(file.name);
      try {
        const compressedFile = await imageCompression(file, { maxSizeMB: 0.01 });
        const reader = new FileReader();

        reader.onloadend = () => {
          let base64img = reader.result as string;

          setImage(base64img);
        };
        reader.readAsDataURL(compressedFile);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const createProject = async (e: FormEvent) => {
    e.preventDefault();

    setButtonText("Enviando...");

    const dados = {
      title,
      description,
      image,
      repository,
      published,
    };

    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "x-api-key": process.env.NEXT_PUBLIC_API_KEY as string,
        },
        body: JSON.stringify(dados),
      });

      if (response.ok) {
        toast.success("Projeto criado com sucesso!");

        setTitle("");
        setImage(null);
        setFileName(null);
        setDescription("");
        setPublished(false);
        setRepository("");

        getProjects();
        closeModal();
      } else {
        const errorText = await response.text();
        console.log("Erro na solicitação", response.status);
        toast.error(errorText || "Erro desconhecido");
      }

      setButtonText("Enviar");
    } catch (error) {
      console.error("Erro durante a solicitação", error);
    }
  };

  return (
    <form className="w-full overflow-y-auto" onSubmit={createProject}>
      <div className="w-[750px] p-10 bg-[#2c2f36] rounded-2xl">
        <div className="flex flex-col gap-1">
          <label className="text-base font-bold uppercase">Nome do projeto</label>
          <input
            type="text"
            className="w-full bg-white text-black font-medium rounded p-2 transition-colors focus:outline-none placeholder:text-gray-300 shadow-xl"
            placeholder="Portfolio Pessoal"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1 mt-5">
          <label className="text-base font-bold uppercase">Descrição do projeto</label>
          <textarea
            className="h-[250px] resize-none bg-white text-black font-medium rounded p-2 transition-colors focus:outline-none placeholder:text-gray-300 shadow-xl"
            placeholder="Descrição bem legal"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1 mt-5">
          <label className="text-base font-bold uppercase">Imagem do projeto</label>
          <div className="flex items-center gap-2 bg-white rounded p-2">
            <button
              type="button"
              className="w-[150px] p-2 rounded bg-blue-300 text-white-300 font-medium transition-colors hover:bg-blue-200"
              onClick={handleButtonClick}
            >
              Escolher Arquivo
            </button>
            {fileName ? (
              <span className="text-lg font-medium text-gray-300">{fileName}</span>
            ) : (
              <span className="text-lg font-medium text-gray-300">Nenhum arquivo</span>
            )}
          </div>
          <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" ref={fileInputRef} />
          <p className="mt-1 text-sm font-medium text-gray">SVG, PNG, JPG</p>
        </div>

        {image && (
          <div className="mt-3">
            <img src={image} alt="Preview" className="w-[50%]" />
          </div>
        )}

        <div className="flex mt-5">
          <label className="text-base font-bold uppercase">Deixar publico?</label>
          <input type="checkbox" className="w-12" checked={published} onChange={() => setPublished(!published)} />
        </div>

        <div className="flex flex-col gap-1 mt-5">
          <label className="text-base font-bold uppercase">Repositório</label>
          <input
            type="text"
            className="w-full bg-white text-black font-medium rounded p-2 transition-colors focus:outline-none placeholder:text-gray-300 shadow-xl"
            placeholder="Link do repositório do github"
            value={repository}
            onChange={(e) => setRepository(e.target.value)}
          />
        </div>

        <div className="w-full flex items-center justify-center mt-5">
          <button type="submit" className=" w-32 bg-blue-300 p-2 text-xl font-medium text-white transition-colors rounded-lg hover:bg-blue-200 uppercase">
            {buttonText}
          </button>
        </div>
      </div>
    </form>
  );
}
