import cardsOnTable from '@alexterliuk/cards-on-table';
import { debertsData, playersQty } from '../data';

const table = cardsOnTable.createTable(debertsData, playersQty);

export default table;
export { cardsOnTable }; // temporary export just for seeing lib in dev console
