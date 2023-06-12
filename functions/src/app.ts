import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as cors from "cors";
import axios from "axios";

const Auth: string = 'Bearer *******************************************************';

admin.initializeApp();
export const getSquareMerchants = functions.https.onRequest((request, response) => {
  cors({
    origin: '*',
  })(request, response, () => {

    functions.logger.info("Square API Logs...", {structuredData: true});

    axios({
      url: 'https://connect.squareupsandbox.com/v2/merchants',
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": Auth,
      },

    }).then((axiosResponse) => {
      const res = JSON.stringify(axiosResponse.data);
      response.status(200).send(res);
    });
  });
});

export const getSquareLocations = functions.https.onRequest((request, response) => {
  cors({
    origin: '*',
  })(request, response, () => {

    functions.logger.info("Square API Logs...", {structuredData: true});

    axios({
      url: 'https://connect.squareupsandbox.com/v2/locations',
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": Auth,
      },

    }).then((axiosResponse) => {
      const res = JSON.stringify(axiosResponse.data);
      response.status(200).send(res);
    });
  });
});

export const getSquareCatalog = functions.https.onRequest((request, response) => {
  cors({
    origin: '*',
  })(request, response, () => {

    functions.logger.info("Square API Logs...", {structuredData: true});

    axios({
      url: 'https://connect.squareupsandbox.com/v2/catalog/list',
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": Auth,
      },

    }).then((axiosResponse) => {
      const res = JSON.stringify(axiosResponse.data);
      response.status(200).send(res);
    });
  });
});

export const newSquareCatalog = functions.https.onRequest((request, response) => {
  cors({
    origin: '*',
  })(request, response, () => {

    functions.logger.info("Square API Logs...", {structuredData: true});

    axios({
      url: 'https://connect.squareupsandbox.com/v2/catalog/object/',
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": Auth,
      },
      data: request.body,

    }).then((axiosResponse) => {
      const res = JSON.stringify(axiosResponse.data);
      response.status(200).send(res);
    });
  });
});

export const newSquareLocation = functions.https.onRequest((request, response) => {
  cors({
    origin: '*',
  })(request, response, () => {

    functions.logger.info("Square API Logs...", {structuredData: true});

    axios({
      url: 'https://connect.squareupsandbox.com/v2/location/',
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": Auth,
      },
      data: request.body,

    }).then((axiosResponse) => {
      const res = JSON.stringify(axiosResponse.data);
      response.status(200).send(res);
    });
  });
});

export const getSquareLocation = functions.https.onRequest((request, response) => {
  cors({
    origin: '*',
  })(request, response, () => {

    functions.logger.info("Square API Logs...", {structuredData: true});

    axios({
      url: `https://connect.squareupsandbox.com/v2/locations/${ request.body.id }`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": Auth,
      },

    }).then((axiosResponse) => {
      const res = JSON.stringify(axiosResponse.data);
      response.status(200).send(res);
    });
  });
});


export const editSquareLocation = functions.https.onRequest((request, response) => {
  cors({
    origin: '*',
  })(request, response, () => {

    functions.logger.info("Square API Logs...", {structuredData: true});

    axios({
      url: `https://connect.squareupsandbox.com/v2/location/${ request.body.id }`,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": Auth,
      },
      data: request.body,

    }).then((axiosResponse) => {
      const res = JSON.stringify(axiosResponse.data);
      response.status(200).send(res);
    });
  });
});

export const newSquareCustomer = functions.https.onRequest((request, response) => {
  cors({
    origin: '*',
  })(request, response, () => {

    functions.logger.info("Square API Logs...", {structuredData: true});

    axios({
      url: 'https://connect.squareupsandbox.com/v2/customers/',
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": Auth,
      },
      data: request.body,

    }).then((axiosResponse) => {
      const res = JSON.stringify(axiosResponse.data);
      response.status(200).send(res);
    });
  });
});


export const getSquareMainLocation = functions.https.onRequest((request, response) => {
  cors({
    origin: '*',
  })(request, response, () => {

    functions.logger.info("Square API Logs...", {structuredData: true});

    axios({
      url: 'https://connect.squareupsandbox.com/v2/locations/main',
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": Auth,
      },

    }).then((axiosResponse) => {
      const res = JSON.stringify(axiosResponse.data);
      response.status(200).send(res);
    });
  });
});


