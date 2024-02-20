// src/MyApp.js
import React, {useState, useEffect} from 'react';
import Table from "./Table";
import Form from "./Form";

function MyApp() {
    const [characters, setCharacters] = useState([]);
    
    function removeOneCharacter(index, id) {
        deleteUser(id)
            .then((response) => {
                if (response.status === 204) {
                    const updated = characters.filter((character, i) => i !== index);
                    setCharacters(updated);
                } else if (response.status === 404) {
                    console.log("Resource not found.");
                } else {
                    console.log("Failed to delete user.");
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function deleteUser(id) {
        const promise = fetch(`http://localhost:8000/users/${id}`, {
            method: 'DELETE',
        });
      
        return promise;
    }

    function updateList(person) { 
        postUser(person)
          .then((response) => {
            if(response.status === 201) {
                return response.json();
            } else {
                console.log("Failed to insert user.");
                throw new Error("Failed to insert user");
            }
          })
          .then((json) => {
            setCharacters([...characters, json]);
          })
          .catch((error) => {
            console.log(error);
        });
    }

    function fetchUsers() {
        const promise = fetch("http://localhost:8000/users");
        return promise;
    }

    useEffect(() => {
        fetchUsers()
            .then((res) => res.json())
            .then((json) => setCharacters(json["users_list"]))
            .catch((error) => { console.log(error); });
    }, [] );

    function postUser(person) {
        const promise = fetch("Http://localhost:8000/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(person),
        });
    
        return promise;
    }

    return (
        <div className="container">
            <Table
                characterData={characters}
                removeCharacter={removeOneCharacter}
            />
            <Form handleSubmit={updateList} />
        </div>
    );
}

export default MyApp;