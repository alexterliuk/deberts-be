import cardsOnTable from '@alexterliuk/cards-on-table';
import { debertsData, playerQty } from './data';

const deberts = {
  cardsOnTable,
  table: cardsOnTable.createTable(debertsData, playerQty),
};

export default deberts;
