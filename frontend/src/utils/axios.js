import axios from "axios";

const apiInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:5002/api/v1/",
  timeout: 5000, // 5 seconds timeout

  //  El prefijo "application/" indica que el tipo de contenido es un tipo de datos de aplicación. Esto ayuda a diferenciar entre diferentes tipos de datos que podrían tener formatos similares pero usos diferentes.
  // "application/json" es el tipo MIME estándar para JSON
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default apiInstance;
