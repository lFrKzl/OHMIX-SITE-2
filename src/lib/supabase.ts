import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://afkqmefnpkndzeyrqqdc.supabase.co';
const supabaseKey = 'sb_publishable_E1n7XX2CTLVM0vAG0TbNAA_H5UZE_61';

export const supabase = createClient(supabaseUrl, supabaseKey);
