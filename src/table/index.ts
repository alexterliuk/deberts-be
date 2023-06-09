import cardsOnTable from '@alexterliuk/cards-on-table';
import { DEBERTS_DATA, PLAYERS_QTY } from '../data';

const table = cardsOnTable.createTable(DEBERTS_DATA, PLAYERS_QTY);

export default table;
export { cardsOnTable }; // temporary export just for seeing lib in dev console
