import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";




@Injectable()
export class ClaimerModel {
  claimer_name: string;
  claimer_email: string;
  claimer_note: string;
  claimed_item: OfferModel;
  item_quantity: number;


  constructor(claimer_name: string = "", claimer_email: string = "", claimer_note: string ="", claimed_item: OfferModel=new OfferModel(), item_quantity: number=0) {
    this.claimer_name = claimer_name;
    this.claimer_email = claimer_email;
    this.claimer_note = claimer_note;
    this.claimed_item = claimed_item;
    this.item_quantity = item_quantity;

  }

}


@Injectable()
export class OfferModel {
  donor_name: string;
  donor_email: string;
  item_name: string;
  item_quantity: number;
  item_details: string;

  constructor(donor_name: string = "", donor_email: string = "", item_name: string ="", item_details: string="", item_quantity: number=0) {
    this.donor_name = donor_name;
    this.donor_email = donor_email;
    this.item_name = item_name;
    this.item_details = item_details;
    this.item_quantity = item_quantity;

  }

}

@Injectable()
export class DataManagerService {

  constructor(private _http: HttpClient) { }


  //TODO: View Request
  getAllOffers() {
    //todo: update server file to contain this route, which will return a list of all active donation offers
    return this._http.get('/offers');

  }


// Done - Mike
  createDonationOffer(newOffer){
    return this._http.post('/offers', newOffer)
  }



  //TODO: Update Request
  updateOffer(offer_id, offer_data) {
    //todo: update server file to contain this route, which will attempt to update an offer with offer_data
    return this._http.put(`/donations/${offer_id}`, offer_data); //returns observable
  }

  //TODO: Claim OfferModel
  claimOffer(offer_id, requester_data) {
    //todo: update server file to contain this route, which will associate a requester's data (email) with the offer?
    return this._http.put(`/claim/${offer_id}`, requester_data);

  }




  //TODO: Delete Request
  deleteOffer(offer_id) {
    //todo: update server file route to handle deletion of offers - not sure about usage case yet
    return this._http.delete(`/delete/${offer_id}`);
  }


  getOfferById(offer_id) {
    return this._http.get(`/offers/${offer_id}`);
  }

  submitClaimRequest(offer_id) {
    console.log(`sending out claim request of offer #: ${offer_id}`,);
    return this._http.delete(`offers/${offer_id}`);
  }
}
