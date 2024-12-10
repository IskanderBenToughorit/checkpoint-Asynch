// 0. Déclaration des fonctions
async function iterateWithAsyncAwait(values) {
    for (let value of values) {
      await new Promise(resolve => setTimeout(() => {
        console.log(value);
        resolve();
      }, 1000));
    }
  }
  
  async function awaitCall() {
    try {
      let response = await new Promise((resolve, reject) => {
        setTimeout(() => {
          let success = Math.random() < 0.5; // Simulate API success or failure
          if (success) {
            resolve("Données reçues");
          } else {
            reject(new Error("Échec de l'appel API"));
          }
        }, 2000);
      });
      console.log(response);
    } catch (error) {
      console.error("Erreur lors de l'obtention des données :", error.message);
    }
  }
  
  async function chainedAsyncFunctions() {
    async function step1() {
      return new Promise(resolve => setTimeout(() => {
        console.log("Step 1");
        resolve();
      }, 1000));
    }
  
    async function step2() {
      return new Promise(resolve => setTimeout(() => {
        console.log("Step 2");
        resolve();
      }, 1000));
    }
  
    async function step3() {
      return new Promise(resolve => setTimeout(() => {
        console.log("Step 3");
        resolve();
      }, 1000));
    }
  
    await step1();
    await step2();
    await step3();
  }
  
  async function concurrentRequests() {
    try {
      let [response1, response2] = await Promise.all([
        new Promise((resolve, reject) => setTimeout(() => {
          resolve("Réponse de l'API 1");
        }, 2000)).catch(err => ({ error: err.message })),
        new Promise((resolve, reject) => setTimeout(() => {
          resolve("Réponse de l'API 2");
        }, 2000)).catch(err => ({ error: err.message }))
      ]);
      console.log("Résultats simultanés:", response1, response2);
    } catch (error) {
      console.error("Erreur lors des requêtes simultanées :", error.message);
    }
  }
  
  async function parallelCalls(urls) {
    try {
      let results = await Promise.allSettled(
        urls.map(url => fetch(url).then(res => res.json()).catch(err => ({ error: err.message })))
      );
      
      results.forEach((result, index) => {
        if (result.status === 'fulfilled') {
          console.log(`Réponse de l'API ${index + 1}:`, result.value);
        } else {
          console.error(`Erreur lors de l'appel de l'API ${index + 1}:`, result.reason);
        }
      });
    } catch (error) {
      console.error("Erreur lors des appels parallèles :", error.message);
    }
  }
  
  // 1. Appels des fonctions
  async function main() {
    // Tâche 01 : Itérer avec Async/Await
    let values = [1, 2, 3, 4, 5];
    await iterateWithAsyncAwait(values);
  
    // Tâche 02 : Attendre un appel
    await awaitCall();
  
    // Tâche 03 : Gérer les erreurs avec Async/Await
    await awaitCall(); // Réutilisation pour illustration
  
    // Tâche 04 : Chaîner Async/Await
    await chainedAsyncFunctions();
  
    // Tâche 05 : Attente de requêtes simultanées
    await concurrentRequests();
  
    // Tâche 06 : Attente des appels parallèles
    let urls = ['https://api.example.com/data1', 'https://api.example.com/data2'];
    await parallelCalls(urls);
  }
  
  // Exécution du script
  main();
  