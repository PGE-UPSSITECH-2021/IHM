import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, deleteUser } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
import { collection, addDoc, getDoc, doc, setDoc } from "firebase/firestore";

export default class FireAuth {

    constructor() {
        this.firebaseConfig = {
            apiKey: "AIzaSyCnN2mXM7_k09SGf8bXskUerwhdw9xgfeA",
            authDomain: "pge2021-c1a2d.firebaseapp.com",
            projectId: "pge2021-c1a2d",
            storageBucket: "pge2021-c1a2d.appspot.com",
            messagingSenderId: "458502220457",
            appId: "1:458502220457:web:1fc7c51838ce259b7997b8",
            measurementId: "G-K23WCFN1DE"

        };

        this.app = initializeApp(this.firebaseConfig);
        this.db = getFirestore();
    }

    

    async register(email, password, type) {
        const auth = getAuth();
        var result;
        await createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                // Signed in 
                const user = userCredential.user;
                //Ajout du type d'utilisateur (admin/user/maintenance)
                //try {
                //    console.log("TRY");
                    await setDoc(doc(this.db, "users", user.uid), {
                        type: type
                    })
                        .then((value) => {
                            console.log("REUSSI");
                            result = "success"; //Insription effecut�e avec succ�s
                        })
                        .catch((error) => {
                            console.log("ERROR");
                            result = "error-adding-doc"; //Retour d'un message d'erreur pour r�cup�rer et faire un retour � l'utilisateur
                            //Suppression du compte nouvellement cr�� pour que l'utilisateur puisse recommencer
                            deleteUser(user).catch((error) => {
                                //Erreur lors de la suppression, indiquez de supprimer le compte puis le recr�er
                                result = "error-delete-user";
                            });
                        });
                    
                //} catch (e) {
                    
                //}
            })
            .catch((error) => {
                result = error.code; /* Retour du code erreur :  - auth/weak-password = mot de passe trop faible
                                                                 - auth/network-request-failed = probl�me de connexion internet
                                                                 - auth/email-already-exists = email d�j� utilis�
                                     */        
              
            });

        return Promise.resolve(result);

    }

    async signIn(email, password) {

        const auth = getAuth();
        var type;
        await signInWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                // Signed in 
                const user = userCredential.user;
                const docSnapshot = await getDoc(doc(this.db, "users", user.uid));
                if (!docSnapshot.exists) {
                    type = "Utilisateur"; //Si le document associ� � l'user a �t� effac�, on le connecte en user par d�fault. Pour lui attribuer d'autres droits, supprimer son compte via
                                   //admin puis en recr�er un avec droits souhait�s
                }
                else {
                    type = docSnapshot.data().type; //admin/user/maintenance
                }

            })
            .catch((error) => {
                type = error.code;/* code erreur :   - auth/wrong-password = mot de passe erron�
                                                     - auth/network-request-failed = probl�me de connexion internet
                                                     - auth/user-not-found = aucun utilisateur pour cet email
                                                     - auth/invalid-email = email pas au bon format
                                     */
            });
        return Promise.resolve(type);

    }

    async signOut() {

        const auth = getAuth();
        var result;
        await signOut(auth).then(() => {
            //Success
            result = true;
        }).catch((error) => {
            // Error
            result = false;
        });
        return Promise.resolve(result);

    }

    async deleteAccount(email) {
        const auth = getAuth();
        var result;
        auth.getUserByEmail(email).then((userRecord) => {
            deleteUser(userRecord)
                .then(() => {
                    result = "success";
                })
                .catch((error) => {
                    result = error.code; /*Erreurs possibles : - auth/network-request-failed = probl�me de connexion internet*/
            });
        })
            .catch((error) => {
                result = error.code;/*Erreurs possibles : - auth/network-request-failed = probl�me de connexion internet
                                                          - auth/user-not-found = aucun utilisateur pour cette adresse email */

        });
        return Promise.resolve(result);


    }

    async resetPassword() {
        const auth = getAuth();
        

    }

    async changeEmail(newEmail) {
        const auth = getAuth();


    }

    async changePassword(newPassword) {

    }




}