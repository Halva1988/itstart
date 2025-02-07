import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Создаём API для работы с семинарами
export const seminarsApi = createApi({
	// Указываем путь редьюсера для API
	reducerPath: "seminarsApi",
	// Определяем типы тегов для кэширования и инвалидации
	tagTypes: ["Seminars"],
	// Настраиваем базовый запрос с указанием базового URL
	baseQuery: fetchBaseQuery({
		baseUrl: "http://localhost:3000/",
	}),
	endpoints: (builder) => ({
		// Эндпоинт для получения списка семинаров
		getSeminars: builder.query({
			query: () => "seminars",
			// Определяем теги для кэширования и инвалидации
			providesTags: (result) =>
				result
					? [
							...result.map(({ id }) => ({ type: "Seminars", id })),
							{ type: "Seminars", id: "LIST" },
					  ]
					: [{ type: "Seminars", id: "LIST" }],
		}),
		// Эндпоинт для удаления семинара
		deleteSeminars: builder.mutation({
			query: (id) => ({
				url: `seminars/${id}`,
				method: "DELETE",
			}),
			// Инвалидация тегов после удаления семинара
			invalidatesTags: [{ type: "Seminars", id: "LIST" }],
		}),
		// Эндпоинт для редактирования семинара
		editedSeminars: builder.mutation({
			query: ({ id, ...data }) => ({
				url: `seminars/${id}`,
				method: "PATCH",
				body: data,
			}),
			// Инвалидация тегов после редактирования
			invalidatesTags: (result, error, { id }) => [{ type: "Seminars", id }],
		}),
	}),
});

// Экспортируем хуки для использования эндпоинтов в компонентах
export const { useGetSeminarsQuery, useDeleteSeminarsMutation, useEditedSeminarsMutation } = seminarsApi;