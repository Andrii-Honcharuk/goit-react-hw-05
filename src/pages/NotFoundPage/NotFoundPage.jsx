import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div>
      <p>Sorry page not found</p>
      <button>
        <Link to="/"> Go back home page</Link>
      </button>
    </div>
  );
}
