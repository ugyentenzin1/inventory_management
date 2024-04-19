import * as customPlugin from 'tailwindcss/plugin';
import {PluginAPI, PluginCreator} from 'tailwindcss/types/config';

module.exports = customPlugin?.withOptions((): PluginCreator => (api: PluginAPI): void => {
    api.addUtilities({
        '.flex-between':{display: 'flex', justifyContent: 'space-between'},
        '.flex-center': {display: 'flex', justifyContent: 'center', alignItems: 'center'},
        '.flex-end': {display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end'},
        '.flex-start-center': {display: 'flex', justifyContent: 'flex-start', alignItems: 'center'},
        '.flex-start-end': {display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-end'},
        '.flex-between-start': {display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'},
        '.flex-between-end': {display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end'},
        '.flex-between-center': {display: 'flex', justifyContent: 'space-between', alignItems: 'center'},
        '.flex-end-center': {display: 'flex', justifyContent: 'flex-end', alignItems: 'center'},
    })
})