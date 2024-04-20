import { enUS_dashboard } from './dashboard';
import { enUS_globalTips } from './global/tips';
import { enUS_avatorDropMenu } from './user/avatorDropMenu';
import { enUS_tagsViewDropMenu } from './user/tagsViewDropMenu';
import { enUS_title } from './user/title';
import { enUS_userManagement } from './userManagement';

const en_US = {
    ...enUS_avatorDropMenu,
    ...enUS_tagsViewDropMenu,
    ...enUS_title,
    ...enUS_globalTips,
    ...enUS_dashboard,
    ...enUS_userManagement,
};

export default en_US;
