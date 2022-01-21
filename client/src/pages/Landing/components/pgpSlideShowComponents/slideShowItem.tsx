interface slideShowItemProps {
    imgSrc: string,
    imgAltText: string,
    mainText: string,
    example?: string
}
const slideShowItem = (props:slideShowItemProps) =>{
    return (
        <div>
            <img src={props.imgSrc} alt={props.imgAltText} />
            <div>
                <p>{props.mainText}</p>
                {props.example ? 
                    <p>{props.example}</p>
                    : null
                }
            </div>
        </div>
    )
}
export default slideShowItem