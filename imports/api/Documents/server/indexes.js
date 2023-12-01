import createIndex from '../../../../modules/server/createIndex';
import { Documents } from '../Documents';

createIndex(Documents, { createdBy: 1 });
