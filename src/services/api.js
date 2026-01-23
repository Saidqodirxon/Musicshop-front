import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Language helper
const getCurrentLanguage = () => {
  // Check i18next key first, fallback to old "language" key for backwards compatibility
  let lang = localStorage.getItem("i18nextLng");
  if (!lang) {
    lang = localStorage.getItem("language");
    // Migrate old key to new key
    if (lang) {
      localStorage.setItem("i18nextLng", lang);
      localStorage.removeItem("language");
    }
  }
  return lang || "ru";
};

// ==================== HOME PAGE ====================

// Banners for Hero section
export const getBanners = async () => {
  // Response: [{ _id, image, createdAt, updatedAt }]
  const response = await api.get("/banners");
  return response.data;
};

// What We Do - Services grid (8 items)
export const getWhatWeDo = async () => {
  // Response: [{ _id, title: {uz, ru, en}, description: {uz, ru, en}, order }]
  const response = await api.get("/what-we-do");
  const lang = getCurrentLanguage();
  return response.data.map((item) => ({
    ...item,
    title: item.title[lang],
    description: item.description[lang],
  }));
};

// Who We Work For - 4 solution cards
export const getWhoWeWorkFor = async () => {
  // Response: [{ _id, title: {uz, ru, en}, description: {uz, ru, en}, image, solution, result, order }]
  const response = await api.get("/who-we-work-for");
  const lang = getCurrentLanguage();
  return response.data.map((item) => ({
    ...item,
    title: item.title[lang],
    description: item.description[lang],
    solution: item.solution ? item.solution[lang] : "",
    result: item.result ? item.result[lang] : "",
  }));
};

// How We Work - 4 steps with images
export const getHowWeWork = async () => {
  // Response: [{ _id, title: {uz, ru, en}, description: {uz, ru, en}, image, order }]
  const response = await api.get("/how-we-work");
  const lang = getCurrentLanguage();
  return response.data.map((item) => ({
    ...item,
    title: item.title[lang],
    description: item.description[lang],
  }));
};

// Cases - Projects/Packages
export const getCases = async () => {
  // Response: [{ _id, title: {uz, ru, en}, description: {uz, ru, en}, image, document }]
  const response = await api.get("/cases");
  const lang = getCurrentLanguage();
  return response.data.map((item) => ({
    ...item,
    title: item.title[lang],
    description: item.description[lang],
  }));
};

// Services
export const getServices = async () => {
  // Response: [{ _id, title: {uz, ru, en}, description: {uz, ru, en}, image, solution, result }]
  const response = await api.get("/services");
  const lang = getCurrentLanguage();
  return response.data.map((item) => ({
    ...item,
    title: item.title[lang],
    description: item.description[lang],
    solution: item.solution ? item.solution[lang] : "",
    result: item.result ? item.result[lang] : "",
  }));
};

// FAQ
export const getFAQ = async () => {
  // Response: [{ _id, question: {uz, ru, en}, answer: {uz, ru, en}, order }]
  const response = await api.get("/faq");
  const lang = getCurrentLanguage();
  return response.data.map((item) => ({
    ...item,
    question: item.question[lang],
    answer: item.answer[lang],
  }));
};

// ==================== PRODUCTS PAGE ====================

// Categories for filter
export const getCategories = async () => {
  // Response: [{ _id, name: {uz, ru, en} }]
  const response = await api.get("/categories");
  const lang = getCurrentLanguage();
  return response.data.map((item) => ({
    ...item,
    name: item.name?.[lang] || item.name?.ru || item.name?.uz || "",
  }));
};

// Products with optional category filter
export const getProducts = async (categoryId = null) => {
  // Response: [{ _id, name: {uz, ru, en}, description: {uz, ru, en}, images: [], category, inStock, showOnSite, isTopProduct, price }]
  const url = categoryId ? `/products?category=${categoryId}` : "/products";
  const response = await api.get(url);
  const lang = getCurrentLanguage();
  return response.data.map((item) => ({
    ...item,
    name: item.name?.[lang] || item.name?.ru || item.name?.uz || "",
    description:
      item.description?.[lang] ||
      item.description?.ru ||
      item.description?.uz ||
      "",
    // Keep original multilang data for populated category
    category:
      item.category && typeof item.category === "object"
        ? {
            ...item.category,
            // Keep original name object for dynamic language switching in components
          }
        : item.category,
  }));
};

// Single product details
export const getProductById = async (id) => {
  const response = await api.get(`/products/${id}`);
  const lang = getCurrentLanguage();
  return {
    ...response.data,
    name: response.data.name[lang],
    description: response.data.description[lang],
  };
};

// ==================== ABOUT PAGE ====================

export const getAbout = async () => {
  // Response: { _id, banner, mainText: {uz, ru, en}, image, additionalText: {uz, ru, en}, images: [] }
  const response = await api.get("/about");
  const lang = getCurrentLanguage();
  return {
    ...response.data,
    mainText: response.data.mainText[lang],
    additionalText: response.data.additionalText[lang],
    images: response.data.images || [],
  };
};

// ==================== NEWS PAGE ====================

export const getNews = async () => {
  // Response: [{ _id, title: {uz, ru, en}, content: {uz, ru, en}, image, publishDate }]
  const response = await api.get("/news");
  const lang = getCurrentLanguage();
  return response.data.map((item) => ({
    ...item,
    title: item.title[lang],
    content: item.content[lang],
  }));
};

export const getNewsById = async (id) => {
  const response = await api.get(`/news/${id}`);
  const lang = getCurrentLanguage();
  return {
    ...response.data,
    title: response.data.title[lang],
    content: response.data.content[lang],
  };
};

// ==================== CONTACTS ====================

export const getContacts = async () => {
  // Response: { _id, phone, email, address: {uz, ru, en}, workingHours: {uz, ru, en}, socialMedia: {} }
  const response = await api.get("/contacts");
  const lang = getCurrentLanguage();
  return {
    ...response.data,
    address: response.data.address[lang],
    workingHours: response.data.workingHours[lang],
  };
};

// ==================== REVIEWS ====================

export const getReviews = async () => {
  // Response: [{ _id, clientName: {uz, ru, en}, company: {uz, ru, en}, text: {uz, ru, en}, rating, image }]
  const response = await api.get("/reviews");
  const lang = getCurrentLanguage();
  return response.data.map((item) => ({
    ...item,
    clientName: item.clientName?.[lang] || item.name,
    company: item.company?.[lang] || "",
    text: item.text?.[lang] || item.comment,
  }));
};

// ==================== FORMS ====================

// Application/Consultation form
export const submitApplication = async (data) => {
  // Request: { name, phone, email?, message?, projectType? }
  const response = await api.post("/applications", data);
  return response.data;
};

export default api;
