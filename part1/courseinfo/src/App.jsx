const Header = (props) => {
    console.log(props);
    return (
        <div>
            <h1>{props.course.name}</h1>
        </div>
    );
};



const Content = (props) => {
    console.log(props);
    return (
        <div>
            {props.course.parts.map((part, index) => (
                <p key={index}>
                    {part.name} {part.exercises}
                </p>
            ))}
        </div >
    );
};

const Total = (props) => {
    console.log(props)
    const total = props.course.parts.reduce((sum, part) => sum + part.exercises, 0);
    console.log(total)
    return (
        <div>
            <p>Number of exercises {total}</p>
        </div>
    );
};
const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10
            },
            {
                name: 'Using props to pass data',
                exercises: 7
            },
            {
                name: 'State of a component',
                exercises: 14
            }
        ]
    }
    return (
        <div>
            <Header course={course} />
            <Content course={course} />
            <Total course={course} />
        </div>
    );
};

export default App;