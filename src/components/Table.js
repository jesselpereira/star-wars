import React from "react";
import styled from 'styled-components';
import '../App.css';
import fetch from "./fetch";
import { Link } from 'react-router-dom';

import { useQuery } from "react-query";

const Styles = styled.div`
  table {
    margin-top: 10px;
    margin-bottom: 50px;
    border-spacing: 0;
    border: 1px solid grey;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;
      :last-child {
        border-right: 0;
      }
    }

    th {
      border-bottom: 2px solid grey;
      color: white;
      font-weight: bold;
    }
  }
`;

function Table({ data }) {
  let listPersons = data.results.map(function(person, i) {
    const homeWorldUrlParts = person.homeworld.split("/").filter(Boolean);
    const homeWorldId = homeWorldUrlParts[homeWorldUrlParts.length - 1];
    let personId = person.url.replace(/\D/g, "");

    return(
      <tr key={i}>
        <td>{person.name}</td>
        <td><Homeworld id={homeWorldId} key={`homeworld-${homeWorldId}`} /></td>
        <td><Link to={`/person/${personId}`} key={personId} state={{ id: personId }}>Ver</Link></td>
      </tr>
    )
  });
  return(
    <Styles>
      <table>
        <tbody id="persons-content">
          <tr>
            <th>Nome</th>
            <th>Mundo de origem</th>
            <th></th>
          </tr>
          {listPersons}
        </tbody>
      </table>
    </Styles>
  );
}

function Homeworld(props) {
  const { id } = props;
  const { data, status } = useQuery(`homeworld-${id}`, () =>
    fetch(`https://swapi.dev/api/planets/${id}/`)
  );

  if (status !== "success") {
    return null;
  }
  return (data.name);
}

export default Table