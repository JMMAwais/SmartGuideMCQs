import axiosInstance from "./axiosInstance";

export const getAllMcqs = async (pageNumber = 1, pageSize = 10) => {
  const response = await axiosInstance.post("/MCQ/get-all-mcqs", {
    pageNumber,
    pageSize,
  });
  return response.data;
};

export const getTopSubjects = async () => {
  const response = await axiosInstance.post("/MCQ/top-subjects");
  return response.data;
};

export const getMcqsBySubject = async (subjectId, pageNumber = 1, pageSize = 10) => {
  const response = await axiosInstance.post("/MCQ/get-all-mcqs-by-subject", {
    subjectId,
    pageNumber,
    pageSize,
  });
  return response.data;
};

export const getAllSubjects = async () => {
  const response = await axiosInstance.post("/MCQ/get-all-subjects");
  return response.data;
};

export const getDashboardStats = async () => {
  const response = await axiosInstance.post("/MCQ/dashboard-stats");
  return response.data;
};

export const getMcqsBySubjectStats = async () => {
  const response = await axiosInstance.post("/MCQ/mcqs-by-subject");
  return response.data;
};

export const createSubject = async (data) => {
  const response = await axiosInstance.post("/MCQ/create-subject", data);
  return response.data;
};

export const updateSubject = async (data) => {
  const response = await axiosInstance.post("/MCQ/update-subject", data);
  return response.data;
};

export const deleteSubject = async (id) => {
  const response = await axiosInstance.post("/MCQ/delete-Subject", { id });
  return response.data;
};

export const createMCQ = async (data) => {
  const response = await axiosInstance.post("/MCQ/create-mcq", data);
  return response.data;
};

export const updateMCQ = async (data) => {
  const response = await axiosInstance.post("/MCQ/update-mcq", data);
  return response.data;
};

export const deleteMCQ = async (id) => {
  const response = await axiosInstance.post("/MCQ/delete-mcq", { id });
  return response.data;
};
