import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAraNnA8CVwBdZvVf6Ady-KVathmNQaKjg",
    authDomain: "muchas-casas-firebase999.firebaseapp.com",
    projectId: "muchas-casas-firebase999",
    storageBucket: "muchas-casas-firebase999.firebasestorage.app",
    messagingSenderId: "831568347575",
    appId: "1:831568347575:web:2346ef38426a3fb497e832",
    measurementId: "G-DQ9DF6TNRQ"
  };

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

// Referencias a elementos del DOM
const formulario = document.getElementById("formulario");           /* editar esto */
const inputfirma = document.getElementById("firma");                /* editar esto */

// Variable de servicio (ejemplo)
let variableBooleana = false;
let variableNumerica = 0;

// Escucha cambios en la colección "Estado"
const estadoRef = collection(firestore, "Estado");
onSnapshot(estadoRef, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
        if (change.type === "added" || change.type === "modified") {
            const data = change.doc.data();
            // Actualiza tus variables con los datos de Firestore
            variableBooleana = data.variableBooleana;
            variableNumerica = data.variableNumerica;
            console.log("Variables actualizadas:", variableBooleana, variableNumerica);
        }
    });
});

// Envía datos al enviar el formulario
formulario.addEventListener("submit", async (event) => {
    event.preventDefault();

    const firma = inputfirma.value;

    try {
        await addDoc(collection(firestore, "Firma"), {
            Usuarios: firma,
            variableBooleana,
            variableNumerica
        });
        // Actualiza la colección "Estado" si es necesario
        await setDoc(doc(firestore, "Estado", "tu_doc_id"), {
            variableBooleana,
            variableNumerica
        });
    } catch (error) {
        console.error("Error al agregar datos", error);
    }
});
