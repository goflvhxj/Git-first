const { GraphQLServer } = require("graphql-yoga");
const { argsToArgsConfig } = require("graphql/type/definition");
const { url } = require("inspector");

let people = [
  {
    id: 0,
    name: "Jongin",
    age: 20,
    gender: "male",
  },
  {
    id: 1,
    name: "Junha",
    age: 30,
    gender: "male",
  },
  {
    id: 2,
    name: "Jiyoung",
    age: 40,
    gender: "female",
  },
];

const getPeople = () => people;

const getByID = (id) => {
  const filteredPeople = people.filter((person) => person.id === id);
  return filteredPeople[0];
};

const deletePerson = (id) => {
  const cleanedPerson = people.filter((person) => person.id !== id);
  if (people.length > cleanedPerson.length) {
    people = cleanedPerson;
    return true;
  } else {
    return false;
  }
};

const addPerson = (name, age, gender) => {
  const newPerson = {
    id: people.length + 1,
    name,
    age,
    gender,
  };
  people.push(newPerson);
  return newPerson;
};

const resolvers = {
  Query: {
    people: () => getPeople(),
    person: (_, { id }) => getByID(id),
  },
  Mutation: {
    addPerson: (_, { name, age, gender }) => addPerson(name, age, gender),
    deletePerson: (_, { id }) => deletePerson(id),
  },
};

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
});
server.start({ port: 4000 }, () =>
  console.log(`서버가 작동중입니다.. http://localhost:4000`)
);
