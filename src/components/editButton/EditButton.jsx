export const EditButton = ({ id, onClick }) => {
	return (
		<button onClick={() => { onClick(id) }}>
			<img
				src="https://img.icons8.com/ios-glyphs/30/ff0099/edit.png"
				alt="edit"
			/>
		</button>
	);
};
