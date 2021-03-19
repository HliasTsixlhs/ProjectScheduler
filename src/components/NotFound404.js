const { Link } = require("react-router-dom")


const NotFound404 = () => {
    return (
        <div className="not-found">
            <h2>404</h2>
            <p>Page not be found!</p>
            <Link to="/">Back to the homepage...!</Link>
        </div>
      );
}
 
export default NotFound404;