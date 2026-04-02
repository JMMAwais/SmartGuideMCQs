// const BASE_URL = "https://localhost:7066/api";

// export const getAllMcqs = async (pageNumber = 1, pageSize = 10) => {
//   const response = await fetch(`${BASE_URL}/MCQ/get-all-mcqs`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ pageNumber, pageSize }),
//   });

//   if (!response.ok) {
//     throw new Error("Failed to fetch MCQs");
//   }

//   return response.json();
// };