import type { ImageDoc } from '../../utils/models/DocInterfaces';

export type Image = Omit<ImageDoc, 'docRef'>;
