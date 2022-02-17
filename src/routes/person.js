import React from "react";
import { Link, useLocation } from 'react-router-dom';
import Header from "../components/Header";
import { useQuery } from "react-query";
import Loader from "../components/Loader";
import Error from "../components/Error";
import fetch from "../components/fetch";

export default function Person() {
  const { id } = useLocation().state;
  return(
    <>
      <Header />
      <FetchPerson user={ id } />
    </>
  );
}

function FetchPerson({ user }) {
    const { isLoading, error, data } = useQuery(`person-${user}`, () =>
      fetch(
        `https://swapi.dev/api/people/${user}`
      )
    );
  
    if (isLoading) return <Loader />;
  
    if (error) return <Error />;
  
    return (
      <>
        <div className="Body">
          <h1>{data.name}</h1>
            <p>Mundo de origem: {<FetchWorld id={data.homeworld.replace(/\D/g, "")} key={`homeworld-${data.homeworld.replace(/\D/g, "")}`}></FetchWorld>}</p>
            <p>Gênero: {`${(data.gender !== "unknown") ? `${tractGender(data.gender)}` : 'Desconhecido'}`}</p>
            <p>Ano de nascimento: {`${(data.birth_year !== "unknown") ? `${data.birth_year}` : 'Desconhecido'}`}</p>
            <p>Altura: {`${(data.height !== "unknown") ? `${data.height / 100}m` : 'Desconhecida'}`}</p>
            <p>Peso: {`${(data.mass !== "unknown") ? `${data.mass}kg` : 'Desconhecido'}`}</p>
            <Link to="/"><button>Voltar</button></Link>
        </div>
      </>
    );
  }

  function tractGender(gender){
    const dicionario = {
      male: 'Masculino',
      female: 'Feminino'
    };
    
    return dicionario?.[gender] || "Não especificado";
  }

  function FetchWorld(props){
    const { id } = props;
    const { data, status, error } = useQuery(`homeworld-${id}`, () =>
    fetch(`https://swapi.dev/api/planets/${id}`)
    );

    if (error) return "Error";

    if (status === "success"){
      if(data.name !== "unknown"){
        return (data.name);
      }
      return ("Não informado");
    }
    return null;
  }