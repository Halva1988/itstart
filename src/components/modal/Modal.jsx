import { useState } from "react";
import style from "./modal.module.css";

export const Modal = ({ item, onSubmit, toggleModal }) => {
	// Инициализация состояния формы с данными семинара
	const [formData, setFormData] = useState(item);

	// Обработчик изменения полей формы
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	// Обработчик отправки формы
	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit(formData);
	};

	return (
		<div className={style.wrapperModal} onClick={toggleModal}>
			<form
				className={style.modal}
				onSubmit={handleSubmit}
				onClick={(e) => e.stopPropagation()}
			>
				<label htmlFor="title">
					Title
					<input
						type="text"
						name="title"
						placeholder="Title"
						value={formData.title}
						onChange={handleChange}
					/>
				</label>
				<label htmlFor="description">
					Description
					<textarea
						type="text"
						name="description"
						placeholder="Description"
						value={formData.description}
						onChange={handleChange}
					/>
				</label>
				<label htmlFor="date">
					Date
					<input
						type="date"
						name="date"
						placeholder="Date"
						value={formData.date}
						onChange={handleChange}
					/>
				</label>
				<label htmlFor="time">
					Time
					<input
						type="time"
						name="time"
						placeholder="Time"
						value={formData.time}
						onChange={handleChange}
					/>
				</label>
				<label htmlFor="photo">
					Photo URL
					<input
						type="text"
						name="photo"
						placeholder="Photo URL"
						value={formData.photo}
						onChange={handleChange}
					/>
				</label>
				<button className={style.saveButton} type="submit">
					Save
				</button>
			</form>
		</div>
	);
};
