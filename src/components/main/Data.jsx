import { useGetSeminarsQuery } from "../../redux/seminarsApi";
import style from "./data.module.css";
import { Seminar } from "./seminar/seminar";

export const Data = () => {
	// Используем хук useGetSeminarsQuery для получения семинаров
	const { data = [], isLoading, isError, error } = useGetSeminarsQuery();

	if (isLoading) return <h1>Loading...</h1>;
	if (isError) return <h1>{error}</h1>;

	return (
		<div className={style.wrapper}>
			<ul className={style.list}>
				{data.map((item) => (
					<Seminar key={item.id} item={item} />
				))}
			</ul>
		</div>
	);
};
