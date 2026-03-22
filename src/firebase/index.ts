'use client';

import { firebaseConfig } from '@/firebase/config';
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';

/**
 * Global singleton instances to persist across module reloads in development.
 */
let globalApp: FirebaseApp | undefined;
let globalAuth: Auth | undefined;
let globalFirestore: Firestore | undefined;

/**
 * Inicializa o Firebase seguindo o padrão Singleton robusto.
 * Garante que apenas uma instância de cada serviço exista, mesmo durante Hot Module Replacement.
 */
export function initializeFirebase() {
  if (!globalApp) {
    const apps = getApps();
    if (apps.length > 0) {
      globalApp = apps[0];
    } else {
      try {
        // Tentativa de inicialização automática (Produção/App Hosting)
        globalApp = initializeApp();
      } catch (e) {
        // Fallback para config local (Desenvolvimento)
        globalApp = initializeApp(firebaseConfig);
      }
    }
  }

  // Garante instâncias únicas dos serviços vinculadas ao app global
  if (!globalAuth) {
    globalAuth = getAuth(globalApp);
  }

  if (!globalFirestore) {
    globalFirestore = getFirestore(globalApp);
  }

  return {
    firebaseApp: globalApp,
    auth: globalAuth,
    firestore: globalFirestore
  };
}

/**
 * Getter utilitário para obter instâncias sincronizadas a partir de um app existente.
 */
export function getSdks(app: FirebaseApp) {
  return {
    firebaseApp: app,
    auth: getAuth(app),
    firestore: getFirestore(app)
  };
}

export * from './provider';
export * from './client-provider';
export * from './firestore/use-collection';
export * from './firestore/use-doc';
export * from './non-blocking-updates';
export * from './non-blocking-login';
export * from './errors';
export * from './error-emitter';
