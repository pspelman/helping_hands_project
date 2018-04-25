import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class DataManagerService {

  constructor(private _http: HttpClient) { }


  //TODO: View Request
  getAllOffers() {
    //todo: update server file to contain this route, which will return a list of all active donation offers
    return this._http.get('/donations');

  }


// Done - Mike
  createDonationOffer(newStuff){
    return this._http.post('/donations', newStuff)
  }



  //TODO: Update Request
  updateOffer(offer_id, offer_data) {
    //todo: update server file to contain this route, which will attempt to update an offer with offer_data
    return this._http.put(`/donations/${offer_id}`, offer_data); //returns observable
  }

  //TODO: Claim Offer
  claimOffer(offer_id, requester_data) {
    //todo: update server file to contain this route, which will associate a requester's data (email) with the offer?
    return this._http.put(`/claim/${offer_id}`, requester_data);

  }




  //TODO: Delete Request
  deleteOffer(offer_id) {
    //todo: update server file route to handle deletion of offers - not sure about usage case yet
    return this._http.delete(`/delete/${offer_id}`);
  }


}
