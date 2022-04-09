import type { PropsWithChildrenOnly } from '../../../types';
import UserAuthProvider from '../../contexts/UserAuthContext/UserAuthProvider';

const Providers: React.FC<PropsWithChildrenOnly> = ({ children }) => <UserAuthProvider>{children}</UserAuthProvider>;

export default Providers;
