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
    .get(`${process.env.REACT_APP_API_URL}/voyant`, {
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
    .get(`${process.env.REACT_APP_API_URL}/voyant` + id, {
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
    .post(`${process.env.REACT_APP_API_URL}/voyant`, voyant)
    .then(() => {
      callback();
    })
    .catch((error) => {
      console.error(error);
    });
}

export function editVoyant(voyant: Voyant, callback: () => void) {
  axios
    .put(`${process.env.REACT_APP_API_URL}/voyant/${voyant._id}`, voyant)
    .then(() => {
      callback();
    })
    .catch((error) => {
      console.error(error);
    });
}

export function deleteVoyant(voyant: Voyant, callback: () => void) {
  axios
    .delete(`${process.env.REACT_APP_API_URL}/voyant/${voyant._id}`)
    .then(() => {
      callback();
    })
    .catch((error) => {
      console.error(error);
    });
}
