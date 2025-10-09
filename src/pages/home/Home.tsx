import './Home.scss'
import iconChat from '../../assets/icon-chat.png';
import iconMoney from '../../assets/icon-money.png';
import iconSecurity from '../../assets/icon-security.png';
import Feature from "../../components/feature/Feature.tsx";

function Home() {

    const featuresContent = [
        {
            title: 'You are our #1 priority',
            image: iconChat,
            text: 'Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes.'
        },
        {
            title: 'More savings means higher rates',
            image: iconMoney,
            text: '  The more you save with us, the higher your interest rate will be!'
        },
        {
            title: 'Security you can trust',
            image: iconSecurity,
            text: 'We use top of the line encryption to make sure your data and money is always safe.'
        }
    ]

    return (
        <main>
            <div className="hero">
                <section className="hero-content">
                    <h2 className="sr-only">Promoted Content</h2>
                    <p className="subtitle">No fees.</p>
                    <p className="subtitle">No minimum deposit.</p>
                    <p className="subtitle">High interest rates.</p>
                    <p className="text">Open a savings account with Argent Bank today!</p>
                </section>
            </div>
            <section className="features">
                <h2 className="sr-only">Features</h2>
                {featuresContent.map((feature, index) => (
                    <Feature key={index} title={feature.title} image={feature.image} text={feature.text}/>
                ))}
            </section>
        </main>
    )
}

export default Home
