import axios from "axios";
import Voyant from "../../@types/Voyant";
import Departement from "../../@types/Departement";

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

export const getDepartements = (setData: (data: Departement[]) => void) => {
  fetch(`${process.env.REACT_APP_API_URL}/departements`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      // S'assurer que data est toujours un tableau
      setData(Array.isArray(data) ? data : []);
    })
    .catch((error) => {
      console.error("Error fetching departements:", error);
      setData([]); // Retourner un tableau vide en cas d'erreur
    });
};

export const getDepartementsByDate = (
  date: string,
  setData: (data: Departement[]) => void
) => {
  fetch(`${process.env.REACT_APP_API_URL}/departements/date/${date}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      setData(Array.isArray(data) ? data : []);
    })
    .catch((error) => {
      console.error("Error fetching departements by date:", error);
      setData([]);
    });
};

export const deleteDepartement = (id: string, callback: () => void) => {
  fetch(`${process.env.REACT_APP_API_URL}/departements/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        callback();
      } else {
        throw new Error("Erreur lors de la suppression");
      }
    })
    .catch((error) => {
      console.error("Error deleting departement:", error);
      alert("Erreur lors de la suppression");
    });
};
