export interface Order {
  reference_id: string;
  location_id: string;
  line_items: [
        {
          name: string;
          quantity: number;
          base_price_money: {
            amount: number;
            currency: string;
          }
        },
        {
          quantity: number;
          catalog_object_id: string;
          modifiers: [
            {
              catalog_object_id: string;
            }
          ];
          applied_discounts: [
            {
              discount_uid: string;
            }
          ]
        }
      ],
      taxes: [
        {
          uid: string;
          name: string;
          percentage: number;
          scope: string;
        }
      ],
      discounts: [
        {
          uid: string;
          name: string;
          percentage: number;
          scope: string;
        },
        {
          uid: string;
          catalog_object_id: string;
          scope: string;
        },
        {
          uid: string;
          name: string;
          amount_money: {
            amount: 100;
            currency:string;
          };
          scope: string;
        }
      ]


}
