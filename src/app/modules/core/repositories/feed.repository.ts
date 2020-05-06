import {Injectable} from '@angular/core';


@Injectable()
export class FeedRepository {

  critMap = new Map();

  /**
   * returns the current criticality of a state
   * @param mode
   * @param state
   */
  getStateCriticality(mode: string, state: string): number {

    const key = FeedRepository.generateCritMapKey(mode, state);
    if (this.critMap.has(key)) {
      return this.critMap.get(key);
    }

    return -1;
  }

  /**
   * Add or update the criticality of a state
   * @param mode
   * @param state
   * @param value
   */
  addStateCriticality(mode: string, state: string, value: number): void {
    const key = FeedRepository.generateCritMapKey(mode, state);
    this.critMap.set(key, value);
  }

  /**
   * Generates the key for the Map of criticalities
   * @param mode
   * @param state
   */
  private static generateCritMapKey(mode: string, state: string): string {
    return mode + '-' + state;
  }

}
