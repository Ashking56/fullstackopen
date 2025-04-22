const Total = (props) => {
    // Calcula la suma usando reduce()
    const totalExercises = props.parts.reduce(
        (sum, part) => sum + part.exercises,
        0
    );

    return <p><strong>Total of {totalExercises} exercises</strong></p>;
};

export default Total;