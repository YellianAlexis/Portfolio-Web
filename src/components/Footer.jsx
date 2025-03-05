import '../assets/css/footer.css'

export default function Footer () {

    var date = new Date();

    return (
        <footer className="footer__content">
            <div className="footer__container">
                <small className="footer__text">@yellian {date.getFullYear()}<span style={{display: 'none'}}> - inspired by <a href='https://carlesteve.dev' target='_blank' rel='nofollow noreferrer'>carlesteve.dev</a></span></small>
            </div>
        </footer>
    )
}