export const getSquareCustomerByEmail = functions.https.onRequest((request, response) => {
  cors({
    origin: '*',
  })(request, response, () => {

    functions.logger.info("Square API Logs...", {structuredData: true});

    axios({
      url: 'https://connect.squareupsandbox.com/v2/customers/search/',
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": Auth,
      },
      data: request.body,

    }).then((axiosResponse) => {
      const res = JSON.stringify(axiosResponse.data);
      response.status(200).send(res);
    });
  });
});

export const getSquareCatalogObjectByID = functions.https.onRequest((request, response) => {
  cors({
    origin: '*',
  })(request, response, () => {
    functions.logger.info("Square API Logs...", {structuredData: true});


    axios({
      url: `https://connect.squareupsandbox.com/v2/catalog/object/${ request.body.id }?include_related_objects=true`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": Auth,
      },

    }).then((axiosResponse) => {
      const res = JSON.stringify(axiosResponse.data);
      response.status(200).send(res);
    });
  });
});


export const newSquareOnlineSubscriptionCheckout = functions.https.onRequest((request, response) => {
  cors({
    origin: '*',
  })(request, response, () => {

    functions.logger.info("Square API Logs...", {structuredData: true});

    axios({
      url: 'https://connect.squareupsandbox.com/v2/online-checkout/payment-links/',
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": Auth,
      },
      data: request.body,

    }).then((axiosResponse) => {
      const res = JSON.stringify(axiosResponse.data);
      response.status(200).send(res);
    })
  });
});

export const newSquareSubscription = functions.https.onRequest((request, response) => {
  cors({
    origin: '*',
  })(request, response, () => {

    functions.logger.info("Square API Logs...", {structuredData: true});

    axios({
      url: 'https://connect.squareupsandbox.com/v2/subscriptions/',
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": Auth,
      },
      data: request.body,

    }).then((axiosResponse) => {
      const res = JSON.stringify(axiosResponse.data);
      response.status(200).send(res);
    });
  });
});

export const newSquareCard = functions.https.onRequest((request, response) => {
  cors({
    origin: '*',
  })(request, response, () => {

    functions.logger.info("Square API Logs...", {structuredData: true});

    axios({
      url: 'https://connect.squareupsandbox.com/v2/cards',
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": Auth,
      },
      data: request.body,

    }).then((axiosResponse) => {
      const res = JSON.stringify(axiosResponse.data);
      response.status(200).send(res);
    });
  });
});

export const getSquareCards = functions.https.onRequest((request, response) => {
  cors({
    origin: '*',
  })(request, response, () => {

    functions.logger.info("Square API Logs...", {structuredData: true});

    axios({
      url: `https://connect.squareupsandbox.com/v2/cards?customer_id=${ request.body.id }`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": Auth,
      },

    }).then((axiosResponse) => {
      const res = JSON.stringify(axiosResponse.data);
      response.status(200).send(res);
    });
  });
});


export const getSquareCard = functions.https.onRequest((request, response) => {
  cors({
    origin: '*',
  })(request, response, () => {

    functions.logger.info("Square API Logs...", {structuredData: true});

    axios({
      url: `https://connect.squareupsandbox.com/v2/cards/${ request.body.id }`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": Auth,
      },

    }).then((axiosResponse) => {
      const res = JSON.stringify(axiosResponse.data);
      response.status(200).send(res);
    });
  });
});

export const disableSquareCard = functions.https.onRequest((request, response) => {
  cors({
    origin: '*',
  })(request, response, () => {

    functions.logger.info("Square API Logs...", {structuredData: true});

    axios({
      url: `https://connect.squareupsandbox.com/v2/cards/${ request.body.id }/disable/`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": Auth,
      },

    }).then((axiosResponse) => {
      const res = JSON.stringify(axiosResponse.data);
      response.status(200).send(res);
    });
  });
});



export const newSquareOrder = functions.https.onRequest((request, response) => {
  cors({
    origin: '*',
  })(request, response, () => {

    functions.logger.info("Square API Logs...", {structuredData: true});

    axios({
      url: 'https://connect.squareupsandbox.com/v2/orders/',
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": Auth,
      },
      data: request.body,

    }).then((axiosResponse) => {
      const res = JSON.stringify(axiosResponse.data);
      response.status(200).send(res);
    });
  });
});

