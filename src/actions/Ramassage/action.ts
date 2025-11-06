import Ramassage from "../../@types/Ramassage";

export const getRamassages = (setData: (data: Ramassage[]) => void) => {
  fetch(`${process.env.REACT_APP_API_URL}/ramassages`, {
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
      console.error("Error fetching ramassages:", error);
      setData([]);
    });
};

export const getRamassagesByDate = (
  date: string,
  setData: (data: Ramassage[]) => void
) => {
  fetch(`${process.env.REACT_APP_API_URL}/ramassages/date/${date}`, {
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
      console.error("Error fetching ramassages by date:", error);
      setData([]);
    });
};

export const deleteRamassage = (id: string, callback: () => void) => {
  fetch(`${process.env.REACT_APP_API_URL}/ramassages/${id}`, {
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
      console.error("Error deleting ramassage:", error);
      alert("Erreur lors de la suppression");
    });
};
