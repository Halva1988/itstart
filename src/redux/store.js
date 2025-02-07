import { configureStore } from "@reduxjs/toolkit";
import { seminarsApi } from "./seminarsApi";

// Создаём Redux store
export const store = configureStore({
	// Добавляем редьюсер 
	reducer: {
		[seminarsApi.reducerPath]: seminarsApi.reducer,
	},
	// Добавляем middleware seminarsApi для обработки асинхронных запросов
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(seminarsApi.middleware),
});