export const newSquareInvoice = functions.https.onRequest((request, response) => {
  cors({
    origin: '*',
  })(request, response, () => {

    functions.logger.info("Square API Logs...", {structuredData: true});

    axios({
      url: 'https://connect.squareupsandbox.com/v2/invoices/',
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": Auth,
      },
      data: request.body,

    }).then((axiosResponse) => {
      const res = JSON.stringify(axiosResponse.data);
      response.status(200).send(res);
    });
  });
});

export const getSquareInvoices = functions.https.onRequest((request, response) => {
  cors({
    origin: '*',
  })(request, response, () => {

    functions.logger.info("Square API Logs...", {structuredData: true});

    axios({
      url: `https://connect.squareupsandbox.com/v2/invoices?location_id=${ request.body.id }`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": Auth,
      }

    }).then((axiosResponse) => {
      const res = JSON.stringify(axiosResponse.data);
      response.status(200).send(res);
    });
  });
});

export const payment = functions.https.onRequest((request, response) => {
  cors({
    origin: '*',
  })(request, response, () => {

    functions.logger.info("Square API Logs...", {structuredData: true});

    axios({
      url: 'https://connect.squareupsandbox.com/v2/payments/',
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": Auth,
      },
      data: request.body,

    }).then((axiosResponse) => {
      const res = JSON.stringify(axiosResponse.data);
      response.status(200).send(res);
    });
  });
});

export const newSquarePayment = functions.https.onRequest((request, response) => {
  cors({
    origin: '*',
  })(request, response, () => {

    functions.logger.info("Square API Logs...", {structuredData: true});

    axios({
      url: 'https://connect.squareupsandbox.com/v2/payments/',
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": Auth,
      },
      data: request.body,

    }).then((axiosResponse) => {
      const res = JSON.stringify(axiosResponse.data);
      response.status(200).send(res);
    });
  });
});

export const getSquareUsers = functions.https.onRequest((request, response) => {
  cors({
    origin: '*',
  })(request, response, () => {

    functions.logger.info("Square API Logs...", {structuredData: true});

    axios({
      url: 'https://connect.squareupsandbox.com/v2/customers?sort_field=CREATED_AT&sort_order=DESC',
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": Auth,
      },
      data: request.body,

    }).then((axiosResponse) => {
      const res = JSON.stringify(axiosResponse.data);
      response.status(200).send(res);
    });
  });
});

export const getSquareUser = functions.https.onRequest((request, response) => {
  cors({
    origin: '*',
  })(request, response, () => {

    functions.logger.info("Square API Logs...", {structuredData: true});

    axios({
      url: `https://connect.squareupsandbox.com/v2/customers/${ request.body.id }`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": Auth,
      },

    }).then((axiosResponse) => {
      const res = JSON.stringify(axiosResponse.data);
      response.status(200).send(res);
    });
  });
});


export const updateSquareUser = functions.https.onRequest((request, response) => {
  cors({
    origin: '*',
  })(request, response, () => {

    functions.logger.info("Square API Logs...", {structuredData: true});

    axios({
      url: `https://connect.squareupsandbox.com/v2/customers/${ request.body.id }`,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": Auth,
      },
      data: request.body,

    }).then((axiosResponse) => {
      const res = JSON.stringify(axiosResponse.data);
      response.status(200).send(res);
    });
  });
});

export const deleteSquareUser = functions.https.onRequest((request, response) => {
  cors({
    origin: '*',
  })(request, response, () => {

    functions.logger.info("Square API Logs...", {structuredData: true});

    axios({
      url: `https://connect.squareupsandbox.com/v2/customers/${ request.body.id }`,
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": Auth,
      }
    }).then((axiosResponse) => {
      const res = JSON.stringify(axiosResponse.data);
      response.status(200).send(res);
    });
  });
});


export const getSquareSubscriptions = functions.https.onRequest((request, response) => {
  cors({
    origin: '*',
  })(request, response, () => {

    functions.logger.info("Square API Logs...", {structuredData: true});

    axios({
      url: 'https://connect.squareupsandbox.com/v2/invoices/search/',
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": Auth,
      },
      data: request.body,

    }).then((axiosResponse) => {
      const res = JSON.stringify(axiosResponse.data);
      response.status(200).send(res);
    });
  });
});

