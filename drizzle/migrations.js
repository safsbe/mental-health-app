// This file is required for Expo/React Native SQLite migrations - https://orm.drizzle.team/quick-sqlite/expo

import journal from './meta/_journal.json';
import m0000 from './0000_good_lethal_legion.sql';
import m0001 from './0001_pretty_magma.sql';
import m0002 from './0002_striped_night_thrasher.sql';
import m0003 from './0003_conscious_thunderbird.sql';

  export default {
    journal,
    migrations: {
      m0000,
m0001,
m0002,
m0003
    }
  }
  