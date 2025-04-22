const Total = (props) => {
    console.log('Total props value is', props)

    const totalExercises = props.parts.reduce(
        (sum, part) => sum + part.exercises,
        0
    );

    return <p><strong>Total of {totalExercises} exercises</strong></p>;
};

export default Total;