import UserAuthProvider from '../../contexts/UserAuthContext/UserAuthProvider';

const Providers: React.FC = ({ children }) => <UserAuthProvider>{children}</UserAuthProvider>;

export default Providers;
