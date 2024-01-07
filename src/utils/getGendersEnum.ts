import { Gender } from '../types/types';

const getGendersEnum = (genders: Gender[]): string => genders.join(' or ');

export default getGendersEnum;
