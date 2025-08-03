import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase";

export interface IUser {
    email: string;
    uid: string;
    token: string | null;
}

export const registerUser = async (email: string, password: string): Promise<IUser> => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;
    const token = await firebaseUser.getIdToken();

    return {
        uid: firebaseUser.uid,
        email: firebaseUser.email || "",
        token,
    };
};
