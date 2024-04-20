import type { Device } from '../layout/index.interface';
import type { Role } from './login';

export type Locale = 'en_US';

export interface UserState {
    username: string;
    menuList: [];
    logged: boolean;
    role: Role;
    device: Device;
    collapsed: boolean;
    noticeCount: number;
    locale: Locale;
    newUser: boolean;
}
