import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCG5Ipy3n97_Q0wuW3OIpRlFWKRorRh8Wg",
  authDomain: "n3desweb.firebaseapp.com",
  projectId: "n3desweb",
  storageBucket: "n3desweb.appspot.com",
  messagingSenderId: "506352280001",
  appId: "1:506352280001:web:085c2d8997a3e2f19b4f40",
  measurementId: "G-K4TTM7E95W",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Buscar Dados do Usuário
export const getUserData = async (uid) => {
  try {
    const userDocRef = doc(db, "users", uid);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      return userDoc.data();
    } else {
      throw new Error("Usuário não encontrado no banco de dados.");
    }
  } catch (error) {
    console.error("Erro ao buscar dados do usuário:", error.message);
    throw new Error("Não foi possível carregar os dados do usuário.");
  }
};

// Login com Google
export const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const userDocRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      await setDoc(userDocRef, {
        name: user.displayName || "Usuário",
        email: user.email,
        isAdmin: false,
        createdAt: new Date(),
      });
    }

    return user;
  } catch (error) {
    console.error("Erro ao fazer login com Google:", error.message);
    throw new Error("Falha no login com Google. Tente novamente mais tarde.");
  }
};

// Login com GitHub
export const signInWithGithub = async () => {
  try {
    const provider = new GithubAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const userDocRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      await setDoc(userDocRef, {
        name: user.displayName || "Usuário",
        email: user.email,
        isAdmin: false,
        createdAt: new Date(),
      });
    }

    return user;
  } catch (error) {
    console.error("Erro ao fazer login com GitHub:", error.message);
    throw new Error("Falha no login com GitHub. Tente novamente mais tarde.");
  }
};

// Login com E-mail/Senha
export const loginWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Erro ao fazer login com e-mail:", error.message);
    throw new Error("Falha no login. Verifique suas credenciais e tente novamente.");
  }
};

// Cadastro com E-mail/Senha
export const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await updateProfile(user, { displayName: name });

    await setDoc(doc(db, "users", user.uid), {
      name,
      email,
      isAdmin: false,
      createdAt: new Date(),
    });

    return user;
  } catch (error) {
    console.error("Erro ao registrar usuário:", error.message);
    throw new Error("Não foi possível completar o cadastro. Tente novamente.");
  }
};

// Logout
export const logout = async () => {
  try {
    return signOut(auth);
  } catch (error) {
    console.error("Erro ao fazer logout:", error.message);
    throw new Error("Falha no logout. Tente novamente mais tarde.");
  }
};
