import TextEditor from "../components/editor/TextEditor";
import useAuth from "../context/auth-context";

const Home = () => {
  const { user, logout } = useAuth();
  return (
    <div>
      <p>Hello {user!.email}</p>
      <TextEditor />
    </div>
  );
};
export default Home;
