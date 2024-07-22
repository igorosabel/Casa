import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export default class StoreService<T extends { id: number }> {
  private itemsSignal: WritableSignal<T[]> = signal<T[]>([]);

  // Obtener todos los elementos
  getItems(): T[] {
    return this.itemsSignal();
  }

  // Obtener un elemento específico según una función
  getItem(predicate: (item: T) => boolean): T | undefined {
    return this.itemsSignal().find(predicate);
  }

  // Establecer una lista de elementos
  setItems(items: T[]): void {
    this.itemsSignal.set(items);
  }

  // Añadir o actualizar un elemento
  addOrUpdateItem(item: T): void {
    this.itemsSignal.update((items) => {
      const index = items.findIndex(
        (existingItem) => existingItem.id === item.id
      );
      if (index !== -1) {
        // Actualizar el elemento existente
        items[index] = item;
      } else {
        // Añadir el nuevo elemento
        items.push(item);
      }
      return items;
    });
  }

  // Eliminar un elemento específico
  removeItem(id: number): void {
    this.itemsSignal.update((items) => items.filter((item) => item.id !== id));
  }

  // Vaciar todos los elementos
  clearItems(): void {
    this.itemsSignal.set([]);
  }
}