export const updateSquareLocation = functions.https.onRequest((request, response) => {
  cors({
    origin: '*',
  })(request, response, () => {

    functions.logger.info("Square API Logs...", {structuredData: true});

    axios({
      url: `https://connect.squareupsandbox.com/v2/locations/${ request.body.id}`,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": Auth,
      },
      data: request.body.data,

    }).then((axiosResponse) => {
      const res = JSON.stringify(axiosResponse.data);
      response.status(200).send(res);
    });
  });
});

export const pauseSquareSubscription = functions.https.onRequest((request, response) => {
  cors({
    origin: '*',
  })(request, response, () => {

    functions.logger.info("Square API Logs...", {structuredData: true});

    axios({
      url: `https://connect.squareupsandbox.com/v2/subscriptions/${ request.body.subscription_id}/pause/`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": Auth,
      },
      data: request.body.dataSet,

    }).then((axiosResponse) => {
      const res = JSON.stringify(axiosResponse.data);
      response.status(200).send(res);
    });
  });
});

export const cancelSquareSubscription = functions.https.onRequest((request, response) => {
  cors({
    origin: '*',
  })(request, response, () => {

    functions.logger.info("Square API Logs...", {structuredData: true});

    axios({
      url: `https://connect.squareupsandbox.com/v2/subscriptions/${ request.body.subscription_id }/cancel/`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": Auth,
      },
      data: request.body.dataSet,

    }).then((axiosResponse) => {
      const res = JSON.stringify(axiosResponse.data);
      response.status(200).send(res);
    });
  });
});

export const resumeSquareSubscription = functions.https.onRequest((request, response) => {
  cors({
    origin: '*',
  })(request, response, () => {

    functions.logger.info("Square API Logs...", {structuredData: true});

    axios({
      url: `https://connect.squareupsandbox.com/v2/subscriptions/${ request.body.subscription_id }/resume/`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": Auth,
      },
      data: request.body.data,

    }).then((axiosResponse) => {
      const res = JSON.stringify(axiosResponse.data);
      response.status(200).send(res);
    });
  });
});

export const getSquareSubscriptionByID = functions.https.onRequest((request, response) => {
  cors({
    origin: '*',
  })(request, response, () => {

    functions.logger.info("Square API Logs...", {structuredData: true});

    axios({
      url: `https://connect.squareupsandbox.com/v2/subscriptions/${ request.body.id }`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": Auth,
      },

    }).then((axiosResponse) => {
      const res = JSON.stringify(axiosResponse.data);
      response.status(200).send(res);
    });
  });
});




const pangeaAuth: string = 'Bearer *************************************';

export const startPangeaAuthFlowStart = functions.https.onRequest((request, response) => {
  cors({
    origin: '*',
  })(request, response, () => {
    functions.logger.info("Pangea API Logs...", {structuredData: true});

    axios({
      url: 'https://authn.gcp.us.pangea.cloud/v1/flow/start',
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": pangeaAuth,
      },
      data: {
        flow_types:["signup","signin"],
        cb_uri:"/selfcare",
        email:`${ request.body.email }`
      }

    }).then((axiosResponse) => {
      const res: any = JSON.stringify(axiosResponse.data);

      response.status(200).send(res);
    });
  });
});


export const newPangeaUser = functions.https.onRequest((request, response) => {
  cors({
    origin: '*',
  })(request, response, () => {
    functions.logger.info("Pangea API Logs...", { structuredData: true });

    axios({
      url: 'https://authn.gcp.us.pangea.cloud/v1/user/create',
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": pangeaAuth,
      },
      data: {
        email: request.body.email,
        authenticator: request.body.password
      }

    }).then((axiosResponse) => {
      const res: any = JSON.stringify(axiosResponse.data);
      response.status(200).send(res);
    });
  });
});

export const pangeaUpdateUser = functions.https.onRequest((request, response) => {
  cors({
    origin: '*',
  })(request, response, () => {
    functions.logger.info("Pangea API Logs...", { structuredData: true });

    axios({
      url: 'https://authn.gcp.us.pangea.cloud/v1/user/profile/update',
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": pangeaAuth,
      },
      data: {
        email: request.body.email,
        profile: {
          first_name: request.body.first_name,
          last_name: request.body.last_name,
        }
      }

    }).then((axiosResponse) => {
      const res: any = JSON.stringify(axiosResponse.data);

      response.status(200).send(res);
    });
  });
});

