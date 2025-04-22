const Part = (props) => {
    // console.log('props value is', props.part.name, props.part.exercises)
    return (
        <p>
            {props.part.name} {props.part.exercises}
        </p>
    )
}

export default Part