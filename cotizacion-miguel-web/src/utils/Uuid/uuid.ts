export function uuid(lote: number = 2): string {
  return crypto.getRandomValues(new Uint32Array(lote)).join('');
}

export function uuidClean(lote: number = 2): string {
  return `nexus${uuid(lote)}`;
}
