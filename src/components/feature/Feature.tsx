import './Feature.scss';

interface FeatureProps {
    title: string;
    image: string;
    text: string;
}

function Feature({title, image, text}: FeatureProps) {
    return (
        <div className="feature-item">
            <img alt="Chat Icon" className="feature-icon" src={image}/>
            <h3 className="feature-item-title">{title}</h3>
            <p>
                {text}
            </p>
        </div>
    )
}

export default Feature;