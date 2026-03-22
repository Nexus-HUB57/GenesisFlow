'use client';

import {
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  CollectionReference,
  DocumentReference,
  SetOptions,
} from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

/**
 * Removes undefined properties and handles non-plain objects to prevent Firestore assertion errors.
 * Firestore does not allow undefined values and they can cause internal assertion errors.
 */
function sanitizeData(data: any): any {
  if (data === null || typeof data !== 'object') {
    return data;
  }

  if (data instanceof Date) {
    return data.toISOString();
  }

  if (Array.isArray(data)) {
    return data.map(sanitizeData);
  }

  // Handle plain objects
  const sanitized: any = {};
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      const value = data[key];
      // Explicitly skip undefined
      if (value !== undefined) {
        sanitized[key] = sanitizeData(value);
      }
    }
  }
  return sanitized;
}

/**
 * Initiates a setDoc operation for a document reference.
 * Does NOT await the write operation internally.
 */
export function setDocumentNonBlocking(docRef: DocumentReference, data: any, options?: SetOptions) {
  const cleanData = sanitizeData(data);

  // Safety check for docRef validity
  if (!docRef) {
    console.error('[FIREBASE_UPDATE]: Attempted to set document with null reference.');
    return;
  }

  setDoc(docRef, cleanData, options || {}).catch(error => {
    // If it's a permission error, emit contextual error for debugging
    if (error.code === 'permission-denied') {
      const permissionError = new FirestorePermissionError({
        path: docRef.path,
        operation: options && 'merge' in options ? 'update' : 'create',
        requestResourceData: cleanData,
      });
      errorEmitter.emit('permission-error', permissionError);
    } else {
      console.error('[FIREBASE_UPDATE_ERROR]:', error);
    }
  });
}


/**
 * Initiates an addDoc operation for a collection reference.
 * Does NOT await the write operation internally.
 */
export function addDocumentNonBlocking(colRef: CollectionReference, data: any) {
  const cleanData = sanitizeData(data);

  if (!colRef) {
    console.error('[FIREBASE_UPDATE]: Attempted to add document to null collection.');
    return;
  }

  addDoc(colRef, cleanData).catch(error => {
    if (error.code === 'permission-denied') {
      const permissionError = new FirestorePermissionError({
        path: colRef.path,
        operation: 'create',
        requestResourceData: cleanData,
      });
      errorEmitter.emit('permission-error', permissionError);
    } else {
      console.error('[FIREBASE_UPDATE_ERROR]:', error);
    }
  });
}


/**
 * Initiates an updateDoc operation for a document reference.
 * Does NOT await the write operation internally.
 */
export function updateDocumentNonBlocking(docRef: DocumentReference, data: any) {
  const cleanData = sanitizeData(data);

  if (!docRef) {
    console.error('[FIREBASE_UPDATE]: Attempted to update document with null reference.');
    return;
  }

  updateDoc(docRef, cleanData).catch(error => {
    if (error.code === 'permission-denied') {
      const permissionError = new FirestorePermissionError({
        path: docRef.path,
        operation: 'update',
        requestResourceData: cleanData,
      });
      errorEmitter.emit('permission-error', permissionError);
    } else {
      console.error('[FIREBASE_UPDATE_ERROR]:', error);
    }
  });
}


/**
 * Initiates a deleteDoc operation for a document reference.
 * Does NOT await the write operation internally.
 */
export function deleteDocumentNonBlocking(docRef: DocumentReference) {
  if (!docRef) {
    console.error('[FIREBASE_UPDATE]: Attempted to delete document with null reference.');
    return;
  }

  deleteDoc(docRef).catch(error => {
    if (error.code === 'permission-denied') {
      const permissionError = new FirestorePermissionError({
        path: docRef.path,
        operation: 'delete',
      });
      errorEmitter.emit('permission-error', permissionError);
    } else {
      console.error('[FIREBASE_UPDATE_ERROR]:', error);
    }
  });
}
