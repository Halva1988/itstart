import { DeleteButton } from "../../deleteButton/DeleteButton";
import style from "./seminar.module.css";
import {
	useDeleteSeminarsMutation,
	useEditedSeminarsMutation,
} from "../../../redux/seminarsApi";
import { EditButton } from "../../editButton/EditButton";
import { useState } from "react";
import { Modal } from "../../modal/Modal";

export const Seminar = ({ item }) => {
	const { id, title, description, date, time, photo } = item;
	const [
		deleteSeminars,
		{ isLoading: isDeleting, isError: isDeleteError, error: deleteError },
	] = useDeleteSeminarsMutation();
	const [
		editedSeminars,
		{ isLoading: isEditing, isError: isEditError, error: editError },
	] = useEditedSeminarsMutation();
	const [isModalOpen, setIsModalOpen] = useState(false);

	// Функция для открытия модального окна
	const toggleModal = () => {
		setIsModalOpen((prev) => !prev);
	};

	// Функция для удаления семинара
	const handleDeleteSeminar = async (id) => {
		if (confirm("Are you sure you want to delete this seminar?")) {
			try {
				await deleteSeminars(id).unwrap();
			} catch (error) {
				console.error("Failed to delete the seminar: ", error);
			}
		}
	};

	// Функция для отправки изменений семинара
	const handleSubmit = async (newData) => {
		try {
			await editedSeminars({ id, ...newData }).unwrap();
			setIsModalOpen(false);
		} catch (error) {
			console.error("Failed to edit the seminar: ", error);
		}
	};

	return (
		<>
			<li className={style.seminar}>
				<div className={style.buttons}>
					<EditButton id={id} onClick={toggleModal} />
					<DeleteButton id={id} onClick={handleDeleteSeminar} />
				</div>
				<h2>{title}</h2>
				<p>{description}</p>
				<p>{date}</p>
				<p>{time}</p>
				<img src={photo} alt={title} />
				{isDeleting && <p>Deleting...</p>}
				{isDeleteError && (
					<p className={style.error}>Error: {deleteError.message}</p>
				)}
			</li>
			{isModalOpen && (
				<Modal onSubmit={handleSubmit} item={item} toggleModal={toggleModal} />
			)}
			{isEditing && <p>Editing...</p>}
			{isEditError && <p className={style.error}>Error: {editError.message}</p>}
		</>
	);
};
