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
	const [deleteSeminars] = useDeleteSeminarsMutation();
	const [editedSeminars] = useEditedSeminarsMutation();
	const [isModalOpen, setIsModalOpen] = useState(false);

	// Функция для открытия модального окна
	const toggleModal = () => {		
		setIsModalOpen(prev => !prev);
	};

	// Функция для удаления семинара
	const handleDeleteSeminar = async (id) => {
		if (confirm("Are you sure you want to delete this seminar?")) {
			await deleteSeminars(id).unwrap();
		}
	};

	// Функция для отправки изменений семинара
	const handleSubmit = async (newData) => {
		await editedSeminars({ id, ...newData }).unwrap();
		setIsModalOpen(false);
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
			</li>
			{isModalOpen && (
				<Modal onSubmit={handleSubmit} item={item} toggleModal={toggleModal} />
			)}
		</>
	);
};
