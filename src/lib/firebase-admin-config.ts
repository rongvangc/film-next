import { initializeApp, getApps, cert } from "firebase-admin/app";

const firebaseAdminConfig = {
  credential: cert({
    projectId: "chat-f60b9",
    clientEmail: "firebase-adminsdk-qtlgy@chat-f60b9.iam.gserviceaccount.com",
    privateKey:
      "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCaqyakfWDc/Iw/\nec8Ducl/zCIjQADuPc4Pi2iVv8n/Qg6pmKYoqyCGvgS0LcJ6HzhfHX9rMhPEFNcY\nPjlH1Sw2f+6LzH2eXoHjfL5y3YEO4hQCBsm6mEf41yNGRGXItvD63FmX4n3C+Lw3\ng2SIKvwVY52nXfk/+0rDPmZetEsxbv6JYjEzrRcR3m36yDyVOG9ImY9cPLCIcvTY\ndMwgDc15ICOI4KBfzJbgOJVUA7p+2cZ61Sws7prlMPJYifrs8BaxUJ4RPz6Tt07e\nrqMHZoM3/e6czR3MYnPKNLkkgLzX7vyHyrVjNbybprOdPPSVcCV4Fy7oeyAGgAMX\nBKosikjDAgMBAAECggEAS4ELrzcJpzeeW4piNcZniHylmaGwEp2XT11V4+ypdnPP\n5pj/XFEV4tE2SKMiEi3VfhFPV4wtvAYUbuBJZDi7iatwT0y3ci1eqSgHbNmXHCXf\ncJHRvsaCNAcKUE4phg9QmpYhIpVNoXV9pHf/Br49K0/i8YZdnA9XkvKOVOMc5fcv\n+tiay+7L2dYlgnDIQln0mAkfxSCpF53hQRlhIzDhlf316LXCG/RTexNJw+/lvCdp\nDKv984E9N0IqZyGR5i6A23uYdL3V19DJCQIZCoPVn5bNXgn8hg0WO443TtVG4QRy\n8YpdL8s7xxagORlxWdQ3xHBpbR9506p7J9pu3pc9wQKBgQDKQ73Iobcb9ldebdTz\nlj70WWb6AROc4BWA2eFnmtWbOWqKf6Q8iXyLPs3mpUjQ0nfEPfOmNPvVoLlOJ9CX\ncjjXA0dauMgf/Pv/lCbiqSMrhdzogrrLUp5lhgrh+qYCwnoxNEwJbz3Pz/n2vkoM\nKPmyf5Ifmnh3Qd7DSF6tpk3tIwKBgQDDwlhGUYCEVR2/N2CVXRbjF91f1JNYpYRD\nO2BAZ2ej9GqhVBpaG/0KL9+tXlK/pdQINNrYSV1XEkTx6r23oLR0sQiA3krRLsKJ\nWHG68CjzoWr+C5wNQpzmoOJWgs4gXipeyl3JY+K1MFl8Lc8MZ8bxIxqIl0qMIPGQ\ncjk0cL3/4QKBgDnhPLPnIwELc2EASQoTmpxN4Rv1pukjbsPalZgSRMIQoh5T/Gme\nZldqd31jGv023TL5D3ome1Jclep5lkVgWEefFpItgoc029/9Q0tlXz0bJ2YZ0t5Q\nHCetPfwAv/TWNiVSc9fXT3biawNi3MmyCBI+U1Bb4dEutlJnqUBD8NTFAoGAY2YC\nJqpppEgH07kNrKnY3jSW7nrk2mUo1G6IwAsBYAnSPtqSiuCdSpfmboRvZeqQ0B3u\nZVZTM8wN//xemqfaGUpu8+hreu3QT6b+EJqzYIm85wQEF+OUAbL9WkoO2faWcw00\nM/co/TFwrpIgCL+FD5nwdhzD+IUdw2eMTmlUwGECgYBNn7PAGOi0Jb0Kp2prsKnz\nJMQdPcvAoj4/wak8sczDnpzB3FM4L+v0PxFPacLTT5qTgG+i72NQEaOS5aSNK67Z\n/aq6cWtx+TRIX+9gICdIigr7B+4jPsFlW5p6pP0aSDTBPlM0/ARVUSoVu2Oq2Nxy\nI3DiPWxrxq0qGbvEvL0C9A==\n-----END PRIVATE KEY-----\n",
  }),
};

export function customInitApp() {
  if (getApps().length <= 0) {
    initializeApp(firebaseAdminConfig);
  }
}
