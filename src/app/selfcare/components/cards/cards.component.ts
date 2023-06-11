import { Component, OnInit } from '@angular/core';

import { SquareService } from '../../services/square.service';

import ls from 'localstorage-slim';

import { BillingCard } from '../../interfaces/card';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {
  cards: BillingCard[] = [];

  displayedColumns: string[] = ['card_brand', 'last_4', 'exp', 'cardholder_name', 'card_type', 'created_at', 'id']

  constructor(
    private _squareService: SquareService,
  ) {}

  ngOnInit() {

    this._squareService.getCustomerCards({ id: `${ ls.get('customer_id', { decrypt: true })}` }).subscribe((result: any) => {
      this.cards = result.cards;
      console.log(result);
    });
  }

  disableCard(id: string) {
    this._squareService.disableCard({ id: id }).subscribe((result: any) => {
      console.log(result);
    });
  }

}