export const pangeaVerifyUser = functions.https.onRequest((request, response) => {
  cors({
    origin: '*',
  })(request, response, () => {
    functions.logger.info("Pangea API Logs...", { structuredData: true });

    axios({
      url: 'https://authn.gcp.us.pangea.cloud/v1/user/verify',
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": pangeaAuth,
      },
      data: {
        id_provider:"password",
        email: request.body.email,
        authenticator: request.body.password
      }

    }).then((axiosResponse) => {
      const res: any = JSON.stringify(axiosResponse.data);

      response.status(200).send(res);
    });
  });
});

export const pangeaVerifyEmail = functions.https.onRequest((request, response) => {
  cors({
    origin: '*',
  })(request, response, () => {
    functions.logger.info("Pangea API Logs...", { structuredData: true });

    axios({
      url: 'https://authn.gcp.us.pangea.cloud/v1/flow/verify/email',
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": pangeaAuth,
      },
      data: {
        flow_id: request.body.flow_id
      }

    }).then((axiosResponse) => {
      const res: any = JSON.stringify(axiosResponse.data);

      response.status(200).send(res);
    });
  });
});

export const pangeaVerifyPassword = functions.https.onRequest((request, response) => {
  cors({
    origin: '*',
  })(request, response, () => {
    functions.logger.info("Pangea API Logs...", { structuredData: true });

    axios({
      url: 'https://authn.gcp.us.pangea.cloud/v1/flow/verify/password',
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": pangeaAuth,
      },
      data: {
        flow_id: request.body.flow_id,
        password: request.body.password
      }

    }).then((axiosResponse) => {
      const res: any = JSON.stringify(axiosResponse.data);

      response.status(200).send(res);
    });
  });
});

export const pangeaStartMFAEnrollment = functions.https.onRequest((request, response) => {
  cors({
    origin: '*',
  })(request, response, () => {
    functions.logger.info("Pangea API Logs...", { structuredData: true });

    axios({
      url: 'https://authn.gcp.us.pangea.cloud/v1/flow/enroll/mfa/start',
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": pangeaAuth,
      },
      data: {
        flow_id: request.body.flow_id,
        mfa_provider: 'email_otp',
      }

    }).then((axiosResponse) => {
      const res: any = JSON.stringify(axiosResponse.data);

      response.status(200).send(res);
    });
  });
});

export const pangeaStartMFAVerification = functions.https.onRequest((request, response) => {
  cors({
    origin: '*',
  })(request, response, () => {
    functions.logger.info("Pangea API Logs...", { structuredData: true });

    axios({
      url: 'https://authn.gcp.us.pangea.cloud/v1/flow/verify/mfa/start',
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": pangeaAuth,
      },
      data: {
        mfa_provider: 'email_otp',
        flow_id: request.body.flow_id
      }

    }).then((axiosResponse) => {
      const res: any = JSON.stringify(axiosResponse.data);

      response.status(200).send(res);
    });
  });
});

export const pangeaCompleteMFAEnrollment = functions.https.onRequest((request, response) => {
  cors({
    origin: '*',
  })(request, response, () => {
    functions.logger.info("Pangea API Logs...", { structuredData: true });

    axios({
      url: 'https://authn.gcp.us.pangea.cloud/v1/flow/enroll/mfa/complete',
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": pangeaAuth,
      },
      data: {
        flow_id: request.body.flow_id,
        code: request.body.otp_code
      }

    }).then((axiosResponse) => {
      const res: any = JSON.stringify(axiosResponse.data);

      response.status(200).send(res);
    });
  });
});

export const pangeaGetFlowState = functions.https.onRequest((request, response) => {
  cors({
    origin: '*',
  })(request, response, () => {
    functions.logger.info("Pangea API Logs...", { structuredData: true });

    axios({
      url: 'https://authn.gcp.us.pangea.cloud/v1/flow/get',
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": pangeaAuth,
      },
      data: {
        flow_id: request.body.flow_id,
        code: request.body.otp_code
      }

    }).then((axiosResponse) => {
      const res: any = JSON.stringify(axiosResponse.data);

      response.status(200).send(res);
    });
  });
});


