/* eslint-disable @typescript-eslint/naming-convention */
import * as customPlugin from 'tailwindcss/plugin';
import {PluginAPI, PluginCreator} from 'tailwindcss/types/config';

export interface TextModel {
  fontSize: string;
  lineHeight: string;
  letterSpacing: string;
}

const HEADER_CONFIG: Record<string, TextModel> = {
  'h1': {fontSize: '22px', lineHeight: '30px', letterSpacing: '0'},
  'h2': {fontSize: '20px', lineHeight: '28px', letterSpacing: '0'},
  'h3': {fontSize: '18px', lineHeight: '26px', letterSpacing: '0'},
  'h4': {fontSize: '16px', lineHeight: '24px', letterSpacing: '0'},
  'h5': {fontSize: '14px', lineHeight: '22px', letterSpacing: '0'},
  'h6': {fontSize: '12px', lineHeight: '20px', letterSpacing: '0'}
};

const TEXT_CONFIG: Record<string, TextModel> = {
  '.label--small': {fontSize: '11px', lineHeight: '16px', letterSpacing: '0.5px'},
  '.label--medium': {fontSize: '12px', lineHeight: '16px', letterSpacing: '0.5px'},
  '.title--small': {fontSize: '14px', lineHeight: '20px', letterSpacing: '0.1px'},
  '.title--medium': {fontSize: '16px', lineHeight: '24px', letterSpacing: '0.15px'},
  '.title--large': {fontSize: '20px', lineHeight: '26px', letterSpacing: '0.1px'},
};

module.exports = customPlugin?.withOptions((): PluginCreator => (api: PluginAPI): void => {
  api.addUtilities({
    '.body--small': {fontSize: '12px', lineHeight: '16px', letterSpacing: '0.4px'},
    '.body--medium': {fontSize: '14px', lineHeight: '20px', letterSpacing: '0.25px'},
    ...TEXT_CONFIG,
    ...HEADER_CONFIG
  },{
    respectImportant: true
  });
});
