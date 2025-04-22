const Header = (props) => {
    console.log('Header props value is', props)

    return (

        <h1>{props.course.name}</h1>

    )

}


export default Header