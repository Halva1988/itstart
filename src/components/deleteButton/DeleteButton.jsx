export const DeleteButton = ({id, onClick}) => {
	return (
		<button onClick={() => onClick(id)}>
			<img
				src="https://img.icons8.com/ios-glyphs/30/ff0000/delete-sign.png"
				alt="delete"
			/>
		</button>
	);
};
