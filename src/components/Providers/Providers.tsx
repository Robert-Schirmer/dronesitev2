import UserAuthProvider from '../../contexts/UserAuthContext/UserAuthProvider';
import type { PropsWithChildrenOnly } from '../../types';

const Providers: React.FC<PropsWithChildrenOnly> = ({ children }) => <UserAuthProvider>{children}</UserAuthProvider>;

export default Providers;
