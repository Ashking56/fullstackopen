import Part from './Part'

const Content = (props) => {
    console.log('Content props value is', props)

    return (
        <div>
            {props.parts.map(part =>
                <Part key={part.id} part={part} /> // 🔄 Renderizado dinámico
            )}
        </div>
    )
}


export default Content