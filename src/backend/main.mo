import List "mo:core/List";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import Order "mo:core/Order";
import Text "mo:core/Text";
import Runtime "mo:core/Runtime";

actor {
  type Service =
    { #jobPlacement; #studyAbroad; #shortTermCourses; #ieltsTraining; #onlineCourses };

  type Enquiry = {
    id : Principal;
    fullName : Text;
    phone : Text;
    email : Text;
    service : Service;
    country : Text;
    message : Text;
    timestamp : Time.Time;
  };

  let enquiries = List.empty<Enquiry>();
  let subscribers = List.empty<Text>();

  module Enquiry {
    public func compareByTimestamp(e1 : Enquiry, e2 : Enquiry) : Order.Order {
      if (e1.timestamp < e2.timestamp) { #less } else if (e1.timestamp > e2.timestamp) {
        #greater;
      } else {
        #equal;
      };
    };
  };

  public query ({ caller }) func getAllEnquiries() : async [Enquiry] {
    enquiries.toArray();
  };

  public query ({ caller }) func getAllEnquiriesSortedByTimestamp() : async [Enquiry] {
    enquiries.toArray().sort(Enquiry.compareByTimestamp);
  };

  public query ({ caller }) func getAllSubscribers() : async [Text] {
    subscribers.toArray();
  };

  public shared ({ caller }) func submitEnquiry(
    fullName : Text,
    phone : Text,
    email : Text,
    service : Service,
    country : Text,
    message : Text,
  ) : async Principal {
    let enquiry : Enquiry = {
      id = caller;
      fullName;
      phone;
      email;
      service;
      country;
      message;
      timestamp = Time.now();
    };

    enquiries.add(enquiry);
    caller;
  };

  public shared ({ caller }) func addSubscriber(email : Text) : async () {
    if (subscribers.any(func(existingEmail) { existingEmail == email })) {
      Runtime.trap("This email is already subscribed");
    };
    subscribers.add(email);
  };
};
