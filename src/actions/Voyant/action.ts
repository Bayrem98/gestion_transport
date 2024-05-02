import axios from "axios";
import Voyant from "../../@types/Voyant";

export function getVoyants(
  query: {
    nom?: string;
    planing?: string;
  } | null,
  callback: (data: Voyant[]) => void
) {
  axios
    .get(`http://localhost:3003/voyant`, {
      params: query,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
    .then(({ data }) => {
      callback(data);
    })
    .catch((error) => {
      console.error(error);
    });
}

export function getVoyant(id: string, callback: (data: Voyant) => void) {
  axios
    .get(`http://localhost:3003/voyant/` + id, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
    .then(({ data }) => {
      callback(data);
    })
    .catch((e) => {
      console.error(e);
    });
}

export function addVoyant(voyant: Voyant, callback: () => void) {
  axios
    .post(`http://localhost:3003/voyant`, voyant)
    .then(() => {
      callback();
    })
    .catch((error) => {
      console.error(error);
    });
}

export function editVoyant(voyant: Voyant, callback: () => void) {
  axios
    .put(`http://localhost:3003/voyant/${voyant._id}`, voyant)
    .then(() => {
      callback();
    })
    .catch((error) => {
      console.error(error);
    });
}

export function deleteVoyant(voyant: Voyant, callback: () => void) {
  axios
    .delete(`http://localhost:3003/voyant/${voyant._id}`)
    .then(() => {
      callback();
    })
    .catch((error) => {
      console.error(error);
    });
}
