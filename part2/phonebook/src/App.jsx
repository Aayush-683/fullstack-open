import React, { useEffect, useState } from "react";
import contacts from "./services/contacts";
import "./assets/style.css";

const FilterForm = ({ filterName, handleFilterChange }) => {
  return (
    <div>
      filter shown with{" "}
      <input value={filterName} onChange={handleFilterChange} />
    </div>
  );
};

const PersonForm = ({
  handleFormSubmit,
  newName,
  handleNameChange,
  newNumber,
  handleNumberChange,
}) => {
  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        name: <input value={newName} onChange={handleNameChange} id="name" />
        <br />
        number:{" "}
        <input value={newNumber} onChange={handleNumberChange} id="number" />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Person = ({ person, DelContact }) => {
  return (
    <>
      <p>
        {person.name} {person.number}
      </p>
      <button onClick={() => DelContact(person.id)}>Delete</button>
    </>
  );
};

const Error = ({ message, success }) => {
  if (!message) {
    return null;
  }

  return (
    <div className={success ? "success" : "error"}>
      <p>{message}</p>
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [display, setDisplay] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setFilterName] = useState("");
  const [errorMsg, setErrorMsg] = useState({ message: "", success: true });

  const AddContact = (event) => {
    event.preventDefault();
    const name = newName;
    const number = newNumber;

    if (persons.some((person) => person.name === name)) {
      const confirmReplace = window.confirm(
        `${name} is already added to phonebook, replace the old number with a new one?`
      );
      if (confirmReplace) {
        UpdateContact({
          id: persons.find((person) => person.name === name).id,
          number,
        });
      }
      return;
    }

    const id =
      persons.length > 0
        ? Math.max(...persons.map((person) => person.id)) + 1
        : 1;

    contacts.create({ name, number, id }).then((res) => {
      const newPerson = { name, number, id };
      setPersons(persons.concat(newPerson));
      setDisplay(persons.concat(newPerson));
      setNewName("");
      setNewNumber("");
      handleErrorMessage(`Added ${name}`, true);
    });
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterName(event.target.value);
    const filter = event.target.value.toLowerCase();

    if (!filter) {
      setDisplay(persons);
      return;
    }

    const filteredPersons = persons.filter((person) =>
      person.name.toLowerCase().includes(filter)
    );

    setDisplay(filteredPersons.length > 0 ? filteredPersons : persons);
  };

  const DelContact = (id) => {
    const personToDelete = persons.find((person) => person.id === id);
    const confirmDelete = window.confirm(`Delete ${personToDelete.name}?`);

    if (confirmDelete) {
      contacts.del(id).then((res) => {
        const updatedPersons = persons.filter((person) => person.id !== id);
        setPersons(updatedPersons);
        setDisplay(updatedPersons);
        handleErrorMessage(`Deleted ${personToDelete.name}`, false);
      });
    }
  };

  const UpdateContact = ({ id, number }) => {
    const personToUpdate = persons.find((person) => person.id === id);
    if (!number) {
      return;
    }

    contacts.update(id, { name: personToUpdate.name, number }).then((res) => {
      const updatedPersons = persons.map((person) =>
        person.id === id ? { ...person, number } : person
      );
      setPersons(updatedPersons);
      setDisplay(updatedPersons);
      handleErrorMessage(`Updated ${personToUpdate.name}`, true);
    })
    .catch(() => {
      handleErrorMessage(
        `Information of ${personToUpdate.name} has already been removed from server`,
        false
      );
    });
  };

  const handleErrorMessage = (message, success) => {
    setErrorMsg({ message, success });
    setTimeout(() => {
      setErrorMsg({ message: "", success: true });
    }, 5000);
  };

  useEffect(() => {
    contacts.getAll().then((res) => {
      setPersons(res);
      setDisplay(res);
    });
  }, []);

  return (
    <div>
      <Error message={errorMsg.message} success={errorMsg.success} />
      <h2>Phonebook</h2>
      <FilterForm
        filterName={filterName}
        handleFilterChange={handleFilterChange}
      />
      <h2>Add a new</h2>
      <PersonForm
        handleFormSubmit={AddContact}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      {display.length > 0
        ? display.map((person) => (
            <Person key={person.id} person={person} DelContact={DelContact} />
          ))
        : "Loading..."}
    </div>
  );
};

export default App;
