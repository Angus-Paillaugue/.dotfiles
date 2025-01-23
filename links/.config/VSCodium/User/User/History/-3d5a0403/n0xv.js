import { readFileSync, writeFileSync } from 'fs';

function checkRelease(release) {
  if(!release.version) {
    throw new Error('Version is required');
  }
  if(!release.date) {
    throw new Error('Date is required');
  }
  if(!release.notes) {
    throw new Error('Notes are required');
  }
  
}

export function createNewRelease(version) {


  return {
    version,
    date: new Date().toISOString(),
    notes: '',
    features: [],
    fixes: [],
    breakingChanges: [],
  };
}
