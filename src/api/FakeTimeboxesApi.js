import uuid from "uuid";
import { wait } from "./wait";

const timeboxes = [
  {
    id: 1,
    title: "Uczę się o promises",
    totalTimeInMinutes: 25,
    finished: false,
  },
  { id: 2, title: "Poznaję REST API", totalTimeInMinutes: 10, finished: false },
  {
    id: 3,
    title: "Ćwiczę async/await",
    totalTimeInMinutes: 15,
    finished: false,
  },
  { id: 4, title: "Uczę się fetch", totalTimeInMinutes: 5, finished: false },
];
function findIndexByAnId(id) {
  const result = timeboxes.findIndex((timebox) => timebox.id === id);
  if (result < 0) {
    throw new Error("Timebox o podanym id nie istnieje");
  }
  return result;
}
const FakeTimeboxesAPI = {
  getAllTimeboxes: async function () {
    await wait(200);
    // console.log("GET all", timeboxes);
    return [...timeboxes];
  },
  addTimebox: async function (timeboxToAdd) {
    await wait(200);
    const addedTimebox = { ...timeboxToAdd, id: uuid.v4() };
    timeboxes.push(addedTimebox);
    // console.log("POST", timeboxes);
    return addedTimebox;
  },
  replaceTimebox: async function (timeboxToReplace) {
    await wait(200);
    if (!timeboxToReplace.id) {
      throw new Error("Cannot replace timebox without an id.");
    }
    const index = findIndexByAnId(timeboxToReplace.id);
    const replacedTimebox = { ...timeboxToReplace };
    timeboxes[index] = replacedTimebox;
    // console.log("PUT", timeboxes);
    return replacedTimebox;
  },
  removeTimebox: async function (timeboxToRemove) {
    await wait(200);
    if (!timeboxToRemove.id) {
      throw new Error("Cannot remove timebox without an id.");
    }
    const index = findIndexByAnId(timeboxToRemove.id);
    timeboxes.splice(index, 1);
    // console.log("DELETE", timeboxes);
  },
};

export default FakeTimeboxesAPI;