export const pangeaVerifyMFAComplete = functions.https.onRequest((request, response) => {
  cors({
    origin: '*',
  })(request, response, () => {
    functions.logger.info("Pangea API Logs...", { structuredData: true });

    axios({
      url: 'https://authn.gcp.us.pangea.cloud/v1/flow/verify/mfa/complete',
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": pangeaAuth,
      },
      data: {
        flow_id: request.body.flow_id,
        code: request.body.otp_code
      }

    }).then((axiosResponse) => {
      const res: any = JSON.stringify(axiosResponse.data);

      response.status(200).send(res);
    });
  });
});



export const pangeaFlowComplete = functions.https.onRequest((request, response) => {
  cors({
    origin: '*',
  })(request, response, () => {
    functions.logger.info("Pangea API Logs...", { structuredData: true });

    axios({
      url: 'https://authn.gcp.us.pangea.cloud/v1/flow/complete',
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": pangeaAuth,
      },
      data: {
        flow_id: request.body.flow_id,
      }

    }).then((axiosResponse) => {
      const res: any = JSON.stringify(axiosResponse.data);

      response.status(200).send(res);
    });
  });
});


export const pangeaLoginWithPassword = functions.https.onRequest((request, response) => {
  cors({
    origin: '*',
  })(request, response, () => {
    functions.logger.info("Pangea API Logs...", { structuredData: true });

    axios({
      url: 'https://authn.gcp.us.pangea.cloud/v1/user/login/password',
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": pangeaAuth,
      },
      data: {
        email: request.body.data.email,
        password: request.body.data.password,
      }

    }).then((axiosResponse) => {
      const res: any = JSON.stringify(axiosResponse.data);

      response.status(200).send(res);
    });
  });
});

export const pangeaPasswordReset = functions.https.onRequest((request, response) => {
  cors({
    origin: '*',
  })(request, response, () => {
    functions.logger.info("Pangea API Logs...", { structuredData: true });

    axios({
      url: 'https://authn.gcp.us.pangea.cloud/v1/flow/reset/password',
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": pangeaAuth,
      },
      data: {
        flow_id: request.body.data.flow_id,
        password: request.body.data.password
      }

    }).then((axiosResponse) => {
      const res: any = JSON.stringify(axiosResponse.data);

      response.status(200).send(res);
    });
  });
});

export const pangeaAuditLog = functions.https.onRequest((request, response) => {
  cors({
    origin: '*',
  })(request, response, () => {
    functions.logger.info("Pangea API Logs...", { structuredData: true });

    axios({
      url: 'https://audit.gcp.us.pangea.cloud/v1/log',
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": 'Bearer *******************************************',
      },
      data: {
        event: {
          message: request.body.data.message
        }
      }

    }).then((axiosResponse) => {
      const res: any = JSON.stringify(axiosResponse.data);

      response.status(200).send(res);
    });
  });
});

export const pangeaCheckEmailBreach = functions.https.onRequest((request, response) => {
  cors({
    origin: '*',
  })(request, response, () => {
    functions.logger.info("Pangea API Logs...", { structuredData: true });

    axios({
      url: 'https://user-intel.gcp.us.pangea.cloud/v1/user/breached',
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": 'Bearer ******************************************',
      },
      data: {
        provider: "spycloud",
        email: request.body.data.email
      }

    }).then((axiosResponse) => {
      const res: any = JSON.stringify(axiosResponse.data);

      response.status(200).send(res);
    });
  });
});

export const pangeaLogoutUser = functions.https.onRequest((request, response) => {
  cors({
    origin: '*',
  })(request, response, () => {
    functions.logger.info("Pangea API Logs...", { structuredData: true });

    axios({
      url: 'https://authn.gcp.us.pangea.cloud/v1/client/session/logout',
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": pangeaAuth,
      },
      data: {
        token: request.body.data.token
      }

    }).then((axiosResponse) => {
      const res: any = JSON.stringify(axiosResponse.data);

      response.status(200).send(res);
    });
  });
});

export const pangeaUpdateUserPassword = functions.https.onRequest((request, response) => {
  cors({
    origin: '*',
  })(request, response, () => {
    functions.logger.info("Pangea API Logs...", { structuredData: true });

    axios({
      url: 'https://authn.gcp.us.pangea.cloud/v1/client/password/change',
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": pangeaAuth,
      },
      data: {
        token: request.body.data.token,
        old_password: request.body.data.old_password,
        new_password: request.body.data.new_password
      }

    }).then((axiosResponse) => {
      const res: any = JSON.stringify(axiosResponse.data);

      response.status(200).send(res);
    });
  });
});



